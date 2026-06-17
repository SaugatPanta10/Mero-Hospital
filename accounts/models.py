from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    is_patient = models.BooleanField(default = False)
    is_doctor = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    phone_number = models.CharField(max_length = 15, blank = True, null = True)

    def __str__(self):
        return f"{self.username} ({'Patient' if self.is_patient else 'Doctor' if self.is_doctor else 'Admin'})"