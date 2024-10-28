import React from 'react';
import { Field, ErrorMessage } from "formik";
import {
    FormGroup,
    FormText,
    Label,
    FormFeedback,
  } from "reactstrap";
import { TextFormField } from './TextFormField';
  

export const RegistrationEntity: React.FC<{index: number}> = ({ index }) => {

    return (
    <div>
        <h5>Entity {index+1}</h5>
        <TextFormField 
            name={`entities.${index}.entity_name`}
            label="Name"
            required={true}
        />

        <FormGroup className='field-wrapper required'>
            <Label>Number/Code</Label>
            <FormText className='help-text'>
                Provide all available identifiers. At least one of the following is required.
            </FormText>
            <FormGroup className='o-grid o-grid--col-auto-count'>
                <TextFormField 
                    name={`entities.${index}.fein`}
                    label="FEIN"
                    helpText='Enter in format 12-3456789.'
                />

                <TextFormField 
                    name={`entities.${index}.license_number`}
                    label="License Number"
                    helpText='Enter digits only.'
                />

                <TextFormField 
                    name={`entities.${index}.naic_company_code`}
                    label="Company Code"
                    helpText='Enter digits only.'
                />
            </FormGroup>

        </FormGroup>

        <h6>Type of Plan</h6>
        <Label>Plan Types</Label>
        <FormGroup className='checkboxselectmultiple required' id={`entities.${index}.types_of_plans`}>
            {['Commercial', 'Medicare', 'Medicaid'].map(planType => (
                <FormGroup>
                    <Label htmlFor={`entities.${index}.types_of_plans_${planType.toLowerCase()}`}>
                        <Field
                            type="checkbox"
                            key={`entities.${index}.types_of_plans_${planType.toLowerCase()}`}
                            name={`entities.${index}.types_of_plans_${planType.toLowerCase()}`}
                            id={`entities.${index}.types_of_plans_${planType.toLowerCase()}`}
                        >
                        </Field>
                        {planType}
                    </Label>
                    <ErrorMessage
                        name={`entities.${index}.types_of_plans_${planType.toLowerCase()}`}
                        component={FormFeedback}
                    />
                </FormGroup>
            ))}
        </FormGroup>

        <h6>File Submission</h6>
        <Label>Types of Files</Label>
        <FormText className='help-text'>
            Eligibility/Enrollment files are mandatory. At least one claims file type (Medical, Pharmacy, and Dental) must be selected.
        </FormText>
        <FormGroup className='checkboxselectmultiple required' id={`entities.${index}.types_of_files`}>
            {['Eligibility/Enrollment', 'Provider', 'Medical', 'Pharmacy', 'Dental'].map(fileType => (
                <FormGroup>
                    <Label htmlFor={`entities.${index}.types_of_files_${fileType.toLowerCase().replace('/','_')}`}>
                    <Field
                        type="checkbox"
                        key={`entities.${index}.types_of_files_${fileType.toLowerCase().replace('/','_')}`}
                        name={`entities.${index}.types_of_files_${fileType.toLowerCase().replace('/','_')}`}
                        id={`entities.${index}.types_of_files_${fileType.toLowerCase().replace('/','_')}`}
                        disabled={fileType == "Eligibility/Enrollment" ? true : false }
                    >
                    </Field>{fileType}</Label>
                    <ErrorMessage
                        name={`entities.${index}.types_of_files_${fileType.toLowerCase().replace('/','_')}`}
                        component={FormFeedback}
                    />
                </FormGroup>
            ))}
        </FormGroup>

        <h6>
            Coverage Estimates
            <small
                > (Inclusive of all claims as of December 31 of previous
                year.)
            </small>
        </h6>

        <TextFormField 
            name={`entities.${index}.total_covered_lives`}
            label="Total Covered Lives"
            required={true}
        />
        <TextFormField 
            name={`entities.${index}.claims_encounters_volume`}
            label="Claims and Encounters Volume"
            helpText='Enter a whole number.'
            required={true}
        />
        <TextFormField 
            name={`entities.${index}.total_claims_value`}
            label={`Total Claims Value (USD)${<sup>4</sup>}`}
            required={true}
        />
    </div>
    )
}