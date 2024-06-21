from django.db import models

# Create your models here.
class Task(models.Model):
    text = models.CharField(max_length=200)
    start_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.text