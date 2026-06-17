from django.shortcuts import render


def home(request):
    return render(request, 'doctors/home.html')


def dashboard(request):
    return render(request, 'doctors/doctor_dashboard.html')

def consolation(request):
    return render(request,'doctors/consolation_workspace.html')

def patient(request):
    return render(request,'doctors/patient_directory.html')

def schedule(request):
    return render(request,'doctors/schedule.html')