from django.db import models
from appointments.models import Appointment

class Payment(models.Model):
    GATEWAY_CHOICES = [
        ('eSewa', 'eSewa'),
        ('Khalti', 'Khalti'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Success', 'Success'),
        ('Failed', 'Failed'),
    ]

    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    payment_gateway = models.CharField(max_length=10, choices=GATEWAY_CHOICES)
    transaction_id = models.CharField(max_length=100, unique=True, help_text="Fictional mock transaction reference code")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Txn {self.transaction_id} - {self.amount} NPR via {self.payment_gateway} ({self.status})"