# apcd.RegistrationApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_registration_registrations_post**](RegistrationApi.md#create_one_registration_registrations_post) | **POST** /registrations/ | Create One Registration
[**get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get**](RegistrationApi.md#get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get) | **GET** /registrations/submitter_code | Get All Paginated Registration By Submitter Code
[**get_all_registrations_registrations_get**](RegistrationApi.md#get_all_registrations_registrations_get) | **GET** /registrations/ | Get All Registrations
[**get_one_registration_registrations_registration_id_get**](RegistrationApi.md#get_one_registration_registrations_registration_id_get) | **GET** /registrations/{registration_id} | Get One Registration
[**update_one_registration_registrations_registration_id_put**](RegistrationApi.md#update_one_registration_registrations_registration_id_put) | **PUT** /registrations/{registration_id} | Update One Registration


# **create_one_registration_registrations_post**
> RegistrationWithChildren create_one_registration_registrations_post(registration_create)

Create One Registration

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.registration_create import RegistrationCreate
from apcd.models.registration_with_children import RegistrationWithChildren
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
    api_instance = apcd.RegistrationApi(api_client)
    registration_create = apcd.RegistrationCreate() # RegistrationCreate | 

    try:
        # Create One Registration
        api_response = api_instance.create_one_registration_registrations_post(registration_create)
        print("The response of RegistrationApi->create_one_registration_registrations_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RegistrationApi->create_one_registration_registrations_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registration_create** | [**RegistrationCreate**](RegistrationCreate.md)|  | 

### Return type

[**RegistrationWithChildren**](RegistrationWithChildren.md)

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

# **get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get**
> PaginatedResponseRegistration get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get(page=page, per_page=per_page, submitter_code=submitter_code)

Get All Paginated Registration By Submitter Code

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.paginated_response_registration import PaginatedResponseRegistration
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
    api_instance = apcd.RegistrationApi(api_client)
    page = 1 # int |  (optional) (default to 1)
    per_page = 5 # int |  (optional) (default to 5)
    submitter_code = 'submitter_code_example' # str |  (optional)

    try:
        # Get All Paginated Registration By Submitter Code
        api_response = api_instance.get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get(page=page, per_page=per_page, submitter_code=submitter_code)
        print("The response of RegistrationApi->get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RegistrationApi->get_all_paginated_registration_by_submitter_code_registrations_submitter_code_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**|  | [optional] [default to 1]
 **per_page** | **int**|  | [optional] [default to 5]
 **submitter_code** | **str**|  | [optional] 

### Return type

[**PaginatedResponseRegistration**](PaginatedResponseRegistration.md)

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

# **get_all_registrations_registrations_get**
> List[Registration] get_all_registrations_registrations_get(skip=skip, limit=limit)

Get All Registrations

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.registration import Registration
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
    api_instance = apcd.RegistrationApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 5 # int |  (optional) (default to 5)

    try:
        # Get All Registrations
        api_response = api_instance.get_all_registrations_registrations_get(skip=skip, limit=limit)
        print("The response of RegistrationApi->get_all_registrations_registrations_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RegistrationApi->get_all_registrations_registrations_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 5]

### Return type

[**List[Registration]**](Registration.md)

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

# **get_one_registration_registrations_registration_id_get**
> RegistrationWithChildren get_one_registration_registrations_registration_id_get(registration_id)

Get One Registration

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.registration_with_children import RegistrationWithChildren
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
    api_instance = apcd.RegistrationApi(api_client)
    registration_id = 56 # int | 

    try:
        # Get One Registration
        api_response = api_instance.get_one_registration_registrations_registration_id_get(registration_id)
        print("The response of RegistrationApi->get_one_registration_registrations_registration_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RegistrationApi->get_one_registration_registrations_registration_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registration_id** | **int**|  | 

### Return type

[**RegistrationWithChildren**](RegistrationWithChildren.md)

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

# **update_one_registration_registrations_registration_id_put**
> Registration update_one_registration_registrations_registration_id_put(registration_id, registration_update)

Update One Registration

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.registration import Registration
from apcd.models.registration_update import RegistrationUpdate
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
    api_instance = apcd.RegistrationApi(api_client)
    registration_id = 56 # int | 
    registration_update = apcd.RegistrationUpdate() # RegistrationUpdate | 

    try:
        # Update One Registration
        api_response = api_instance.update_one_registration_registrations_registration_id_put(registration_id, registration_update)
        print("The response of RegistrationApi->update_one_registration_registrations_registration_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RegistrationApi->update_one_registration_registrations_registration_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registration_id** | **int**|  | 
 **registration_update** | [**RegistrationUpdate**](RegistrationUpdate.md)|  | 

### Return type

[**Registration**](Registration.md)

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

