from django.contrib import admin
from .models import *
# Register your models here.

#in-order to create models from admin panel we need to add the models here.
admin.site.register(Profile)
