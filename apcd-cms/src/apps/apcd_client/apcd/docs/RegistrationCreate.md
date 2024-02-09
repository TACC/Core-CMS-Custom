# RegistrationCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicable_period_start** | **int** |  | 
**applicable_period_end** | **int** |  | 
**org_type** | **str** |  | 
**business_name** | **str** |  | 
**mail_address** | **str** |  | 
**city** | **str** |  | 
**state** | **str** |  | 
**zip** | **str** |  | 
**file_me** | **bool** |  | 
**file_pv** | **bool** |  | 
**file_mc** | **bool** |  | 
**file_pc** | **bool** |  | 
**file_dc** | **bool** |  | 
**submission_method** | **str** |  | 
**submitting_for_self** | **bool** |  | 
**contacts** | [**List[RegistrationContactCreate]**](RegistrationContactCreate.md) |  | [optional] 
**entities** | [**List[RegistrationEntityCreate]**](RegistrationEntityCreate.md) |  | [optional] 

## Example

```python
from apcd.models.registration_create import RegistrationCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RegistrationCreate from a JSON string
registration_create_instance = RegistrationCreate.from_json(json)
# print the JSON string representation of the object
print RegistrationCreate.to_json()

# convert the object into a dict
registration_create_dict = registration_create_instance.to_dict()
# create an instance of RegistrationCreate from a dict
registration_create_form_dict = registration_create.from_dict(registration_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


