# SubmissionUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apcd_id** | **int** |  | [optional] 
**submitter_id** | **int** |  | [optional] 
**zip_file_name** | **str** |  | [optional] 
**received_timestamp** | **datetime** |  | [optional] 
**data_period_start** | **int** |  | [optional] 
**data_period_end** | **int** |  | [optional] 
**test_submission_flag** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**outcome** | **str** |  | [optional] 
**outcome_reason** | **str** |  | [optional] 
**compressed_size** | **int** |  | [optional] 
**processed_timestamp** | **datetime** |  | [optional] 
**notes** | **str** |  | [optional] 
**payor_code** | **int** |  | [optional] 
**received_id** | **int** |  | [optional] 

## Example

```python
from apcd.models.submission_update import SubmissionUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionUpdate from a JSON string
submission_update_instance = SubmissionUpdate.from_json(json)
# print the JSON string representation of the object
print SubmissionUpdate.to_json()

# convert the object into a dict
submission_update_dict = submission_update_instance.to_dict()
# create an instance of SubmissionUpdate from a dict
submission_update_form_dict = submission_update.from_dict(submission_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


