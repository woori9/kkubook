from django.urls import path
from . import views


urlpatterns = [
    path('', views.signout),
    path('kakao/login/', views.login_signup),
]
