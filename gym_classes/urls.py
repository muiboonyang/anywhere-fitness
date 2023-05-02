from django.urls import path
from . import views

# layout/
urlpatterns = [
    path('view-all/', views.ClassLayoutList.as_view()),  # get
    path('view/<str:pk>', views.ClassLayoutDetail.as_view()),  # get
    path('create/', views.ClassLayoutCreate.as_view()),  # post
    path('update/<str:pk>', views.ClassLayoutUpdate.as_view()),  # post
    path('refund/<str:pk>', views.ClassLayoutRefund.as_view()),  # post
    path('delete/<str:pk>', views.ClassLayoutDelete.as_view()),  # delete
]
