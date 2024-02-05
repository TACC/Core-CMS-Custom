# apcd.CDLApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_all_cdl_cdl_get**](CDLApi.md#get_all_cdl_cdl_get) | **GET** /cdl | Get All Cdl
[**get_all_cdl_data_element_names_cdl_data_element_names_get**](CDLApi.md#get_all_cdl_data_element_names_cdl_data_element_names_get) | **GET** /cdl/data_element_names | Get All Cdl Data Element Names
[**get_all_cdl_numbers_cdl_cdl_numbers_get**](CDLApi.md#get_all_cdl_numbers_cdl_cdl_numbers_get) | **GET** /cdl/cdl_numbers | Get All Cdl Numbers


# **get_all_cdl_cdl_get**
> object get_all_cdl_cdl_get(skip=skip, limit=limit, file_type=file_type, data_type=data_type, requirement_status=requirement_status, element_name=element_name, cdl_number=cdl_number)

Get All Cdl

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
    api_instance = apcd.CDLApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 56 # int |  (optional)
    file_type = 'file_type_example' # str |  (optional)
    data_type = 'data_type_example' # str |  (optional)
    requirement_status = 'requirement_status_example' # str |  (optional)
    element_name = 'element_name_example' # str |  (optional)
    cdl_number = 'cdl_number_example' # str |  (optional)

    try:
        # Get All Cdl
        api_response = api_instance.get_all_cdl_cdl_get(skip=skip, limit=limit, file_type=file_type, data_type=data_type, requirement_status=requirement_status, element_name=element_name, cdl_number=cdl_number)
        print("The response of CDLApi->get_all_cdl_cdl_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CDLApi->get_all_cdl_cdl_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] 
 **file_type** | **str**|  | [optional] 
 **data_type** | **str**|  | [optional] 
 **requirement_status** | **str**|  | [optional] 
 **element_name** | **str**|  | [optional] 
 **cdl_number** | **str**|  | [optional] 

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

# **get_all_cdl_data_element_names_cdl_data_element_names_get**
> object get_all_cdl_data_element_names_cdl_data_element_names_get()

Get All Cdl Data Element Names

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
    api_instance = apcd.CDLApi(api_client)

    try:
        # Get All Cdl Data Element Names
        api_response = api_instance.get_all_cdl_data_element_names_cdl_data_element_names_get()
        print("The response of CDLApi->get_all_cdl_data_element_names_cdl_data_element_names_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CDLApi->get_all_cdl_data_element_names_cdl_data_element_names_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_all_cdl_numbers_cdl_cdl_numbers_get**
> object get_all_cdl_numbers_cdl_cdl_numbers_get()

Get All Cdl Numbers

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
    api_instance = apcd.CDLApi(api_client)

    try:
        # Get All Cdl Numbers
        api_response = api_instance.get_all_cdl_numbers_cdl_cdl_numbers_get()
        print("The response of CDLApi->get_all_cdl_numbers_cdl_cdl_numbers_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CDLApi->get_all_cdl_numbers_cdl_cdl_numbers_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

