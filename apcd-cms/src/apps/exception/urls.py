from django.urls import path
from apps.exception.views import ExceptionFormView
from . import views
from django.views.generic import TemplateView
#from apps.exception.views import ExceptionOtherFormView
#from apps.exception.views import ExceptionThresholdFormView

app_name = 'exception'
urlpatterns = [
    path('exception/', TemplateView.as_view(template_name='exception_submission_form.html'), name='exception'),
    path('exception/api/', ExceptionFormView.as_view(), name='exception-api'),
]
