from re import T
import requests
from bs4 import BeautifulSoup

KYOBO_URL = 'https://www.kyobobook.co.kr/product/detailViewKor.laf'


def auth_crawling(book_isbn):
    '''
    저자 가져오기
    '''
    res = requests.get(f'{KYOBO_URL}?barcode={book_isbn}', timeout=3)
    soup = BeautifulSoup(res.content, 'html.parser')

    author = soup.select_one('span.name > a.detail_author').get_text()
    return author


def page_crawling(book_isbn):
    '''
    페이지수 가져오기
    '''
    res = requests.get(f'{KYOBO_URL}?barcode={book_isbn}', timeout=3)
    soup = BeautifulSoup(res.content, 'html.parser')
    
    page_tmp = soup.find('table', 'margin_top10')
    page = page_tmp.select_one('tr:nth-of-type(2) > td').get_text()
    return page


def category_crawling(book_isbn):
    '''
    카테고리 가져오기
    '''
    res = requests.get(f'{KYOBO_URL}?barcode={book_isbn}', timeout=3)
    soup = BeautifulSoup(res.content, 'html.parser')

    category_tmp = soup.select_one('ul.list_detail_category > li')
    category = category_tmp.find_all('a')
    # DEBUG
    # ttt = []
    # for c in category:
    #     ttt.append(c.get_text().strip().strip('>').strip())
    # return ttt
    return category
    

def keyword_crawling(book_isbn):
    '''
    키워드 가져오기
    '''
    res = requests.get(f'{KYOBO_URL}?barcode={book_isbn}', timeout=3)
    soup = BeautifulSoup(res.content, 'html.parser')

    keyword_tmp = soup.select_one('div.tag_list')
    keyword = keyword_tmp.find_all('a')
    return keyword

# isbn = '9788979710045'
# print(category_crawling(isbn))
# isbn2 = '9791168120846'
# print(category_crawling(isbn2))


def score_crawling(book_isbn):
    '''
    평점 가져오기
    '''
    res = requests.get(f'{KYOBO_URL}?barcode={book_isbn}', timeout=3)
    soup = BeautifulSoup(res.content, 'html.parser')

    score_tmp = soup.select_one('div.review')
    score = score_tmp.select_one('em').get_text()
    return score

isbn = '9791158362836'
print(score_crawling(isbn))