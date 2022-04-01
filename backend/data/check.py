import pandas as pd

input_path= f'./data/crawling_data/ttt.csv'

# read csv files
book = pd.read_csv(input_path)

book['check_page'] = book['page'].apply(lambda v: type(v)!=int)

tmp = pd.pivot_table(book, index=['check_page'], values='isbn', aggfunc='count')

print(tmp)


'''
             isbn
check_page
False       55629
True          417

'''