# apcd.AuthenticateApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_access_token_auth_access_token_post**](AuthenticateApi.md#get_access_token_auth_access_token_post) | **POST** /auth/access-token | Get Access Token


# **get_access_token_auth_access_token_post**
> object get_access_token_auth_access_token_post(client_id, client_secret, grant_type=grant_type, username=username, password=password, scope=scope)

Get Access Token

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
    api_instance = apcd.AuthenticateApi(api_client)
    client_id = 'client_id_example' # str | 
    client_secret = 'client_secret_example' # str | 
    grant_type = 'grant_type_example' # str |  (optional)
    username = 'username_example' # str |  (optional)
    password = 'password_example' # str |  (optional)
    scope = '' # str |  (optional) (default to '')

    try:
        # Get Access Token
        api_response = api_instance.get_access_token_auth_access_token_post(client_id, client_secret, grant_type=grant_type, username=username, password=password, scope=scope)
        print("The response of AuthenticateApi->get_access_token_auth_access_token_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AuthenticateApi->get_access_token_auth_access_token_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **client_id** | **str**|  | 
 **client_secret** | **str**|  | 
 **grant_type** | **str**|  | [optional] 
 **username** | **str**|  | [optional] 
 **password** | **str**|  | [optional] 
 **scope** | **str**|  | [optional] [default to &#39;&#39;]

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

