from rest_framework import serializers
from .models import Task

#class TaskSerializer(serializers.HyperlinkedModelSerializer):
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    #fields = ('title','complete')
    fields = '__all__'


