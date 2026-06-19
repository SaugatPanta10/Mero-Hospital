from django.shortcuts import render

def login_view(request):
    return render(request, 'doctors/login.html')

def dashboard(request):
    return render(request, 'doctors/dashboard.html')

def schedule(request):
    return render(request, 'doctors/schedule.html')

def consultations(request):
    return render(request, 'doctors/consultations.html')

def patients(request):
    return render(request, 'doctors/patients.html')

def patient_detail(request, patient_id):
    return render(request, 'doctors/patient_detail.html', {'patient_id': patient_id})