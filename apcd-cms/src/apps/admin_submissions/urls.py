from django.urls import path
from django.views.generic import TemplateView
from apps.admin_submissions.views import AdminSubmissionsTable

app_name = 'administration'
urlpatterns = [
    path('list-submissions/', TemplateView.as_view(template_name='list_admin_submissions.html'), name="admin_submissions"),
    path('list-submissions/api/', AdminSubmissionsTable.as_view(), name="admin_submissions_api"),
    path('list-submissions/api/options', AdminSubmissionsTable.as_view(), name='admin_submissions_api_options'),
    path('list-submissions/api/modal/<str:modal_type>/', AdminSubmissionsTable.as_view(), name='admin_submissions_modal'),
]
