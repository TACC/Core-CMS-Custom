# apcd.UserApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_user_users_post**](UserApi.md#create_one_user_users_post) | **POST** /users | Create One User
[**get_all_user_orgs_users_orgs_get**](UserApi.md#get_all_user_orgs_users_orgs_get) | **GET** /users/orgs | Get All User Orgs
[**get_all_users_users_get**](UserApi.md#get_all_users_users_get) | **GET** /users | Get All Users
[**get_one_user_users_user_number_get**](UserApi.md#get_one_user_users_user_number_get) | **GET** /users/{user_number} | Get One User
[**get_paginated_all_users_users_paged_users_get**](UserApi.md#get_paginated_all_users_users_paged_users_get) | **GET** /users/paged_users | Get Paginated All Users
[**update_one_user_users_user_number_put**](UserApi.md#update_one_user_users_user_number_put) | **PUT** /users/{user_number} | Update One User


# **create_one_user_users_post**
> User create_one_user_users_post(user_create)

Create One User

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.user import User
from apcd.models.user_create import UserCreate
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
    api_instance = apcd.UserApi(api_client)
    user_create = apcd.UserCreate() # UserCreate | 

    try:
        # Create One User
        api_response = api_instance.create_one_user_users_post(user_create)
        print("The response of UserApi->create_one_user_users_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->create_one_user_users_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_create** | [**UserCreate**](UserCreate.md)|  | 

### Return type

[**User**](User.md)

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

# **get_all_user_orgs_users_orgs_get**
> object get_all_user_orgs_users_orgs_get()

Get All User Orgs

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
    api_instance = apcd.UserApi(api_client)

    try:
        # Get All User Orgs
        api_response = api_instance.get_all_user_orgs_users_orgs_get()
        print("The response of UserApi->get_all_user_orgs_users_orgs_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->get_all_user_orgs_users_orgs_get: %s\n" % e)
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

# **get_all_users_users_get**
> List[User] get_all_users_users_get(skip=skip, limit=limit)

Get All Users

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.user import User
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
    api_instance = apcd.UserApi(api_client)
    skip = 0 # int |  (optional) (default to 0)
    limit = 5 # int |  (optional) (default to 5)

    try:
        # Get All Users
        api_response = api_instance.get_all_users_users_get(skip=skip, limit=limit)
        print("The response of UserApi->get_all_users_users_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->get_all_users_users_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 5]

### Return type

[**List[User]**](User.md)

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

# **get_one_user_users_user_number_get**
> User get_one_user_users_user_number_get(user_number)

Get One User

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.user import User
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
    api_instance = apcd.UserApi(api_client)
    user_number = 56 # int | 

    try:
        # Get One User
        api_response = api_instance.get_one_user_users_user_number_get(user_number)
        print("The response of UserApi->get_one_user_users_user_number_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->get_one_user_users_user_number_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_number** | **int**|  | 

### Return type

[**User**](User.md)

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

# **get_paginated_all_users_users_paged_users_get**
> PaginatedResponseUser get_paginated_all_users_users_paged_users_get(page=page, per_page=per_page, status=status, org=org)

Get Paginated All Users

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.paginated_response_user import PaginatedResponseUser
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
    api_instance = apcd.UserApi(api_client)
    page = 1 # int |  (optional) (default to 1)
    per_page = 5 # int |  (optional) (default to 5)
    status = 'status_example' # str |  (optional)
    org = 'org_example' # str |  (optional)

    try:
        # Get Paginated All Users
        api_response = api_instance.get_paginated_all_users_users_paged_users_get(page=page, per_page=per_page, status=status, org=org)
        print("The response of UserApi->get_paginated_all_users_users_paged_users_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->get_paginated_all_users_users_paged_users_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**|  | [optional] [default to 1]
 **per_page** | **int**|  | [optional] [default to 5]
 **status** | **str**|  | [optional] 
 **org** | **str**|  | [optional] 

### Return type

[**PaginatedResponseUser**](PaginatedResponseUser.md)

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

# **update_one_user_users_user_number_put**
> User update_one_user_users_user_number_put(user_number, user_update)

Update One User

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.user import User
from apcd.models.user_update import UserUpdate
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
    api_instance = apcd.UserApi(api_client)
    user_number = 56 # int | 
    user_update = apcd.UserUpdate() # UserUpdate | 

    try:
        # Update One User
        api_response = api_instance.update_one_user_users_user_number_put(user_number, user_update)
        print("The response of UserApi->update_one_user_users_user_number_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UserApi->update_one_user_users_user_number_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_number** | **int**|  | 
 **user_update** | [**UserUpdate**](UserUpdate.md)|  | 

### Return type

[**User**](User.md)

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

