from django.urls import path
from . import views

# packages/
urlpatterns = [
    path('view-all/', views.GymPackagesList.as_view()),  # get
    path('view/<str:pk>', views.GymPackageDetail.as_view()),  # get
    path('create/', views.GymPackageCreate.as_view()),  # post
    path('update/<str:pk>', views.GymPackageUpdate.as_view()),  # post
    path('delete/<str:pk>', views.GymPackageDelete.as_view()),  # delete
]
