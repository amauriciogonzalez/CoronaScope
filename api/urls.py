from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('images/', views.getImageList, name="images"),
    path('images/sample-images', views.downloadSampleImages, name="sample-images"),
    path('images/create', views.createImage, name='create-image'),
    path('images/<str:pk>', views.getImage, name="image"),
    path('images/<str:pk>/image', views.displayImage, name="image's_image"),
    path('images/<str:pk>/delete', views.deleteImage, name="delete-image"),
    path('images/<str:pk>/update', views.updateImage, name="update-image"),
]

