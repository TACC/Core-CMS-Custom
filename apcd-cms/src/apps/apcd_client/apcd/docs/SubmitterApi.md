# apcd.SubmitterApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_one_user_to_submitter_submitters_submitter_id_add_user_post**](SubmitterApi.md#add_one_user_to_submitter_submitters_submitter_id_add_user_post) | **POST** /submitters/{submitter_id}/add-user | Add One User To Submitter
[**get_all_submitters_submitters_get**](SubmitterApi.md#get_all_submitters_submitters_get) | **GET** /submitters/ | Get All Submitters
[**get_one_submitter_submitters_submitter_id_get**](SubmitterApi.md#get_one_submitter_submitters_submitter_id_get) | **GET** /submitters/{submitter_id} | Get One Submitter
[**get_submitters_calendar_submitters_submitter_id_calendar_get**](SubmitterApi.md#get_submitters_calendar_submitters_submitter_id_calendar_get) | **GET** /submitters/{submitter_id}/calendar | Get Submitters Calendar
[**get_submitters_contacts_submitters_submitter_id_contacts_get**](SubmitterApi.md#get_submitters_contacts_submitters_submitter_id_contacts_get) | **GET** /submitters/{submitter_id}/contacts | Get Submitters Contacts
[**get_submitters_exception_submitters_submitter_id_exceptions_get**](SubmitterApi.md#get_submitters_exception_submitters_submitter_id_exceptions_get) | **GET** /submitters/{submitter_id}/exceptions | Get Submitters Exception
[**remove_one_user_to_submitter_submitters_submitter_id_remove_user_put**](SubmitterApi.md#remove_one_user_to_submitter_submitters_submitter_id_remove_user_put) | **PUT** /submitters/{submitter_id}/remove-user | Remove One User To Submitter


# **add_one_user_to_submitter_submitters_submitter_id_add_user_post**
> object add_one_user_to_submitter_submitters_submitter_id_add_user_post(submitter_id, submitter_user_create)

Add One User To Submitter

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_user_create import SubmitterUserCreate
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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 
    submitter_user_create = apcd.SubmitterUserCreate() # SubmitterUserCreate | 

    try:
        # Add One User To Submitter
        api_response = api_instance.add_one_user_to_submitter_submitters_submitter_id_add_user_post(submitter_id, submitter_user_create)
        print("The response of SubmitterApi->add_one_user_to_submitter_submitters_submitter_id_add_user_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->add_one_user_to_submitter_submitters_submitter_id_add_user_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 
 **submitter_user_create** | [**SubmitterUserCreate**](SubmitterUserCreate.md)|  | 

### Return type

**object**

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

# **get_all_submitters_submitters_get**
> List[Submitter] get_all_submitters_submitters_get(skip=skip, limit=limit, payor_code=payor_code, submitter_code=submitter_code)

Get All Submitters

Get a list of submitters based on a criteria, filter options below:  - **Option 1**: submitter_id and payor_code - **Option 2**: payor_code - **Option 3**: submitter_code      *Skip and limit can be used with all filter options

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter import Submitter
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
    api_instance = apcd.SubmitterApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 10 # int |  (optional) (default to 10)
    payor_code = 0 # int |  (optional) (default to 0)
    submitter_code = 'submitter_code_example' # str |  (optional)

    try:
        # Get All Submitters
        api_response = api_instance.get_all_submitters_submitters_get(skip=skip, limit=limit, payor_code=payor_code, submitter_code=submitter_code)
        print("The response of SubmitterApi->get_all_submitters_submitters_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->get_all_submitters_submitters_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 10]
 **payor_code** | **int**|  | [optional] [default to 0]
 **submitter_code** | **str**|  | [optional] 

### Return type

[**List[Submitter]**](Submitter.md)

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

# **get_one_submitter_submitters_submitter_id_get**
> SubmittersWithChildren get_one_submitter_submitters_submitter_id_get(submitter_id)

Get One Submitter

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitters_with_children import SubmittersWithChildren
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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 

    try:
        # Get One Submitter
        api_response = api_instance.get_one_submitter_submitters_submitter_id_get(submitter_id)
        print("The response of SubmitterApi->get_one_submitter_submitters_submitter_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->get_one_submitter_submitters_submitter_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 

### Return type

[**SubmittersWithChildren**](SubmittersWithChildren.md)

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

# **get_submitters_calendar_submitters_submitter_id_calendar_get**
> List[SubmitterCalendar] get_submitters_calendar_submitters_submitter_id_calendar_get(submitter_id, start_date=start_date, end_date=end_date)

Get Submitters Calendar

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_calendar import SubmitterCalendar
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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 
    start_date = 'start_date_example' # str |  (optional)
    end_date = 'end_date_example' # str |  (optional)

    try:
        # Get Submitters Calendar
        api_response = api_instance.get_submitters_calendar_submitters_submitter_id_calendar_get(submitter_id, start_date=start_date, end_date=end_date)
        print("The response of SubmitterApi->get_submitters_calendar_submitters_submitter_id_calendar_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->get_submitters_calendar_submitters_submitter_id_calendar_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 
 **start_date** | **str**|  | [optional] 
 **end_date** | **str**|  | [optional] 

### Return type

[**List[SubmitterCalendar]**](SubmitterCalendar.md)

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

# **get_submitters_contacts_submitters_submitter_id_contacts_get**
> object get_submitters_contacts_submitters_submitter_id_contacts_get(submitter_id, valid_notifier=valid_notifier)

Get Submitters Contacts

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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 
    valid_notifier = True # bool |  (optional)

    try:
        # Get Submitters Contacts
        api_response = api_instance.get_submitters_contacts_submitters_submitter_id_contacts_get(submitter_id, valid_notifier=valid_notifier)
        print("The response of SubmitterApi->get_submitters_contacts_submitters_submitter_id_contacts_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->get_submitters_contacts_submitters_submitter_id_contacts_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 
 **valid_notifier** | **bool**|  | [optional] 

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

# **get_submitters_exception_submitters_submitter_id_exceptions_get**
> List[SubmitterException] get_submitters_exception_submitters_submitter_id_exceptions_get(submitter_id, currently_granted=currently_granted)

Get Submitters Exception

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_exception import SubmitterException
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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 
    currently_granted = True # bool |  (optional)

    try:
        # Get Submitters Exception
        api_response = api_instance.get_submitters_exception_submitters_submitter_id_exceptions_get(submitter_id, currently_granted=currently_granted)
        print("The response of SubmitterApi->get_submitters_exception_submitters_submitter_id_exceptions_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->get_submitters_exception_submitters_submitter_id_exceptions_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 
 **currently_granted** | **bool**|  | [optional] 

### Return type

[**List[SubmitterException]**](SubmitterException.md)

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

# **remove_one_user_to_submitter_submitters_submitter_id_remove_user_put**
> object remove_one_user_to_submitter_submitters_submitter_id_remove_user_put(submitter_id, submitter_user_update)

Remove One User To Submitter

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_user_update import SubmitterUserUpdate
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
    api_instance = apcd.SubmitterApi(api_client)
    submitter_id = 56 # int | 
    submitter_user_update = apcd.SubmitterUserUpdate() # SubmitterUserUpdate | 

    try:
        # Remove One User To Submitter
        api_response = api_instance.remove_one_user_to_submitter_submitters_submitter_id_remove_user_put(submitter_id, submitter_user_update)
        print("The response of SubmitterApi->remove_one_user_to_submitter_submitters_submitter_id_remove_user_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterApi->remove_one_user_to_submitter_submitters_submitter_id_remove_user_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | **int**|  | 
 **submitter_user_update** | [**SubmitterUserUpdate**](SubmitterUserUpdate.md)|  | 

### Return type

**object**

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

