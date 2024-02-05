# SubmissionWithChildren


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apcd_id** | **int** |  | 
**submitter_id** | **int** |  | 
**zip_file_name** | **str** |  | 
**received_timestamp** | **datetime** |  | 
**data_period_start** | **int** |  | 
**data_period_end** | **int** |  | 
**test_submission_flag** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**outcome** | **str** |  | [optional] 
**outcome_reason** | **str** |  | [optional] 
**compressed_size** | **int** |  | [optional] 
**processed_timestamp** | **datetime** |  | [optional] 
**notes** | **str** |  | [optional] 
**payor_code** | **int** |  | [optional] 
**received_id** | **int** |  | [optional] 
**submission_id** | **int** |  | 
**created_at** | **datetime** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 

## Example

```python
from apcd.models.submission_with_children import SubmissionWithChildren

# TODO update the JSON string below
json = "{}"
# create an instance of SubmissionWithChildren from a JSON string
submission_with_children_instance = SubmissionWithChildren.from_json(json)
# print the JSON string representation of the object
print SubmissionWithChildren.to_json()

# convert the object into a dict
submission_with_children_dict = submission_with_children_instance.to_dict()
# create an instance of SubmissionWithChildren from a dict
submission_with_children_form_dict = submission_with_children.from_dict(submission_with_children_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


