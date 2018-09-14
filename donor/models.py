from django.db import models
from django.contrib.auth.models import User

#we are using the one-to-one link technique to extend the django base user
#Class to customize the user as our requirement

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    bloodgroup = models.CharField(max_length=8)
    age = models.PositiveIntegerField()
    state = models.CharField(max_length=128)
    city = models.CharField(max_length=256)
    active = models.BooleanField(default=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return self.name