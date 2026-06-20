from django.urls import path, include
from . import views

urlpatterns = [
    path('',              views.register,      name='register'),
    path('login/',        views.login_view,    name='login'),
    path('dashboard/',    views.dashboard,     name='dashboard'),
    path('schedule/',     views.schedule,      name='schedule'),
    path('consultations/',views.consultations, name='consultations'),
    path('patients/',     views.patients,      name='patients'),
    path('patients/<int:patient_id>/', views.patient_detail, name='patient_detail'),
]
