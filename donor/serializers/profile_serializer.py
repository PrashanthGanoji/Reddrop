from rest_framework import serializers
from django.contrib.auth.models import User
from donor.models import *
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        min_length=6,
    )
    confirm_password = serializers.CharField(
        required=True,
        write_only=True,
        min_length=6,
    )

    def create(self, validated_data):
        user = User.objects.create_user(username = validated_data['username'],password = validated_data['password'])
        user.save()
        return user

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return data

    class Meta:
        model = User
        fields = ('id', 'username','password', 'confirm_password')
        write_only_fields = ('confirm_password')


class MiniUserSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username',instance.username)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id','username')

class ProfileSerializer(serializers.ModelSerializer):
    user = MiniUserSerializer(required=False)
    def create(self, validated_data):
        user = validated_data.pop('user')
        profile = Profile(user=user, **validated_data)
        profile.save()
        return profile

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.bloodgroup = validated_data.get('bloodgroup', instance.bloodgroup)
        instance.age = validated_data.get('age', instance.age)
        instance.state = validated_data.get('state', instance.state)
        instance.city = validated_data.get('city', instance.city)
        instance.active = validated_data.get('active', instance.active)
        instance.paid = validated_data.get('paid', instance.paid)
        instance.save()
        return instance

    class Meta:
        model = Profile
        fields = '__all__'