# apcd.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_all_urls_list_endpoints_get**](DefaultApi.md#get_all_urls_list_endpoints_get) | **GET** /list_endpoints/ | Get All Urls
[**root_get**](DefaultApi.md#root_get) | **GET** / | Root


# **get_all_urls_list_endpoints_get**
> object get_all_urls_list_endpoints_get()

Get All Urls

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
    api_instance = apcd.DefaultApi(api_client)

    try:
        # Get All Urls
        api_response = api_instance.get_all_urls_list_endpoints_get()
        print("The response of DefaultApi->get_all_urls_list_endpoints_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_all_urls_list_endpoints_get: %s\n" % e)
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

# **root_get**
> object root_get()

Root

### Example


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


# Enter a context with an instance of the API client
with apcd.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = apcd.DefaultApi(api_client)

    try:
        # Root
        api_response = api_instance.root_get()
        print("The response of DefaultApi->root_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->root_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

