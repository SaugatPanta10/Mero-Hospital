from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import MyUser


class UserLoginForm(forms.Form):
    username = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={"autocomplete": "username", "class": "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password", "class": "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})
    )

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get("username")
        password = cleaned_data.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise forms.ValidationError("Invalid email or password.")
            cleaned_data["user"] = user
        return cleaned_data


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput,
        validators=[validate_password]
    )
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = MyUser
        fields = ['id_number', 'name', 'email', 'date_of_birth', 'gender', 'phone_number']
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user