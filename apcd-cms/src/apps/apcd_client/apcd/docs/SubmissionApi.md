# apcd.SubmissionApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_submission_submissions_post**](SubmissionApi.md#create_one_submission_submissions_post) | **POST** /submissions/ | Create One Submission
[**get_all_submissions_submissions_get**](SubmissionApi.md#get_all_submissions_submissions_get) | **GET** /submissions/ | Get All Submissions
[**get_one_submission_submissions_submission_id_get**](SubmissionApi.md#get_one_submission_submissions_submission_id_get) | **GET** /submissions/{submission_id} | Get One Submission
[**get_paginated_all_submissions_submissions_paged_submissions_get**](SubmissionApi.md#get_paginated_all_submissions_submissions_paged_submissions_get) | **GET** /submissions/paged_submissions | Get Paginated All Submissions
[**update_one_submission_submissions_submission_id_put**](SubmissionApi.md#update_one_submission_submissions_submission_id_put) | **PUT** /submissions/{submission_id} | Update One Submission


# **create_one_submission_submissions_post**
> Submission create_one_submission_submissions_post(submission_create)

Create One Submission

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission import Submission
from apcd.models.submission_create import SubmissionCreate
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
    api_instance = apcd.SubmissionApi(api_client)
    submission_create = apcd.SubmissionCreate() # SubmissionCreate | 

    try:
        # Create One Submission
        api_response = api_instance.create_one_submission_submissions_post(submission_create)
        print("The response of SubmissionApi->create_one_submission_submissions_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionApi->create_one_submission_submissions_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submission_create** | [**SubmissionCreate**](SubmissionCreate.md)|  | 

### Return type

[**Submission**](Submission.md)

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

# **get_all_submissions_submissions_get**
> List[Submission] get_all_submissions_submissions_get(skip=skip, limit=limit)

Get All Submissions

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission import Submission
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
    api_instance = apcd.SubmissionApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 10 # int |  (optional) (default to 10)

    try:
        # Get All Submissions
        api_response = api_instance.get_all_submissions_submissions_get(skip=skip, limit=limit)
        print("The response of SubmissionApi->get_all_submissions_submissions_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionApi->get_all_submissions_submissions_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 10]

### Return type

[**List[Submission]**](Submission.md)

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

# **get_one_submission_submissions_submission_id_get**
> SubmissionWithChildren get_one_submission_submissions_submission_id_get(submission_id)

Get One Submission

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission_with_children import SubmissionWithChildren
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
    api_instance = apcd.SubmissionApi(api_client)
    submission_id = 56 # int | 

    try:
        # Get One Submission
        api_response = api_instance.get_one_submission_submissions_submission_id_get(submission_id)
        print("The response of SubmissionApi->get_one_submission_submissions_submission_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionApi->get_one_submission_submissions_submission_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submission_id** | **int**|  | 

### Return type

[**SubmissionWithChildren**](SubmissionWithChildren.md)

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

# **get_paginated_all_submissions_submissions_paged_submissions_get**
> PaginatedResponseSubmission get_paginated_all_submissions_submissions_paged_submissions_get(page=page, per_page=per_page, status=status, order=order)

Get Paginated All Submissions

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.paginated_response_submission import PaginatedResponseSubmission
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
    api_instance = apcd.SubmissionApi(api_client)
    page = 1 # int |  (optional) (default to 1)
    per_page = 5 # int |  (optional) (default to 5)
    status = 'status_example' # str |  (optional)
    order = 'order_example' # str |  (optional)

    try:
        # Get Paginated All Submissions
        api_response = api_instance.get_paginated_all_submissions_submissions_paged_submissions_get(page=page, per_page=per_page, status=status, order=order)
        print("The response of SubmissionApi->get_paginated_all_submissions_submissions_paged_submissions_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionApi->get_paginated_all_submissions_submissions_paged_submissions_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**|  | [optional] [default to 1]
 **per_page** | **int**|  | [optional] [default to 5]
 **status** | **str**|  | [optional] 
 **order** | **str**|  | [optional] 

### Return type

[**PaginatedResponseSubmission**](PaginatedResponseSubmission.md)

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

# **update_one_submission_submissions_submission_id_put**
> Submission update_one_submission_submissions_submission_id_put(submission_id, submission_update)

Update One Submission

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submission import Submission
from apcd.models.submission_update import SubmissionUpdate
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
    api_instance = apcd.SubmissionApi(api_client)
    submission_id = 56 # int | 
    submission_update = apcd.SubmissionUpdate() # SubmissionUpdate | 

    try:
        # Update One Submission
        api_response = api_instance.update_one_submission_submissions_submission_id_put(submission_id, submission_update)
        print("The response of SubmissionApi->update_one_submission_submissions_submission_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmissionApi->update_one_submission_submissions_submission_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submission_id** | **int**|  | 
 **submission_update** | [**SubmissionUpdate**](SubmissionUpdate.md)|  | 

### Return type

[**Submission**](Submission.md)

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

