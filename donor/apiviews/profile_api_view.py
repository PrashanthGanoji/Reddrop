from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from donor.serializers.profile_serializer import *
from donor.models import *

class ProfileList(APIView):
    """
        Retrive the users.
    """
    def post(self, request, format='json'):
        post = request.data.copy()
        user = post.pop('user')
        userser = UserSerializer(data=user)
        serializer = ProfileSerializer(data=post)
        if userser.is_valid() and serializer.is_valid():
            usr = userser.save()
            serializer.save(user = usr)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(userser.errors, status=status.HTTP_400_BAD_REQUEST) if not userser.is_valid() else Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        profiles = self.get_queryset()
        if len(profiles) == 0:
            errors = {
                'noDonors': 'No donors Found'
            }
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Profile.objects.filter(active = True)
        bloodgroup = self.request.query_params.get('bloodgroup', None)
        state = self.request.query_params.get('state', None)
        city = self.request.query_params.get('city',None)

        if bloodgroup is not None:
            queryset = queryset.filter(bloodgroup__iexact=bloodgroup)
        if state is not None:
            queryset = queryset.filter(state__iexact = state)
        if city is not None:
            queryset = queryset.filter(city__iexact = city)
        return queryset

class ProfileModify(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        user = request.user
        profile = profile = Profile.objects.get(user = request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, format="json"):
        post = request.data.copy()
        usrSerializer = MiniUserSerializer(data=post.pop('user', None), instance=request.user)
        if usrSerializer.is_valid():
            usrSerializer.save()
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(data=post, instance=profile)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(usrSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        user=request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
