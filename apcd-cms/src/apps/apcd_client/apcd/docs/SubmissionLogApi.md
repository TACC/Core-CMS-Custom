# apcd.SubmissionLogApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_submission_log_submission_logs_post**](SubmissionLogApi.md#create_one_submission_log_submission_logs_post) | **POST** /submission_logs/ | Create One Submission Log
[**get_all_partial_submission_logs_submission_logs_partial_get**](SubmissionLogApi.md#get_all_partial_submission_logs_submission_logs_partial_get) | **GET** /submission_logs/partial | Get All Partial Submission Logs
[**get_all_submission_logs_submission_logs_get**](SubmissionLogApi.md#get_all_submission_logs_submission_logs_get) | **GET** /submission_logs/ | Get All Submission Logs
[**get_one_submission_log_submission_logs_log_id_get**](SubmissionLogApi.md#get_one_submission_log_submission_logs_log_id_get) | **GET** /submission_logs/{log_id} | Get One Submission Log
[**get_paginated_all_submissions_submission_logs_paged_submission_logs_get**](SubmissionLogApi.md#get_paginated_all_submissions_submission_logs_paged_submission_logs_get) | **GET** /submission_logs/paged_submission_logs | Get Paginated All Submissions
[**update_one_submission_log_submission_logs_log_id_put**](SubmissionLogApi.md#update_one_submission_log_submission_logs_log_id_put) | **PUT** /submission_logs/{log_id} | Update One Submission Log


# **create_one_submission_log_submission_logs_post**
> SubmissionLog create_one_submission_log_submission_logs_post(submission_log_create)

Create One Submission Log

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission_log import SubmissionLog
from apcd.models.submission_log_create import SubmissionLogCreate
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    submission_log_create = apcd.SubmissionLogCreate() # SubmissionLogCreate | 

    try:
        # Create One Submission Log
        api_response = api_instance.create_one_submission_log_submission_logs_post(submission_log_create)
        print("The response of SubmissionLogApi->create_one_submission_log_submission_logs_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->create_one_submission_log_submission_logs_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submission_log_create** | [**SubmissionLogCreate**](SubmissionLogCreate.md)|  | 

### Return type

[**SubmissionLog**](SubmissionLog.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_all_partial_submission_logs_submission_logs_partial_get**
> object get_all_partial_submission_logs_submission_logs_partial_get(skip=skip, limit=limit)

Get All Partial Submission Logs

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 56 # int |  (optional)

    try:
        # Get All Partial Submission Logs
        api_response = api_instance.get_all_partial_submission_logs_submission_logs_partial_get(skip=skip, limit=limit)
        print("The response of SubmissionLogApi->get_all_partial_submission_logs_submission_logs_partial_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->get_all_partial_submission_logs_submission_logs_partial_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] 

### Return type

**object**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_all_submission_logs_submission_logs_get**
> List[SubmissionLog] get_all_submission_logs_submission_logs_get(skip=skip, limit=limit)

Get All Submission Logs

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission_log import SubmissionLog
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 10 # int |  (optional) (default to 10)

    try:
        # Get All Submission Logs
        api_response = api_instance.get_all_submission_logs_submission_logs_get(skip=skip, limit=limit)
        print("The response of SubmissionLogApi->get_all_submission_logs_submission_logs_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->get_all_submission_logs_submission_logs_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 10]

### Return type

[**List[SubmissionLog]**](SubmissionLog.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_one_submission_log_submission_logs_log_id_get**
> SubmissionLog get_one_submission_log_submission_logs_log_id_get(log_id)

Get One Submission Log

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission_log import SubmissionLog
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    log_id = 56 # int | 

    try:
        # Get One Submission Log
        api_response = api_instance.get_one_submission_log_submission_logs_log_id_get(log_id)
        print("The response of SubmissionLogApi->get_one_submission_log_submission_logs_log_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->get_one_submission_log_submission_logs_log_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **log_id** | **int**|  | 

### Return type

[**SubmissionLog**](SubmissionLog.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_paginated_all_submissions_submission_logs_paged_submission_logs_get**
> PaginatedResponseSubmissionLog get_paginated_all_submissions_submission_logs_paged_submission_logs_get(page=page, per_page=per_page)

Get Paginated All Submissions

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.paginated_response_submission_log import PaginatedResponseSubmissionLog
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    page = 1 # int |  (optional) (default to 1)
    per_page = 5 # int |  (optional) (default to 5)

    try:
        # Get Paginated All Submissions
        api_response = api_instance.get_paginated_all_submissions_submission_logs_paged_submission_logs_get(page=page, per_page=per_page)
        print("The response of SubmissionLogApi->get_paginated_all_submissions_submission_logs_paged_submission_logs_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->get_paginated_all_submissions_submission_logs_paged_submission_logs_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**|  | [optional] [default to 1]
 **per_page** | **int**|  | [optional] [default to 5]

### Return type

[**PaginatedResponseSubmissionLog**](PaginatedResponseSubmissionLog.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_one_submission_log_submission_logs_log_id_put**
> SubmissionLog update_one_submission_log_submission_logs_log_id_put(log_id, submission_log_update)

Update One Submission Log

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission_log import SubmissionLog
from apcd.models.submission_log_update import SubmissionLogUpdate
from apcd.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = apcd.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.SubmissionLogApi(api_client)
    log_id = 56 # int | 
    submission_log_update = apcd.SubmissionLogUpdate() # SubmissionLogUpdate | 

    try:
        # Update One Submission Log
        api_response = api_instance.update_one_submission_log_submission_logs_log_id_put(log_id, submission_log_update)
        print("The response of SubmissionLogApi->update_one_submission_log_submission_logs_log_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionLogApi->update_one_submission_log_submission_logs_log_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **log_id** | **int**|  | 
 **submission_log_update** | [**SubmissionLogUpdate**](SubmissionLogUpdate.md)|  | 

### Return type

[**SubmissionLog**](SubmissionLog.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

