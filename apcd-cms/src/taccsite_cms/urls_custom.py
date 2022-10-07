from django.urls import path, include

custom_urls = [
    path('register/request-to-submit/', include('apps.submission_form.urls', namespace='apcd'))
    path('administration/', include('apps.admin_regis_table.urls', namespace='administration')),
]
