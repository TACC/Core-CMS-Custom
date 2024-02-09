# SubmitterException


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**exception_id** | **int** |  | 
**submitter_id** | **int** |  | 
**requestor_name** | **str** |  | 
**request_type** | **str** |  | 
**explanation_justification** | **str** |  | [optional] 
**submitter_code** | **str** |  | [optional] 
**payor_code** | **int** |  | [optional] 
**user_id** | **str** |  | [optional] 
**requestor_email** | **str** |  | [optional] 
**data_file** | **str** |  | [optional] 
**field_number** | **str** |  | [optional] 
**required_threshold** | **int** |  | [optional] 
**requested_threshold** | **int** |  | [optional] 
**requested_expiration_date** | **date** |  | [optional] 
**approved_threshold** | **int** |  | [optional] 
**approved_expiration_date** | **date** |  | [optional] 
**status** | **str** |  | [optional] 
**outcome** | **str** |  | [optional] 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | [optional] 
**notes** | **str** |  | [optional] 

## Example

```python
from apcd.models.submitter_exception import SubmitterException

# TODO update the JSON string below
json = "{}"
# create an instance of SubmitterException from a JSON string
submitter_exception_instance = SubmitterException.from_json(json)
# print the JSON string representation of the object
print SubmitterException.to_json()

# convert the object into a dict
submitter_exception_dict = submitter_exception_instance.to_dict()
# create an instance of SubmitterException from a dict
submitter_exception_form_dict = submitter_exception.from_dict(submitter_exception_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


