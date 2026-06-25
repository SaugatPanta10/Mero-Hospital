from django.shortcuts import render

def patient_dashboard(request):
    context = {
        'patient': {'name': 'Rohan Sharma'},
        'appointment': {
            'title': 'General Cardiology Check-up',
            'doctor': 'Dr. Sandeep Gupta',
            'when': 'Tomorrow, 10:00 AM',
        }
    }
    return render(request, 'patients/patient_dashboard.html', context)