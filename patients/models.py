from django.db import models
from django.conf import settings

# create your models here 
class PatientProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username

class MedicalHistory(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='medical_histories')
    condition_name = models.CharField(max_length=150, help_text="e.g., Asthma, Diabetes")
    allergies = models.TextField(blank=True, null=True, help_text="List any drug/food allergies")
    past_surgeries = models.TextField(blank=True, null=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"History for {self.patient} - {self.condition_name}"