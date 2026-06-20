from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, UserLoginForm


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'doctors/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = UserLoginForm()
    return render(request, 'doctors/login.html',{'form':form})

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