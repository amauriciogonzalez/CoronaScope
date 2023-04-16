from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('images/', views.getImages, name="images"),
    path('images/<str:pk>', views.getImage, name="image"),
    path('images/<str:pk>/image', views.displayImage, name="image's_image"),
]
