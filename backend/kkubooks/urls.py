from django.urls import path
from .views import main
from .views import bookshelf
from .views import statistics
from .views import memo
from .views import survey

urlpatterns = [
    path('main/kkubookmode/', main.kkubookmode),
    path('main/search/', main.search),
    path('main/booklist/', main.booklist),
    path('main/book/<int:book_id>/', main.book_detail),
    path('main/<int:book_id>/commit/', main.commit),
    # path('main/<int:bookshelf_id>/page/', main.page),
    path('main/commits/', main.commit_list),
    path('main/<int:bookshelf_id>/rating/', main.rating),

    path('bookshelf/', bookshelf.create_book),
    path('bookshelf/<int:bookshelf_id>/', bookshelf.bookshelf_detail),
    path('bookshelf/booklist/', bookshelf.bookshelf_list),
    path('bookshelf/<int:book_id>/memolist', bookshelf.get_memo),
    path('bookshelf/naver/search/', bookshelf.get_naver_api),

    path('memo/', memo.create_memo),
    path('memolist/', memo.memo_list),
    path('memo/<int:memo_id>/', memo.memo_detail),
    path('memo/bookmark/<int:memo_id>/', memo.memo_bookmark),

    path('mypage/kkubookmode/', statistics.set_kkubookmode),
    path('mypage/statistics/<str:yyyymm>/', statistics.get_user_statistics),

    path('survey/', survey.create_survey),
    path('survey/feeling/', survey.feeling),
]
