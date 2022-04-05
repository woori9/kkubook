import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
import mariadb
from datetime import datetime


def query_MariaDB(query):

     # DB Connection
     conn = mariadb.connect(
        user="root",
        password="kkubook204",
        host="localhost",
        port=3307,
        database="kkubook"
    )

     # start time
     start_tm = datetime.now()

     # Get a DataFrame
     global query_result

     query_result = pd.read_sql(query, conn)

     # Close connection
     end_tm = datetime.now()

     print('START TIME : ', str(start_tm))
     print('END TIME : ', str(end_tm))
     print('ELAP time :', str(end_tm - start_tm))
     conn.close()

     return query_result


df_book = query_MariaDB("SELECT id from kkubooks_book limit 100")
df_bookshelf = query_MariaDB("SELECT book_id, rating, user_id from kkubooks_bookshelf where book_status=0")
# TODO: user_id list로 가져오기
df = pd.merge(
     df_book, df_bookshelf, left_on='id', right_on='book_id', how='left'
     ).fillna(0)
# print(df)

df_user_book_pivot = df.pivot(index='user_id', columns='id', values='rating').fillna(0)

df_user_book_pivot = df_user_book_pivot.drop([df_user_book_pivot.index[0]])

# print(df_user_book_pivot)

matrix = df_user_book_pivot.to_numpy()
user_ratings_mean = np.mean(matrix, axis=1)
# print(user_ratings_mean)
matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)

df_mean = pd.DataFrame(matrix_user_mean, columns=df_user_book_pivot.columns)
# print(df_mean)

U, sigma, Vt = svds(matrix_user_mean, k=5)

sigma = np.diag(sigma)

svd_user_predicted_book = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
# 예측 평점 table
df_svd_preds = pd.DataFrame(svd_user_predicted_book, columns = df_user_book_pivot.columns)


def recomm_books(df_svd_preds, user_id, ori_book_df, ori_bookshelf_df, num=10):
     sorted_user_preds = df_svd_preds.iloc[user_id].sort_values(ascending=False)

     user_data = ori_bookshelf_df[ori_bookshelf_df.user_id == user_id]

     recomm = ori_book_df[~ori_book_df['id'].isin(user_data['book_id'])]

     recomm = recomm.merge(pd.DataFrame(sorted_user_preds).reset_index(), on='id')

     recomm = recomm.rename(columns={user_id: 'predictions'}).sort_values('predictions', ascending=False)
     return recomm


# TODO: user_id list로 가져오기
# For문 돌리기
# 결과값 pickle 저장
