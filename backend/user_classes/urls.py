from django.urls import path
from . import views

# class/
urlpatterns = [
    path('view-all/', views.ClassList.as_view()),  # get
    path('view/<str:fk>', views.ClassDetail.as_view()),  # get
    path('book/', views.ClassCreate.as_view()),  # post
    path('update/<str:pk>', views.ClassUpdate.as_view()),  # post
    path('delete/<str:pk>', views.ClassDelete.as_view()),  # delete
]
