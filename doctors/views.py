from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# @login_required

def dashboard(request):
    context = {
        'doctor': {
            'name': 'Dr. Sandeep Gupta',
            'specialty': 'Cardiology Specialist',
        }
    }
    return render(request, 'doctors/doctor_dashboard.html', context)