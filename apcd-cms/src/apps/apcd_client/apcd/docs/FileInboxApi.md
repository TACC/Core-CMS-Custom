# apcd.FileInboxApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_file_inbox_file_inbox_post**](FileInboxApi.md#create_one_file_inbox_file_inbox_post) | **POST** /file_inbox | Create One File Inbox
[**get_all_file_inbox_file_inbox_get**](FileInboxApi.md#get_all_file_inbox_file_inbox_get) | **GET** /file_inbox | Get All File Inbox
[**get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get**](FileInboxApi.md#get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get) | **GET** /file_inbox/filename/{zip_file_name} | Get One File Inbox By File Name
[**get_one_file_inbox_file_inbox_received_id_get**](FileInboxApi.md#get_one_file_inbox_file_inbox_received_id_get) | **GET** /file_inbox/{received_id} | Get One File Inbox
[**update_one_file_inbox_file_inbox_received_id_put**](FileInboxApi.md#update_one_file_inbox_file_inbox_received_id_put) | **PUT** /file_inbox/{received_id} | Update One File Inbox


# **create_one_file_inbox_file_inbox_post**
> FileInbox create_one_file_inbox_file_inbox_post(file_inbox_create)

Create One File Inbox

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.file_inbox import FileInbox
from apcd.models.file_inbox_create import FileInboxCreate
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
    api_instance = apcd.FileInboxApi(api_client)
    file_inbox_create = apcd.FileInboxCreate() # FileInboxCreate | 

    try:
        # Create One File Inbox
        api_response = api_instance.create_one_file_inbox_file_inbox_post(file_inbox_create)
        print("The response of FileInboxApi->create_one_file_inbox_file_inbox_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FileInboxApi->create_one_file_inbox_file_inbox_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file_inbox_create** | [**FileInboxCreate**](FileInboxCreate.md)|  | 

### Return type

[**FileInbox**](FileInbox.md)

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

# **get_all_file_inbox_file_inbox_get**
> List[FileInbox] get_all_file_inbox_file_inbox_get(skip=skip, limit=limit)

Get All File Inbox

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.file_inbox import FileInbox
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
    api_instance = apcd.FileInboxApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 5 # int |  (optional) (default to 5)

    try:
        # Get All File Inbox
        api_response = api_instance.get_all_file_inbox_file_inbox_get(skip=skip, limit=limit)
        print("The response of FileInboxApi->get_all_file_inbox_file_inbox_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FileInboxApi->get_all_file_inbox_file_inbox_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 5]

### Return type

[**List[FileInbox]**](FileInbox.md)

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

# **get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get**
> FileInboxWithUser get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get(zip_file_name)

Get One File Inbox By File Name

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.file_inbox_with_user import FileInboxWithUser
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
    api_instance = apcd.FileInboxApi(api_client)
    zip_file_name = 'zip_file_name_example' # str | 

    try:
        # Get One File Inbox By File Name
        api_response = api_instance.get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get(zip_file_name)
        print("The response of FileInboxApi->get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FileInboxApi->get_one_file_inbox_by_file_name_file_inbox_filename_zip_file_name_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **zip_file_name** | **str**|  | 

### Return type

[**FileInboxWithUser**](FileInboxWithUser.md)

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

# **get_one_file_inbox_file_inbox_received_id_get**
> FileInbox get_one_file_inbox_file_inbox_received_id_get(received_id)

Get One File Inbox

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.file_inbox import FileInbox
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
    api_instance = apcd.FileInboxApi(api_client)
    received_id = 56 # int | 

    try:
        # Get One File Inbox
        api_response = api_instance.get_one_file_inbox_file_inbox_received_id_get(received_id)
        print("The response of FileInboxApi->get_one_file_inbox_file_inbox_received_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FileInboxApi->get_one_file_inbox_file_inbox_received_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **received_id** | **int**|  | 

### Return type

[**FileInbox**](FileInbox.md)

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

# **update_one_file_inbox_file_inbox_received_id_put**
> FileInbox update_one_file_inbox_file_inbox_received_id_put(received_id, file_inbox_update)

Update One File Inbox

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.file_inbox import FileInbox
from apcd.models.file_inbox_update import FileInboxUpdate
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
    api_instance = apcd.FileInboxApi(api_client)
    received_id = 56 # int | 
    file_inbox_update = apcd.FileInboxUpdate() # FileInboxUpdate | 

    try:
        # Update One File Inbox
        api_response = api_instance.update_one_file_inbox_file_inbox_received_id_put(received_id, file_inbox_update)
        print("The response of FileInboxApi->update_one_file_inbox_file_inbox_received_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FileInboxApi->update_one_file_inbox_file_inbox_received_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **received_id** | **int**|  | 
 **file_inbox_update** | [**FileInboxUpdate**](FileInboxUpdate.md)|  | 

### Return type

[**FileInbox**](FileInbox.md)

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

