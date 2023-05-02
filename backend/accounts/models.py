from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator

# Create your models here.

# Function 1: Overwrite base user account, inheriting from 'Base User Manager', creates own account manager
# Use this instead of what is in the other class / Overwrite what Django does

class AccountManager(BaseUserManager):
    def create_user(self, email, name, surname, password=None):
        if not email:
            raise ValueError('User must have a valid email.')

        # Normalize: change uppercase to lowercase automatically
        user = self.model(email=self.normalize_email(email),
                          name=name,
                          surname=surname)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, name, surname, password):
        user = self.create_user(
            email=email,
            name=name,
            surname=surname,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)

        return user


# Create account
# null = False (by default, null is True)
# Auto_now_add: add once only
# Change: Auto_now = true > update once

class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    name = models.CharField(max_length=30, null=False)
    surname = models.CharField(max_length=30)

    phoneNumberRegex = RegexValidator(regex=r"[6,8,9]\d\d\d\d\d\d\d")
    contact = models.CharField(validators=[phoneNumberRegex], max_length=8, unique=False, default="")
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=10, default="")
    address_line = models.CharField(max_length=150, default="")
    unit = models.CharField(max_length=10, default="")
    postal_code = models.CharField(max_length=10, default="")

    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)

    # these 4 items below are NECESSARY
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # import Account Manager class from above
    objects = AccountManager()

    # Required fields
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    # def __str__ <- if you call your class,
    def __str__(self):
        return f'{self.surname},{self.name}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
