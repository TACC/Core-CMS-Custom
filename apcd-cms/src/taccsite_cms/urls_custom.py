from django.urls import path, include

custom_urls = [
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
    path('register/request-to-submit/', include('apps.submission_form.urls', namespace='apcd'))
]
