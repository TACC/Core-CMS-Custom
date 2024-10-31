import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormGroup,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import { useFormData } from 'hooks/registrations';
import { fetchUtil } from 'utils/fetchUtil';
import USStates from './USStates.fixture';
import { TextFormField } from './TextFormField';
import { RegistrationEntity } from './FormEntity';
import { RegistrationContact } from './FormContact';
import SectionMessage from 'core-components/SectionMessage';
import LoadingSpinner from 'core-components/LoadingSpinner';

const validationSchema = Yup.object().shape({
    reg_year: Yup.string().required('Registration year is required'),
    business_name: Yup.string().required('Business name is required'),
    mailing_address: Yup.string().required('Mailing address is required'),
    city: Yup.string().required('City is required'),
    zip_code: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, { message: 'ZIP is not properly formatted' })
      .required('ZIP Code is required'),
    entities: Yup.array().of(
        Yup.object().shape({
          entity_name: Yup.string().required('Entity name is required'),
          fein: Yup.string().matches(/^\d{2}-\d{7}$/, { message: 'FEIN is not properly formatted' }),
          license_number: Yup.string().matches(/^(?!0+$)[0-9]{1,10}$/, { message: 'License no. is not properly formatted' }),
          naic_company_code: Yup.string().matches(/^(?!0+$)[0-9]{1,10}$/, { message: 'NAIC code is not properly formatted' }),
          types_of_plans_commercial: Yup.boolean(),
          types_of_plans_medicare: Yup.boolean(),
          types_of_plans_medicaid: Yup.boolean(),
          types_of_files_eligibility_enrollment: Yup.boolean(),
          types_of_files_provider: Yup.boolean(),
          types_of_files_medical: Yup.boolean(),
          types_of_files_pharmacy: Yup.boolean(),
          types_of_files_dental: Yup.boolean(),
          total_covered_lives: Yup.number().positive()
            .required('Total covered lives is required'),
          claims_encounters_volume: Yup.number().positive()
            .required('Claims and Encounters volume is required'),
          total_claims_value: Yup.number().positive()
            .required('Total Claims Value is required')
            .test(
              "maxDigitsAfterDecimal",
              "number field must have 2 digits after decimal or less",
              (number) => Number.isInteger(number * (10 ** 2))
            )
        })
        .test(  
            function(value) { 
                if (!value.fein && !value.license_number && !value.naic_company_code){
                   return this.createError({message: "Please fill in at least one Number/Code."});  
                }
                return true;
            } 
        )
        .test(  
            function(value) { 
                if (!value.types_of_plans_commercial && !value.types_of_plans_medicare && !value.types_of_plans_medicaid){
                   return this.createError({message: "Please select at least one plan type."});  
                }
                return true;
            } 
        )
        .test(  
            function(value) { 
                if (!value.types_of_files_medical && !value.types_of_files_pharmacy && !value.types_of_files_dental){
                   return this.createError({message: "Please select at least one claims file type (see above)."});  
                }
                return true;
            } 
        )
      ),
      contacts: Yup.array().of(
        Yup.object().shape({
            contact_type: Yup.string().required('Company role is required'),
            contact_name: Yup.string().required('Contact name is required'),
            contact_phone: Yup.string().required('Phone number is required')
              .matches(/^(\+0?1\s)?\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}$/),
            contact_email: Yup.string().email('Invalid email').required('Email is required')
        })
      )
});

export interface FormValues {
    on_behalf_of: boolean;
    reg_year: string;
    type?: undefined;
    business_name: string;
    mailing_address: string;
    city: string;
    state?: undefined;
    zip_code: string;
    entities: {
        entity_name: string;
        fein: string;
        license_number: string;
        naic_company_code: string;
        types_of_plans_commerical: boolean;
        types_of_plans_medicare: boolean;
        types_of_plans_medicaid: boolean;
        types_of_files_eligibility_enrollment: boolean;
        types_of_files_provider: boolean;
        types_of_files_medical: boolean;
        types_of_files_pharmacy: boolean;
        types_of_files_dental: boolean;
        total_covered_lives: any;
        claims_encounters_volume: any;
        total_claims_value: any;
    }[];
    contacts: {
        contact_type: string;
        contact_name: string;
        contact_phone: string;
        contact_email: string;
        contact_notifications: boolean;
    }[];
};
  
