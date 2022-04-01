import pandas as pd

num = 3
# input path
input_book = f'./data/crawling_data/merge_book{num}.csv'
input_category = f'./data/crawling_data/merge_category{num}.csv'
input_keyword= f'./data/crawling_data/merge_keyword{num}.csv'

# outpot_path
output_book = f'./data/crawling_data/b_db{num}.csv'
output_category = f'./data/crawling_data/c_db{num}.csv'
output_keyword = f'./data/crawling_data/k_db{num}.csv'

# read csv files
book_csv = pd.read_csv(input_book)
category_csv = pd.read_csv(input_category)
keyword_csv = pd.read_csv(input_keyword)

# delete comma in file 3
book_csv = book_csv.drop(['space'], axis='columns')

def merge_bc(book_csv, category_csv):
    '''
    category_table isbn을 기준으로 book_table merge
    '''
    # Merge book - category table
    book_df = pd.merge(
        category_csv, book_csv, on='isbn'
    )

    # change page column(remove str) '244쪽 -> 244'
    book_df['page'] = book_df['page'].apply(lambda v: edit_page(v))

    # Delete NAN rows
    df_bc = book_df.dropna(axis=0)
    # table['third'].dropna()
    
    # Add book pk
    s = 51180                       # start num
    e = 51180 + df_bc.shape[0]      # end num
    df_bc['book_id'] = range(s, e)
    
    return df_bc


def get_book_table(df):
    '''
    book_table 저장 (b_db{num}.csv)
    '''
    # Delete columns
    book = df.drop(['main', 'sub', 'third', 'book_id'], axis='columns')

    book.to_csv(output_book, header=True, index=False)


def get_category_table(df):
    '''
    category_table 저장 (c_db{num}.csv)
    '''
    # Delete columns
    category = df.drop(['title', 'description', 'author', 'publisher', 'img_url', 'page', 'isbn'], axis='columns')

    # Insert survey_category
    category['sur_c'] = df['main'].apply(lambda v: get_survey_category(v))
    category.to_csv(output_category, header=True, index=False)


def get_keyword_table(df):
    '''
    keyword_table 저장 (k_db{num}.csv)
    '''
    # Merge keyword table
    df_bk = pd.merge(
        df, keyword_csv, on='isbn',
    )

    # Delete NAN rows
    df_k = df_bk.dropna(axis=0)

    # Delete columns
    keyword = df_k.drop(
        ['title', 'description', 'author', 'publisher', 'img_url', 
        'page', 'isbn', 'main', 'sub', 'third'], 
        axis='columns')
    keyword.to_csv(output_keyword, header=True, index=False)


def get_survey_category(v):
    '''
    category_table에 survey_category column 추가
    '''
    c1 = ['소설', '시/에세이', '역사/문화']
    c2 = ['과학', '기술/공학', '컴퓨터/IT']
    c3 = ['인문', '경제/경영', '정치/사회']
    c4 = ['예술/대중문화', '요리', '여행', '취미/실용/스포츠']
    c5 = ['자기계발']
    if v in c1:
        sur_c = 1
    elif v in c2:
        sur_c = 2
    elif v in c3:
        sur_c = 3
    elif v in c4:
        sur_c = 4
    elif v in c5:
        sur_c = 5
    else:
        sur_c = 6
    return sur_c


def drop_rows(df, column, name):
    '''
    dataframe애서 column값에 name을 포함하는 row 삭제
    '''
    tmp = df[df[column].str.contains(name)].index
    df.drop(tmp, inplace=True)
    return df


def edit_page(v):
    return v.replace('쪽', '')

book_csv = drop_rows(book_csv, 'page', '준비중')

drop_cols = ['잡지', '중/고등참고서', '초등참고서', '취업/수험서', '한국소개도서']

for col in drop_cols:
    category_csv = drop_rows(category_csv, 'main', col)


print('merge 진행중...')
dataframe = merge_bc(book_csv, category_csv)
get_book_table(dataframe)
get_category_table(dataframe)
get_keyword_table(dataframe)
print('끝!')

