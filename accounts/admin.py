from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account


class AccountAdmin(UserAdmin):
    # Form fields when you view existing accounts
    list_display = ('email', 'name', 'surname', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('email', 'name', 'surname')
    readonly_fields = ('id', 'date_joined', 'last_login')
    # Default sort -> tuple, need trailing comma
    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()

    # Form fields when you edit existing accounts
    fieldsets = (
        (None, {'fields': ('email', 'name', 'surname', 'date_joined', 'last_login')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff')}),
    )

    # Form fields when you create new account
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'name', 'surname', 'password1', 'password2'),
        }),
    )


# Register your models here.
admin.site.register(Account, AccountAdmin)
