# RegistrationUpdate


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

## Example

```python
from apcd.models.registration_update import RegistrationUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationUpdate from a JSON string
registration_update_instance = RegistrationUpdate.from_json(json)
# print the JSON string representation of the object
print RegistrationUpdate.to_json()

# convert the object into a dict
registration_update_dict = registration_update_instance.to_dict()
# create an instance of RegistrationUpdate from a dict
registration_update_form_dict = registration_update.from_dict(registration_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


