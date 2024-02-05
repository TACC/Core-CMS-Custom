# apcd.TicketsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_ticket_tickets_new_post**](TicketsApi.md#create_ticket_tickets_new_post) | **POST** /tickets/new | Create Ticket


# **create_ticket_tickets_new_post**
> object create_ticket_tickets_new_post(ticket_details)

Create Ticket

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import time
import os
import apcd
from apcd.models.ticket_details import TicketDetails
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
    api_instance = apcd.TicketsApi(api_client)
    ticket_details = apcd.TicketDetails() # TicketDetails | 

    try:
        # Create Ticket
        api_response = api_instance.create_ticket_tickets_new_post(ticket_details)
        print("The response of TicketsApi->create_ticket_tickets_new_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TicketsApi->create_ticket_tickets_new_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ticket_details** | [**TicketDetails**](TicketDetails.md)|  | 

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

