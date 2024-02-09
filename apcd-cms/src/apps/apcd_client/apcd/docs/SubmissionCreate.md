# SubmissionCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apcd_id** | **int** |  | 
**submitter_id** | **int** |  | 
**zip_file_name** | **str** |  | 
**received_timestamp** | **datetime** |  | 
**data_period_start** | **int** |  | 
**data_period_end** | **int** |  | 
**test_submission_flag** | **str** |  | 
**status** | **str** |  | 
**outcome** | **str** |  | [optional] 
**outcome_reason** | **str** |  | [optional] 
**compressed_size** | **int** |  | 
**processed_timestamp** | **datetime** |  | 
**notes** | **str** |  | [optional] 
**payor_code** | **int** |  | 
**received_id** | **int** |  | [optional] 

## Example

```python
from apcd.models.submission_create import SubmissionCreate

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionCreate from a JSON string
submission_create_instance = SubmissionCreate.from_json(json)
# print the JSON string representation of the object
print SubmissionCreate.to_json()

# convert the object into a dict
submission_create_dict = submission_create_instance.to_dict()
# create an instance of SubmissionCreate from a dict
submission_create_form_dict = submission_create.from_dict(submission_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


