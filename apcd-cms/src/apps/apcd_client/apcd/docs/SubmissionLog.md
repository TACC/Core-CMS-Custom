# SubmissionLog


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
**log_id** | **int** |  | 
**json_log** | **object** |  | [optional] 
**html_log** | **str** |  | [optional] 

## Example

```python
from apcd.models.submission_log import SubmissionLog

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionLog from a JSON string
submission_log_instance = SubmissionLog.from_json(json)
# print the JSON string representation of the object
print SubmissionLog.to_json()

# convert the object into a dict
submission_log_dict = submission_log_instance.to_dict()
# create an instance of SubmissionLog from a dict
submission_log_form_dict = submission_log.from_dict(submission_log_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


