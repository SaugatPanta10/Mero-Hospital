from django.shortcuts import render

def doctor_dashboard(request):
    context = {
        'doctor': {
            'name': 'Dr. Sandeep Gupta',
            'specialty': 'Cardiology Specialist'
        },
        'stats': {
            'patients_today': 14,
            'avg_consultation': '15m'
        }
    }
    return render(request, 'doctors/doctor_dashboard.html', context)