import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label } from 'reactstrap';
import Button from 'core-components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  RegistrationFormValues,
  transformToRegistrationFormValues,
  useRegFormData,
  usePostRegistration,
} from 'hooks/registrations';
import USStates from './USStates.fixture';
import { TextFormField } from './TextFormField';
import { RegistrationEntity } from './FormEntity';
import { RegistrationContact } from './FormContact';
import SectionMessage from 'core-components/SectionMessage';
import LoadingSpinner from 'core-components/LoadingSpinner';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';
import styles from './RegistrationForm.module.css';

const validationSchema = Yup.object().shape({
  reg_year: Yup.string()
    .matches(/^(202[3-9]|20[3-9][0-9]|2100)$/, {
      message: 'Registration year must be 2023 or later',
    })
    .required('Registration year is required'),
  business_name: Yup.string().required('Business name is required'),
  mailing_address: Yup.string().required('Mailing address is required'),
  city: Yup.string().required('City is required'),
  zip_code: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, { message: 'ZIP is not properly formatted' })
    .required('ZIP Code is required'),
  entities: Yup.array().of(
    Yup.object()
      .shape({
        entity_name: Yup.string().required('Entity name is required'),
        fein: Yup.string().matches(/^\d{2}-\d{7}$/, {
          message: 'FEIN is not properly formatted',
        }),
        license_number: Yup.string().matches(/^(?!0+$)[0-9]{1,10}$/, {
          message: 'License no. is not properly formatted',
        }),
        naic_company_code: Yup.string().matches(/^(?!0+$)[0-9]{1,10}$/, {
          message: 'NAIC code is not properly formatted',
        }),
        types_of_plans_commercial: Yup.boolean(),
        types_of_plans_medicare: Yup.boolean(),
        types_of_plans_medicaid: Yup.boolean(),
        types_of_files_eligibility_enrollment: Yup.boolean(),
        types_of_files_provider: Yup.boolean(),
        types_of_files_medical: Yup.boolean(),
        types_of_files_pharmacy: Yup.boolean(),
        types_of_files_dental: Yup.boolean(),
        total_covered_lives: Yup.number()
          .typeError('Must be an integer')
          .min(0)
          .required('Total covered lives is required'),
        claims_encounters_volume: Yup.number()
          .typeError('Must be an integer')
          .min(0)
          .required('Claims and Encounters volume is required'),
        total_claims_value: Yup.number()
          .typeError('Must be a number')
          .min(0)
          .required('Total Claims Value is required')
          .test(
            'maxDigitsAfterDecimal',
            'USD amount can only have two digits after decimal',
            (number) => Number.isInteger(number * 10 ** 2)
          ),
      })
      .test(function (value) {
        if (!value.fein && !value.license_number && !value.naic_company_code) {
          return this.createError({
            message: 'Please fill in at least one Number/Code.',
            path: this.path + '.fein',
          });
        }
        return true;
      })
      .test(function (value) {
        if (
          !value.types_of_plans_commercial &&
          !value.types_of_plans_medicare &&
          !value.types_of_plans_medicaid
        ) {
          return this.createError({
            message: 'Please select at least one plan type.',
            path: this.path + '.types_of_plans_hidden',
          });
        }
        return true;
      })
      .test(function (value) {
        if (
          !value.types_of_files_medical &&
          !value.types_of_files_pharmacy &&
          !value.types_of_files_dental
        ) {
          return this.createError({
            message: 'Please select at least one claims file type (see below).',
            path: this.path + '.types_of_files_hidden',
          });
        }
        return true;
      })
  ),
  contacts: Yup.array().of(
    Yup.object().shape({
      contact_type: Yup.string().required('Company role is required'),
      contact_name: Yup.string().required('Contact name is required'),
      contact_phone: Yup.string()
        .required('Phone number is required')
        .matches(/^(\+0?1\s)?\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}$/, {
          message: 'Phone number is not properly formatted',
        }),
      contact_email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    })
  ),
});

