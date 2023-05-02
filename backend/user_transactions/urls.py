from django.urls import path
from . import views

# transactions/
urlpatterns = [
    path('view-all/', views.TransactionList.as_view()),  # get
    path('view/<str:fk>', views.TransactionDetail.as_view()),  # get
    path('create/', views.TransactionCreate.as_view()),  # post
    path('update/<str:fk>', views.TransactionUpdate.as_view()),  # post
    path('delete/<str:pk>', views.TransactionDelete.as_view()),  # delete
]
