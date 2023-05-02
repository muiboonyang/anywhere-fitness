from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, )
from . import views

# auth/
urlpatterns = [
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refreshtoken/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutAndBlacklist.as_view(), name='logout'),

    path('register/', views.CreateUser.as_view(), name='create_user'),
    path('update/<str:pk>', views.UpdateUser.as_view(), name='update_user'),
    path('view-all/', views.GetUserAll.as_view(), name='get_user_all'),
    path('view/<str:pk>', views.GetUserOne.as_view(), name='get_user_one'),
]
