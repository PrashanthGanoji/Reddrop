from django.urls import path
from django.conf.urls import include, url
from django.views.generic import TemplateView
from donor.apiviews.profile_api_view import *
from rest_framework_jwt.views import ObtainJSONWebToken

urlpatterns = [
    path('donors',ProfileList.as_view(), name = "list_donors"), #get list of donors, supports query parameters | GET
    path('register', ProfileList.as_view(), name = 'register_donor'), #register a new donor  | POST
    path('details',ProfileModify.as_view(), name = "modify_donor"), #get, put and delete donor | GET POST DELETE (private)

    path('login', ObtainJSONWebToken.as_view()), #get jwt token | POST
    url(r'^(?P<path>.*)/$', TemplateView.as_view(template_name="index.html")),
]