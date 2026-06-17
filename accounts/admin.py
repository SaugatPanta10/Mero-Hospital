from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Role Configuration', {'fields': ('is_patient', ('is_doctor'), 'is_admin', 'phone_number')}),
    )

admin.site.register(User, CustomUserAdmin)