const initialValues: RegistrationFormValues = {
  on_behalf_of: 'true',
  reg_year: '',
  type: 'carrier',
  business_name: '',
  mailing_address: '',
  city: '',
  state: 'AL',
  zip_code: '',
  reg_id: -1,
  entities: [
    {
      entity_name: '',
      fein: '',
      license_number: '',
      naic_company_code: '',
      types_of_plans_commercial: false,
      types_of_plans_medicare: false,
      types_of_plans_medicaid: false,
      types_of_plans_hidden: false,
      types_of_files_eligibility_enrollment: true,
      types_of_files_provider: false,
      types_of_files_medical: false,
      types_of_files_pharmacy: false,
      types_of_files_dental: false,
      types_of_files_hidden: false,
      total_covered_lives: '',
      claims_encounters_volume: '',
      total_claims_value: '',
      entity_id: -1,
    },
  ],
  contacts: [
    {
      contact_type: '',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      contact_notifications: false,
      contact_id: -1,
    },
  ],
};

const initialTouched = {
  on_behalf_of: true,
  type: true,
  state: true,
  entities: [
    {
      types_of_plans_commercial: true,
      types_of_plans_medicare: true,
      types_of_plans_medicaid: true,
      types_of_files_eligibility_enrollment: true,
      types_of_files_provider: true,
      types_of_files_medical: true,
      types_of_files_pharmacy: true,
      types_of_files_dental: true,
    },
  ],
};

