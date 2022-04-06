from contextlib import redirect_stderr
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
import mariadb
from datetime import datetime
import pickle
import schedule

def query_MariaDB(query):

     # DB Connection
     conn = mariadb.connect(
          user="root",
          password="kkubook204",
          host="j6b204.p.ssafy.io",
          port=3306,
          database="kkubook"
     )
     # start time
     start_tm = datetime.now()

     # Get a DataFrame
     global query_result

     query_result = pd.read_sql(query, conn)

     # Close connection
     end_tm = datetime.now()

     conn.close()

     return query_result


def predict_table():
     df_book = query_MariaDB("SELECT id from kkubooks_book")
     df_bookshelf = query_MariaDB("SELECT book_id, rating, user_id from kkubooks_bookshelf where book_status=0")
     user_list = query_MariaDB("SELECT distinct user_id from kkubooks_bookshelf where book_status=0")
     user_list = user_list.values.tolist()

     users = []
     for user in user_list:
          users.append(user[0])

     df = pd.merge(
     df_book, df_bookshelf, left_on='id', right_on='book_id', how='left'
          ).fillna(0)

     df_user_book_pivot = df.pivot(index='user_id', columns='id', values='rating').fillna(0)
     df_user_book_pivot = df_user_book_pivot.drop([df_user_book_pivot.index[0]])

     # pivot_table 값을 numpy matrix로 만들기
     matrix = df_user_book_pivot.to_numpy()

     # user_ratings_mean = 사용자의 평균 평점
     user_ratings_mean = np.mean(matrix, axis=1)

     # R_user_mean : 사용자-책에 대해 사용자 평균 평점을 뺀 것
     matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)

     df_mean = pd.DataFrame(matrix_user_mean, columns=df_user_book_pivot.columns)

     # scipy에서 제공해주는 svd
     # U 행렬, sigma 행렬, V 전치 행렬 반환
     U, sigma, Vt = svds(matrix_user_mean, k=matrix_user_mean.shape[0]//2)  # k의 의미?

     sigma = np.diag(sigma)  # 0이 포함된 대칭행렬로 변환

     # U, Sigma, Vt의 내적을 수행하면, 다시 원본 행렬로 복원이 된다
     # 거기에 + 사용자 평균 rating을 적용한다
     svd_user_predicted_book = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)

     # 예측 평점 table
     df_svd_preds = pd.DataFrame(svd_user_predicted_book,columns=df_user_book_pivot.columns)

     return users, df_book, df_bookshelf, df_svd_preds


# 사용자 아이디, 책 정보 테이블, 평점 테이블 => 사용자가 안 본 책에서 평점이 높은 것 추천
def recomm_books(df_svd_preds, index, user_id, ori_book_df, ori_bookshelf_df):
     # 사용자 아이디에 SVD로 나온 결과의 책 평점이 가장 높은 데이터 순으로 정렬
     sorted_user_preds = df_svd_preds.iloc[index].sort_values(ascending=False)

     user_data = ori_bookshelf_df[ori_bookshelf_df.user_id == user_id]

     # 사용자가 본 데이터 제외
     recomm = ori_book_df[~ori_book_df['id'].isin(user_data['book_id'])]

     # 사용자의 책 평점이 높은 순으로 정렬된 데이터와 위 recomm 합친다.
     recomm = recomm.merge(pd.DataFrame(sorted_user_preds).reset_index(), on='id')
     recomm = recomm.rename(columns={index: 'predictions'}).sort_values('predictions', ascending=False)

     return recomm


def mf_algorithm():
     users, df_book, df_bookshelf, df_svd_preds = predict_table()
     predict_result = pd.DataFrame()
     for i,user in enumerate(users):
          user_result = recomm_books(df_svd_preds, i, user, df_book, df_bookshelf)
          user_result.insert(2, 'user_id', user)
          user_result = user_result[0:10]

          predict_result = pd.concat([predict_result, user_result])
          
     # 결과값 pickle 저장
     with open('predict_result', 'wb') as f:
          pickle.dump(predict_result, f, pickle.HIGHEST_PROTOCOL)

     # 결과값 pickle 읽기
     with open('predict_result', 'rb') as f:
          data = pickle.load(f)

# 스케쥴링
schedule.every().day.at("03:00:00").do(mf_algorithm)
while True:
     schedule.run_pending()