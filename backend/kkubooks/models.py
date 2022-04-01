import os
from django.db import models
from django.conf import settings
from uuid import uuid4
from django.utils import timezone


class Book(models.Model):
    isbn = models.CharField(max_length=30)
    title = models.CharField(max_length=255)
    description = models.TextField()
    author = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    img_url = models.CharField(max_length=255)
    page = models.IntegerField()

    def __str__(self):
        return f'{self.pk}: {self.title}'


class KkubookMode(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
    kkubook_days = models.IntegerField(default=0)
    notcommit_days = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def img_path(instance, filename):
    username = instance.username
    ymd = timezone.now().strftime('%Y/%m/%d')
    uuid_name = uuid4().hex
    extension = os.path.splitext(filename)[-1].lower()
    return '/'.join([username, ymd, uuid_name[:2], uuid_name + extension])


class Memo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    content = models.TextField(max_length=500, blank=True)
    memo_img = models.ImageField(blank=True, upload_to='%Y/%m/%d')
    memo_mark = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Commit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()


class Bookshelf(models.Model):
    '''
    book_status: 0-읽은책/1-읽는중/2-읽고싶은/3-중단
    '''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    book_status = models.IntegerField(default=2)
    curr_page = models.IntegerField(default=0)
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)
    rating = models.IntegerField(default=0)


class Survey(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.IntegerField()
    feeling = models.IntegerField()
    interest = models.CharField(max_length=100)
    category = models.IntegerField()
    amount = models.IntegerField()
    job = models.IntegerField()

# class Interest(models.Model):
#     survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
#     keyword = models.CharField(max_length=30)


class Category(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
    main = models.CharField(max_length=50)
    sub = models.CharField(max_length=50)
    third = models.CharField(max_length=50)
    survey_category = models.IntegerField()


class Keyword(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    word = models.CharField(max_length=30)