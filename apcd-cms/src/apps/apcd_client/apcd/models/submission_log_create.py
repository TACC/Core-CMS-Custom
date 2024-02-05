# coding: utf-8

"""
    APCD API

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

    The version of the OpenAPI document: 0.1.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


from __future__ import annotations
import pprint
import re  # noqa: F401
import json


from typing import Any, ClassVar, Dict, List, Optional
from pydantic import BaseModel, StrictBool, StrictInt, StrictStr
from pydantic import Field
from typing_extensions import Annotated
try:
    from typing import Self
except ImportError:
    from typing_extensions import Self

class SubmissionLogCreate(BaseModel):
    """
    SubmissionLogCreate
    """ # noqa: E501
    submission_id: StrictInt
    file_type: Optional[Annotated[str, Field(strict=True, max_length=2)]] = None
    validation_suite: Annotated[str, Field(strict=True, max_length=50)]
    outcome: Annotated[str, Field(strict=True, max_length=15)]
    data_row_count: Optional[StrictInt] = None
    stage_two_upload: Optional[StrictBool] = None
    json_path: Optional[Annotated[str, Field(strict=True, max_length=300)]] = None
    html_path: Optional[Annotated[str, Field(strict=True, max_length=300)]] = None
    json_log: Dict[str, Any]
    html_log: Optional[StrictStr] = None
    __properties: ClassVar[List[str]] = ["submission_id", "file_type", "validation_suite", "outcome", "data_row_count", "stage_two_upload", "json_path", "html_path", "json_log", "html_log"]

    model_config = {
        "populate_by_name": True,
        "validate_assignment": True,
        "protected_namespaces": (),
    }


    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.model_dump(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        # TODO: pydantic v2: use .model_dump_json(by_alias=True, exclude_unset=True) instead
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> Self:
        """Create an instance of SubmissionLogCreate from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self) -> Dict[str, Any]:
        """Return the dictionary representation of the model using alias.

        This has the following differences from calling pydantic's
        `self.model_dump(by_alias=True)`:

        * `None` is only added to the output dict for nullable fields that
          were set at model initialization. Other fields with value `None`
          are ignored.
        """
        _dict = self.model_dump(
            by_alias=True,
            exclude={
            },
            exclude_none=True,
        )
        return _dict

    @classmethod
    def from_dict(cls, obj: Dict) -> Self:
        """Create an instance of SubmissionLogCreate from a dict"""
        if obj is None:
            return None

        if not isinstance(obj, dict):
            return cls.model_validate(obj)

        _obj = cls.model_validate({
            "submission_id": obj.get("submission_id"),
            "file_type": obj.get("file_type"),
            "validation_suite": obj.get("validation_suite"),
            "outcome": obj.get("outcome"),
            "data_row_count": obj.get("data_row_count"),
            "stage_two_upload": obj.get("stage_two_upload"),
            "json_path": obj.get("json_path"),
            "html_path": obj.get("html_path"),
            "json_log": obj.get("json_log"),
            "html_log": obj.get("html_log")
        })
        return _obj


