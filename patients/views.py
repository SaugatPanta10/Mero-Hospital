from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# @login_required
def dashboard(request):
    context = {
        'patient': {
            'name': 'Rohan Sharma',
        },
        'appointment': {
            'title': 'General Cardiology Check-up',
            'doctor': 'Dr. Sandeep Gupta',
            'when': 'Tomorrow, 10:00 AM',
        }
    }
    return render(request, 'patients/patient_dashboard.html', context)