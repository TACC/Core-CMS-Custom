# SubmissionLogCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**submission_id** | **int** |  | 
**file_type** | **str** |  | [optional] 
**validation_suite** | **str** |  | 
**outcome** | **str** |  | 
**data_row_count** | **int** |  | [optional] 
**stage_two_upload** | **bool** |  | [optional] 
**json_path** | **str** |  | [optional] 
**html_path** | **str** |  | [optional] 
**json_log** | **object** |  | 
**html_log** | **str** |  | [optional] 

## Example

```python
from apcd.models.submission_log_create import SubmissionLogCreate

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionLogCreate from a JSON string
submission_log_create_instance = SubmissionLogCreate.from_json(json)
# print the JSON string representation of the object
print SubmissionLogCreate.to_json()

# convert the object into a dict
submission_log_create_dict = submission_log_create_instance.to_dict()
# create an instance of SubmissionLogCreate from a dict
submission_log_create_form_dict = submission_log_create.from_dict(submission_log_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


