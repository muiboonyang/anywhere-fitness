from django.urls import path
from . import views

# instructors/
urlpatterns = [
    path('view-all/', views.GymInstructorsList.as_view()),  # get
    path('view/<str:pk>', views.GymInstructorDetail.as_view()),  # get
    path('create/', views.GymInstructorCreate.as_view()),  # post
    path('update/<str:pk>', views.GymInstructorUpdate.as_view()),  # post
    path('delete/<str:pk>', views.GymInstructorDelete.as_view()),  # delete
]
