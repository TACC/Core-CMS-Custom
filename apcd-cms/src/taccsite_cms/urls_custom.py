from django.urls import path, include
# Removed admin feature pages, extension, and exception from prod
custom_urls = [
    # path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    # path('administration/', include('apps.view_users.urls', namespace='viewusers')),
    # path('administration/', include('apps.admin_submissions.urls', namespace='admin_submission')),
    # path('administration/', include('apps.admin_exception.urls', namespace='admin_exception')),
    # path('administration/', include('apps.admin_extension.urls', namespace='admin_extension')),
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register')),
    # path('submissions/', include('apps.extension.urls', namespace='extension')),
    # path('submissions/', include('apps.exception.urls', namespace='exception')),
    path('submissions/', include('apps.submissions.urls', namespace='submissions'))
]