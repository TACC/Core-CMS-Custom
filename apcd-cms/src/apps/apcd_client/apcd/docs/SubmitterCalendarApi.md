# apcd.SubmitterCalendarApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_one_calendar_calendars_post**](SubmitterCalendarApi.md#create_one_calendar_calendars_post) | **POST** /calendars/ | Create One Calendar
[**get_all_calendars_calendars_get**](SubmitterCalendarApi.md#get_all_calendars_calendars_get) | **GET** /calendars/ | Get All Calendars
[**get_one_calendar_calendars_submitter_calendar_id_get**](SubmitterCalendarApi.md#get_one_calendar_calendars_submitter_calendar_id_get) | **GET** /calendars/{submitter_calendar_id} | Get One Calendar
[**update_one_calendar_calendars_submitter_calendar_id_put**](SubmitterCalendarApi.md#update_one_calendar_calendars_submitter_calendar_id_put) | **PUT** /calendars/{submitter_calendar_id} | Update One Calendar


# **create_one_calendar_calendars_post**
> SubmitterCalendar create_one_calendar_calendars_post(submitter_calendar_create)

Create One Calendar

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_calendar import SubmitterCalendar
from apcd.models.submitter_calendar_create import SubmitterCalendarCreate
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
    api_instance = apcd.SubmitterCalendarApi(api_client)
    submitter_calendar_create = apcd.SubmitterCalendarCreate() # SubmitterCalendarCreate | 

    try:
        # Create One Calendar
        api_response = api_instance.create_one_calendar_calendars_post(submitter_calendar_create)
        print("The response of SubmitterCalendarApi->create_one_calendar_calendars_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterCalendarApi->create_one_calendar_calendars_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_calendar_create** | [**SubmitterCalendarCreate**](SubmitterCalendarCreate.md)|  | 

### Return type

[**SubmitterCalendar**](SubmitterCalendar.md)

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

# **get_all_calendars_calendars_get**
> List[SubmitterCalendar] get_all_calendars_calendars_get(submitter_id=submitter_id, start_date=start_date, end_date=end_date, payor_code=payor_code, skip=skip, limit=limit)

Get All Calendars

Get a list of submitter calendar records based on a criteria, filter options below:  Note: If using **start_date/end_date**, both fields are required. Otherwise, these fields are ignored in your filter  - **Option 1**: submitter_code, start_date, and end_date - **Option 2**: payor_code, start_date, and end_date - **Option 3**: start_date and end_date - **Option 4**: submitter_id      *Skip and limit can be used with all filter options

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
    api_instance = apcd.SubmitterCalendarApi(api_client)
    submitter_id = None # object |  (optional)
    start_date = None # object |  (optional)
    end_date = None # object |  (optional)
    payor_code = None # object |  (optional)
    skip = 0 # int |  (optional) (default to 0)
    limit = 10 # int |  (optional) (default to 10)

    try:
        # Get All Calendars
        api_response = api_instance.get_all_calendars_calendars_get(submitter_id=submitter_id, start_date=start_date, end_date=end_date, payor_code=payor_code, skip=skip, limit=limit)
        print("The response of SubmitterCalendarApi->get_all_calendars_calendars_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterCalendarApi->get_all_calendars_calendars_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_id** | [**object**](.md)|  | [optional] 
 **start_date** | [**object**](.md)|  | [optional] 
 **end_date** | [**object**](.md)|  | [optional] 
 **payor_code** | [**object**](.md)|  | [optional] 
 **skip** | **int**|  | [optional] [default to 0]
 **limit** | **int**|  | [optional] [default to 10]

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

# **get_one_calendar_calendars_submitter_calendar_id_get**
> SubmitterCalendar get_one_calendar_calendars_submitter_calendar_id_get(submitter_calendar_id)

Get One Calendar

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
    api_instance = apcd.SubmitterCalendarApi(api_client)
    submitter_calendar_id = 56 # int | 

    try:
        # Get One Calendar
        api_response = api_instance.get_one_calendar_calendars_submitter_calendar_id_get(submitter_calendar_id)
        print("The response of SubmitterCalendarApi->get_one_calendar_calendars_submitter_calendar_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterCalendarApi->get_one_calendar_calendars_submitter_calendar_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_calendar_id** | **int**|  | 

### Return type

[**SubmitterCalendar**](SubmitterCalendar.md)

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

# **update_one_calendar_calendars_submitter_calendar_id_put**
> SubmitterCalendar update_one_calendar_calendars_submitter_calendar_id_put(submitter_calendar_id, submitter_calendar_update)

Update One Calendar

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.submitter_calendar import SubmitterCalendar
from apcd.models.submitter_calendar_update import SubmitterCalendarUpdate
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
    api_instance = apcd.SubmitterCalendarApi(api_client)
    submitter_calendar_id = 56 # int | 
    submitter_calendar_update = apcd.SubmitterCalendarUpdate() # SubmitterCalendarUpdate | 

    try:
        # Update One Calendar
        api_response = api_instance.update_one_calendar_calendars_submitter_calendar_id_put(submitter_calendar_id, submitter_calendar_update)
        print("The response of SubmitterCalendarApi->update_one_calendar_calendars_submitter_calendar_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SubmitterCalendarApi->update_one_calendar_calendars_submitter_calendar_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **submitter_calendar_id** | **int**|  | 
 **submitter_calendar_update** | [**SubmitterCalendarUpdate**](SubmitterCalendarUpdate.md)|  | 

### Return type

[**SubmitterCalendar**](SubmitterCalendar.md)

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