export const RegistrationForm: React.FC<{
  isEdit?: boolean;
  inputValues?: RegistrationFormValues;
  isModal?: boolean;
  status_options?: string[];
  onSuccessCallback?: () => void;
}> = ({
  isEdit = false,
  inputValues,
  isModal = false,
  status_options = [],
  onSuccessCallback = () => {},
}) => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useRegFormData(
    searchParams.get('reg_id')
  );
  const {
    mutate: submitForm,
    isLoading: registrationSubmissionPending,
    isSuccess,
    data: registrationResponse,
    error: registrationError,
  } = usePostRegistration();

  const handleSubmit = async (values: RegistrationFormValues) => {
    const url = isEdit
      ? `administration/request-to-submit/api/${inputValues?.reg_id ?? -1}/`
      : `register/request-to-submit/api/`;
    submitForm({ url, body: values });
  };
  const handleClick = () => {
    window.location.href = '/workbench/dashboard';
  };

  if (isLoading) {
    return (
      <div className="loadingField">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading form</div>;
  }

  return (
    <div className="row">
      <div className="col">
        {!isModal ? (
          <>
            <h1>Request to Submit</h1>
            <hr />

            <p style={{ marginBottom: '30px' }}>
              This form should be completed and submitted to register as a data
              submitter. Please review the
              <a
                href="https://sph.uth.edu/research/centers/center-for-health-care-data/assets/tx-apcd/data-submission-guides/TXAPCD%20-%20Data%20Submission%20Guide%20(DSG).pdf"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                Data Submission Guide{' '}
              </a>
              for details about completing and submitting this form, paying
              special attention to the schedule of submissions including test
              files, historical files, and monthly files.
            </p>

            <hr />
          </>
        ) : (
          ''
        )}
        <Formik
          validateOnMount={true}
          initialValues={
            data && isEdit
              ? transformToRegistrationFormValues( // use initialValues to preload data for edit registration
                  data['registration_data']        // to leverage formik's dirty test and disable submit on form load
                )
              : inputValues ?? initialValues
          }
          initialTouched={initialTouched}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, resetForm, setValues, dirty }) => (
            useEffect(() => {
              if (isSuccess) {
                resetForm();
              }
            }, [isSuccess, resetForm]),
            useEffect(() => {
              if (data && !isEdit) {
                setValues(transformToRegistrationFormValues(
                  data['registration_data'],
                  data['renew']
                ));
              }
            }, [data, isEdit, setValues]), // set form values via setValues method instead of initialValues prop 
                                           // for reg renewal to pass formik's dirty test and enable submit button on form load
            isSuccess ? (
              <>
                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                  Your {isEdit ? 'update' : 'submission'} was successful. Your
                  registration ID is: <b>{registrationResponse?.reg_id}</b>.
                </div>
                {isModal ? (
                  <Button
                    disabled={registrationSubmissionPending}
                    onClick={onSuccessCallback}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    disabled={registrationSubmissionPending}
                    onClick={handleClick}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </>
            ) : (
              <Form>
                <h4>Organization</h4>
                {status_options.length > 0 ? (
                  <FieldWrapper
                    name="reg_status"
                    label="Registration Status"
                    required={true}
                  >
                    <Field
                      as="select"
                      name="reg_status"
                      id="reg_status"
                      className="choicefield"
                    >
                      {status_options.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </FieldWrapper>
                ) : (
                  <></>
                )}
                <FieldWrapper
                  name="on_behalf_of"
                  label="On behalf of:"
                  required={true}
                  className="radioselect"
                  description="Whether you submit on behalf of your own organization (Self) or another organization (Other)"
                >
                  <FormGroup id="on_behalf_of" noMargin={true}>
                    <Label>
                      <Field
                        type="radio"
                        name="on_behalf_of"
                        id="on_behalf_of"
                        className="radioselect"
                        value="true"
                      />{' '}
                      Self
                    </Label>
                    <Label>
                      <Field
                        type="radio"
                        name="on_behalf_of"
                        id="on_behalf_of"
                        className="radioselect"
                        value="false"
                      />{' '}
                      Other
                    </Label>
                  </FormGroup>
                </FieldWrapper>
                <TextFormField
                  name="reg_year"
                  label="Registration Year"
                  helpText="Enter the registration year. Must be 2023 or later."
                  required={true}
                />
                <FieldWrapper name="type" label="Type" required={true}>
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
                    <option value="pbm">Pharmacy Benefit Manager (PBM)</option>
                  </Field>
                </FieldWrapper>
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
                <TextFormField name="city" label="City" required={true} />
                <FieldWrapper name="state" label="State" required={true}>
                  <Field
                    as="select"
                    name="state"
                    id="state"
                    className="choicefield"
                  >
                    {USStates.map((USState) => (
                      <option key={USState.value} value={USState.value}>
                        {USState.label}
                      </option>
                    ))}
                  </Field>
                </FieldWrapper>
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
                {values.entities.length === 5 && (
                  <p className="c-message c-message--type-info c-message--scope-inline">
                    If you need to associate more than 5 entities with your
                    registration,
                    <a
                      href="/workbench/dashboard"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {' '}
                      submit a ticket{' '}
                    </a>
                    with your additional entries and your registration ID
                    (displayed after submitting this form).
                  </p>
                )}
                <div className="button-wrapper">
                  <Button
                    className={`c-button c-button--primary ${styles.contactsAndEntitiesButtons}`}
                    disabled={values.entities.length === 5}
                    onClick={() =>
                      setFieldValue('entities', [
                        ...values.entities,
                        {
                          entity_name: '',
                          fein: '',
                          license_number: '',
                          naic_company_code: '',
                          types_of_plans_commercial: false,
                          types_of_plans_medicare: false,
                          types_of_plans_medicaid: false,
                          types_of_plans_hidden: false,
                          types_of_files_eligibility_enrollment: true,
                          types_of_files_provider: false,
                          types_of_files_medical: false,
                          types_of_files_pharmacy: false,
                          types_of_files_dental: false,
                          types_of_files_hidden: false,
                          total_covered_lives: '',
                          claims_encounters_volume: '',
                          total_claims_value: '',
                        },
                      ])
                    }
                  >
                    + Add Another Entity
                  </Button>{' '}
                  <Button
                    onClick={() =>
                      values.entities.length > 1 &&
                      setFieldValue('entities', values.entities.slice(0, -1))
                    }
                    disabled={values.entities.length === 1}
                  >
                    - Remove Last Entity
                  </Button>
                </div>
                <hr />
                <h4>Contact Information</h4>
                {values.contacts.map((contact, index) => (
                  <RegistrationContact key={index} index={index} />
                ))}
                <div className="button-wrapper">
                  <Button
                    className={`c-button c-button--primary ${styles.contactsAndEntitiesButtons}`}
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
                    onClick={() =>
                      values.contacts.length > 1 &&
                      setFieldValue('contacts', values.contacts.slice(0, -1))
                    }
                    disabled={values.contacts.length === 1}
                  >
                    - Remove Last Contact
                  </Button>
                </div>
                <div className="button-wrapper submit">
                  <Button
                    attr="submit"
                    className="form-button"
                    disabled={registrationSubmissionPending || !dirty}
                    isLoading={registrationSubmissionPending}
                  >
                    Submit
                  </Button>
                </div>
                {registrationError && (
                  <div>
                    <SectionMessage type="error">
                      {registrationError.message ??
                        'An error occurred while saving the data. Please try again.'}
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
            <small>
              ¹ Third Party Administrator / Administrative Services Only
              (TPA/ASO)
              <br />
              ² Federal Employer Identification Number (FEIN)
              <br />
              ³ National Association of Insurance Commissioners (NAIC)
              <br />
              ⁴ United States Dollar (USD)
              <br />
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
