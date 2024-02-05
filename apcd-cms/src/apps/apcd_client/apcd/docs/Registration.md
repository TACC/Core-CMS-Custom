# Registration


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicable_period_start** | **int** |  | [optional] 
**applicable_period_end** | **int** |  | [optional] 
**org_type** | **str** |  | [optional] 
**business_name** | **str** |  | [optional] 
**mail_address** | **str** |  | [optional] 
**city** | **str** |  | [optional] 
**state** | **str** |  | [optional] 
**zip** | **str** |  | [optional] 
**file_me** | **bool** |  | [optional] 
**file_pv** | **bool** |  | [optional] 
**file_mc** | **bool** |  | [optional] 
**file_pc** | **bool** |  | [optional] 
**file_dc** | **bool** |  | [optional] 
**submission_method** | **str** |  | [optional] 
**submitting_for_self** | **bool** |  | [optional] 
**registration_id** | **int** |  | 
**posted_date** | **date** |  | [optional] 
**registration_status** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 

## Example

```python
from apcd.models.registration import Registration

# TODO update the JSON string below
json = "{}"
# create an instance of Registration from a JSON string
registration_instance = Registration.from_json(json)
# print the JSON string representation of the object
print Registration.to_json()

# convert the object into a dict
registration_dict = registration_instance.to_dict()
# create an instance of Registration from a dict
registration_form_dict = registration.from_dict(registration_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


