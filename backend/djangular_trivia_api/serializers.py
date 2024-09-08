from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(required=True)
  
  class Meta(object):
    model = User
    fields = ['id', 'username', 'password', 'email']