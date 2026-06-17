from django.db import models
from patients.models import PatientProfile
from doctors.models import DoctorProfile

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Requested', 'Requested'),
        ('Confirmed', 'Confirmed'),
        ('In-Consultation', 'In-Consultation'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Requested')
    reason_for_visit = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appt #{self.id}: {self.patient} with {self.doctor} on {self.appointment_date}"

class ConsultationWorkspace(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='consultation')
    consultation_notes = models.TextField(help_text="Doctor's notes typed during consultation")
    prescription_text = models.TextField(help_text="Digital prescription details and instructions")
    
    # File uploads safely managed via Pillow. Will store in a 'medical_records/' media folder.
    lab_report_file = models.FileField(upload_to='medical_records/labs/', blank=True, null=True)
    prescription_file = models.FileField(upload_to='medical_records/prescriptions/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Consultation Record for Appt #{self.appointment.id}"