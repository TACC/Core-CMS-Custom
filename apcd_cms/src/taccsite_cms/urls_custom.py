from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='admin_regis_table')),
    path('administration/', include('apps.view_users.urls', namespace='viewusers')),
    path('administration/', include('apps.admin_submissions.urls', namespace='admin_submission')),
    path('administration/', include('apps.admin_exception.urls', namespace='admin_exception')),
    path('administration/', include('apps.admin_extension.urls', namespace='admin_extension')),
    path('administration/', include('apps.view_submitter_users.urls', namespace='view_submitter_users')),
    path('apcd-login/', include('apps.apcd_login.urls', namespace='apcd_login')),
    path('register/', include('apps.registrations.urls', namespace='register')),
    path('register/', include('apps.submitter_renewals_listing.urls', namespace='submitter_regis_table')),
    path('submissions/', include('apps.extension.urls', namespace='extension')),
    path('submissions/', include('apps.exception.urls', namespace='exception')),
    path('submissions/', include('apps.submissions.urls', namespace='submissions')),
    path('common_api/', include('apps.common_api.urls', namespace='common_api'))
]
