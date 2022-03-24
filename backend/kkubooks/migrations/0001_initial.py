# Generated by Django 4.0.3 on 2022-03-22 07:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import kkubooks.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isbn', models.CharField(max_length=30)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('author', models.CharField(max_length=30)),
                ('publisher', models.CharField(max_length=30)),
                ('img_url', models.CharField(max_length=255)),
                ('page', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feeling', models.IntegerField()),
                ('category', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('job', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Memo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True, max_length=500)),
                ('memo_img', models.ImageField(blank=True, upload_to=kkubooks.models.img_path)),
                ('memo_mark', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='kkubooks.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='KkubookMode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField()),
                ('kkubook_days', models.IntegerField()),
                ('notcommit_days', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=30)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kkubooks.book')),
            ],
        ),
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=30)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kkubooks.survey')),
            ],
        ),
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='kkubooks.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main', models.CharField(max_length=50)),
                ('sub', models.CharField(max_length=50)),
                ('survey_category', models.IntegerField()),
                ('book', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='kkubooks.book')),
            ],
        ),
        migrations.CreateModel(
            name='Bookshelf',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_status', models.IntegerField(default=2)),
                ('curr_page', models.IntegerField(default=0)),
                ('start_date', models.DateField(blank=True)),
                ('end_date', models.DateField(blank=True)),
                ('rating', models.IntegerField(default=5)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='kkubooks.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
