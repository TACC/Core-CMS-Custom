# SubmissionLogUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**submission_id** | **int** |  | [optional] 
**file_type** | **str** |  | [optional] 
**validation_suite** | **str** |  | [optional] 
**outcome** | **str** |  | [optional] 
**data_row_count** | **int** |  | [optional] 
**stage_two_upload** | **bool** |  | [optional] 
**json_path** | **str** |  | [optional] 
**html_path** | **str** |  | [optional] 

## Example

```python
from apcd.models.submission_log_update import SubmissionLogUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionLogUpdate from a JSON string
submission_log_update_instance = SubmissionLogUpdate.from_json(json)
# print the JSON string representation of the object
print SubmissionLogUpdate.to_json()

# convert the object into a dict
submission_log_update_dict = submission_log_update_instance.to_dict()
# create an instance of SubmissionLogUpdate from a dict
submission_log_update_form_dict = submission_log_update.from_dict(submission_log_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