const initialValues: FormValues = {
    on_behalf_of: true,
    reg_year: '',
    business_name: '',
    mailing_address: '',
    city: '',
    zip_code: '',
    entities: [
        {
            entity_name: '',
            fein: '',
            license_number: '',
            naic_company_code: '',
            types_of_plans_commerical: false,
            types_of_plans_medicare: false,
            types_of_plans_medicaid: false,
            types_of_files_eligibility_enrollment: true,
            types_of_files_provider: false,
            types_of_files_medical: false,
            types_of_files_pharmacy: false,
            types_of_files_dental: false,
            total_covered_lives: '',
            claims_encounters_volume: '',
            total_claims_value: ''
        },
    ],
    contacts: [
        {
            contact_type: '',
            contact_name: '',
            contact_phone: '',
            contact_email: '',
            contact_notifications: false
        }
    ]
};


export const RegistrationForm: React.FC = () => {
    const { data, isLoading, isError } = useFormData({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [regId, setRegId] = useState(null);
    
    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setErrorMessage('');
        const url = `register/request-to-submit/api/`;
        try {
            const response = await fetchUtil({
                url,
                method: `POST`,
                body: values,
            });
            if (response.status == 'success') {
                setIsSuccess(true);
                setRegId(response.reg_id);
            }
        } catch (error: any) {
            console.error('Error saving data:', error);
            console.log(url);
            if (error.response && error.response.data) {
                setErrorMessage(
                    error.response.data.message ||
                    'An error occurred while saving the data. Please try again.'
                );
            } else {
                setErrorMessage(
                    'An error occurred while saving the data. Please try again.'
                );
            }
        } finally {
          setSubmitting(false);
        }      
    };

    if (isLoading) {
        <div className="loadingField">
            <LoadingSpinner />
        </div>
    }
    
    if (isError) {
        return <div>Error loading form</div>;
    }      
    
    return (
        <div className="row">
            <div className="col">
                <h1>Request to Submit</h1>
                <hr />

                <p style={{marginBottom: '30px'}}>
                    This form should be completed and submitted to register as a data
                    submitter. Please review the
                    <a
                        href="https://sph.uth.edu/research/centers/center-for-health-care-data/assets/tx-apcd/data-submission-guides/TXAPCD%20-%20Data%20Submission%20Guide%20(DSG).pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {' '}Data Submission Guide{' '}
                    </a>
                    for details about completing and submitting this form, paying
                    special attention to the schedule of submissions including test files,
                    historical files, and monthly files.
                </p>

                <hr />
                <Formik
                    validateOnMount={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, setFieldValue, resetForm }) => (
                        useEffect(() => {
                            if (isSuccess) {
                              resetForm();
                            }
                        }, [isSuccess, resetForm]),
                        isSuccess ? (
                            <>
                                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                                    Your submission was successful.
                                    Your registration ID is: <b>{{ regId }}</b>.
                                </div>
                                <Button 
                                    type="button"
                                    className="c-button c-button--primary"
                                    disabled={isSubmitting}
                                    href='/workbench/dashboard'
                                >
                                    Go to Dashboard
                                </Button>
                            </>
                        ) : (
                            <Form>
                                <h4>
                                    Organization
                                </h4>
                                <FormGroup className='field-wrapper radioselect required'>
                                    <Label>
                                        On behalf of:
                                        <span style={{"color": "red"}}> (required)</span>
                                    </Label>
                                    <FormGroup id="on_behalf_of" noMargin={true}>
                                        <Label>
                                            <Field type="radio" key="self" name="on_behalf_of" id="on_behalf_of" className="radioselect" value="true" checked />
                                            {' '}Self
                                        </Label>
                                        <Label>
                                            <Field type="radio" key ="other" name="on_behalf_of" id="on_behalf_of" className="radioselect" value="false" />
                                            {' '}Other
                                        </Label>
                                        <div className='help-text'>
                                            Whether you submit on behalf of your own organization (Self) or another organization (Other)
                                        </div>
                                    </FormGroup>
                                </FormGroup>

                                <TextFormField 
                                    name="reg_year"
                                    label="Registration Year"
                                    helpText="Enter the registration year. Must be 2023 or later."
                                    required={true}
                                />

                                <FormGroup className='field-wrapper required' noMargin={true}>
                                    <Label htmlFor="type">
                                        Type
                                        <span style={{"color": "red"}}> (required)</span>
                                    </Label>
                                    <Field
                                        as="select" 
                                        name="type"
                                        id="type"
                                        className="choicefield required"
                                        >
                                        <option value="carrier">Insurance Carrier</option>
                                        <option value="tpa_aso">
                                            Plan Administrator¹ (TPA/ASO)
                                        </option>
                                        <option value="pbm">
                                            Pharmacy Benefit Manager (PBM)
                                        </option>
                                    </Field>
                                    <ErrorMessage
                                        name="type"
                                        component={FormFeedback}
                                    />
                                </FormGroup>

                                <TextFormField 
                                    name="business_name"
                                    label="Business Name"
                                    required={true}
                                />

                                <TextFormField 
                                    name="mailing_address"
                                    label="Mailing Address"
                                    required={true}
                                />

                                <TextFormField 
                                    name="city"
                                    label="City"
                                    required={true}
                                />

                                <FormGroup className='field-wrapper required' noMargin={true}>
                                    <Label for="state">
                                        State
                                        <span style={{"color": "red"}}> (required)</span>
                                    </Label>
                                    <Field 
                                        as="select"
                                        name="state"
                                        id="state"
                                        className="choicefield required"
                                    >
                                        {USStates.map((USState) => (
                                            <option key={USState.value} value={USState.value}>{USState.label}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="type"
                                        component={FormFeedback}
                                    />
                                </FormGroup>

                                <TextFormField 
                                    name="zip_code"
                                    label="ZIP Code"
                                    required={true}
                                />

                                <hr />
                                <h4>
                                    Entity Being Registered
                                    <small>
                                        (If single company, enter the same organization as above.)
                                    </small>
                                </h4>
                                {values.entities.map((entity, index) => (
                                    <RegistrationEntity key={index} index={index} />
                                ))}
                                {values.entities.length === 5 &&
                                    <p className="c-message c-message--type-info c-message--scope-inline">
                                        If you need to associate more than 5 entities with your registration,
                                        <a href="/workbench/dashboard" target="_blank" rel="noreferrer">
                                            {' '}submit a ticket{' '}
                                        </a> 
                                        with your additional entries and your registration ID (displayed after submitting this form).
                                    </p> 
                                }
                                <Button
                                    className="c-button c-button--primary"
                                    type="button"
                                    color="primary"
                                    disabled={values.entities.length === 5}
                                    onClick={() =>
                                        setFieldValue('entities', [
                                            ...values.entities,
                                            {
                                                entity_name: '',
                                                fein: '',
                                                license_number: '',
                                                naic_company_code: '',
                                                types_of_plans_commerical: false,
                                                types_of_plans_medicare: false,
                                                types_of_plans_medicaid: false,
                                                types_of_files_eligibility_enrollment: true,
                                                types_of_files_provider: false,
                                                types_of_files_medical: false,
                                                types_of_files_pharmacy: false,
                                                types_of_files_dental: false,
                                                total_covered_lives: '',
                                                claims_encounters_volume: '',
                                                total_claims_value: ''
                                            },
                                        ])
                                    }
                                >
                                    + Add Another Entity
                                </Button>{' '}
                                <Button
                                    className="c-button c-button--secondary"
                                    type="button"
                                    onClick={() =>
                                        values.entities.length > 1 &&
                                        setFieldValue('entities', values.entities.slice(0, -1))
                                    }
                                    color="secondary"
                                    disabled={values.entities.length === 1}
                                >
                                    - Remove Last Entity
                                </Button>

                                <hr />
                                <h4>
                                    Contact Information
                                </h4>
                                {values.contacts.map((contact, index) => (
                                    <RegistrationContact key={index} index={index} />
                                ))}
                                <Button
                                    className="c-button c-button--primary"
                                    type="button"
                                    color="primary"
                                    disabled={values.contacts.length === 5}
                                    onClick={() =>
                                        setFieldValue('contacts', [
                                            ...values.contacts,
                                            {
                                                contact_type: '',
                                                contact_name: '',
                                                contact_phone: '',
                                                contact_email: '',
                                                contact_notifications: false,
                                            },
                                        ])
                                    }
                                >
                                    + Add Another Contact
                                </Button>{' '}
                                <Button
                                    className="c-button c-button--secondary"
                                    type="button"
                                    onClick={() =>
                                        values.contacts.length > 1 &&
                                        setFieldValue('contacts', values.contacts.slice(0, -1))
                                    }
                                    color="secondary"
                                    disabled={values.contacts.length === 1}
                                >
                                    - Remove Last Contact
                                </Button>
                                <div className="button-wrapper submit">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="form-button"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                {errorMessage && (
                                    <div>
                                        <SectionMessage type="error">
                                            {errorMessage}
                                        </SectionMessage>
                                    </div>
                                )}
                            </Form>
                        )
                    )}
                </Formik>

                <div className="o-section o-section--style-light">
                    <hr />
                    <p>
                        <small
                            >¹ Third Party Administrator / Administrative Services Only (TPA/ASO)<br />
                            ² Federal Employer Identification Number (FEIN)<br />
                            ³ National Association of Insurance Commissioners (NAIC)<br />
                            ⁴ United States Dollar (USD)<br />
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
};