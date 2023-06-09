"""gym URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('gym/', include('gym.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path
from django.urls.conf import include

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Django default paths
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),

    # Custom paths
    path('auth/', include('accounts.urls')),
    path('review/', include('user_reviews.urls')),
    path('class/', include('user_classes.urls')),
    path('transactions/', include('user_transactions.urls')),
    path('layout/', include('gym_classes.urls')),
    path('instructors/', include('gym_instructors.urls')),
    path('packages/', include('gym_packages.urls')),

    # Catch-all path
    re_path(r'', views.catchall),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
