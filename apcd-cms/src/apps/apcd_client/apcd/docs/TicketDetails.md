# TicketDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**file_name** | **str** |  | 
**message** | **str** |  | 

## Example

```python
from apcd.models.ticket_details import TicketDetails

# TODO update the JSON string below
json = "{}"
# create an instance of TicketDetails from a JSON string
ticket_details_instance = TicketDetails.from_json(json)
# print the JSON string representation of the object
print TicketDetails.to_json()

# convert the object into a dict
ticket_details_dict = ticket_details_instance.to_dict()
# create an instance of TicketDetails from a dict
ticket_details_form_dict = ticket_details.from_dict(ticket_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


