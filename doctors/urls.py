from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('consolation/', views.consolation, name='consolation'),
    path('patient/', views.patient, name='patient'),
    path('schedule/', views.schedule, name='schedule'),
]