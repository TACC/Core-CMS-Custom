import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormGroup } from 'reactstrap';
import styles from './ExtensionsForm.module.css';
import ExtensionFormInfo from './ExtensionFormInfo';
import { useEntities } from 'hooks/entities';
import { fetchUtil } from 'utils/fetchUtil';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import Button from 'core-components/Button';
import { FormLabel } from 'apcd-components/Components/FormLabel/FormLabel';

const validationSchema = Yup.object().shape({
  extensions: Yup.array().of(
    Yup.object().shape({
      businessName: Yup.number()
        .transform((val, original) =>
          original == '' || isNaN(original) ? undefined : val
        )
        .typeError('Business name is required')
        .required('Business name is required'),
      extensionType: Yup.string().required('Extension Type is required'),
      applicableDataPeriod: Yup.string().required(
        'Applicable Data Period is required'
      ),
      requestedTargetDate: Yup.date().required(
        'Requested Target Date is required'
      ),
      currentExpectedDate: Yup.date().required(
        'Current Expected Date is required'
      ),
    })
  ),
  requestorName: Yup.string().required('Requestor Name is required'),
  requestorEmail: Yup.string()
    .email('Invalid email')
    .required('Requestor Email is required'),
  justification: Yup.string()
    .max(2000, '2000 character limit')
    .required('Justification is required'),
  acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

interface FormValues {
  extensions: {
    businessName: string;
    extensionType: string;
    applicableDataPeriod: string;
    requestedTargetDate: string;
    currentExpectedDate: string;
  }[];
  requestorName: string;
  requestorEmail: string;
  justification: string;
  acceptTerms: boolean;
}

const initialValues: FormValues = {
  extensions: [
    {
      businessName: '',
      extensionType: '',
      applicableDataPeriod: '',
      requestedTargetDate: '',
      currentExpectedDate: '',
    },
  ],
  requestorName: '',
  requestorEmail: '',
  justification: '',
  acceptTerms: false,
};

export const ExtensionRequestForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setErrorMessage('');
    const url = `submissions/extension/api/`;
    try {
      const response = await fetchUtil({
        url,
        method: `POST`,
        body: values,
      });
      if (response.status == 'success') {
        setIsSuccess(true);
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

  const {
    data: submitterData,
    isLoading: entitiesLoading,
    isError: entitiesError,
  } = useEntities();

  if (entitiesLoading) {
    return (
      <div className="loadingField">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <h1>Request Extension</h1>
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue, resetForm }) => {
          useEffect(() => {
            if (isSuccess) {
              resetForm();
            }
          }, [isSuccess, resetForm]);
          {
            return (
              <>
                <p>
                  This form should be completed and submitted by data submitters
                  to request an extension to the deadline for submitting either
                  a regular submission or a corrected resubmission. Please
                  review the{' '}
                  <a
                    href="https://sph.uth.edu/research/centers/center-for-health-care-data/texas-all-payor-claims-database/payor-registration-information"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Data Submission Guide
                  </a>{' '}
                  for details about completing and submitting this form,
                  especially regarding the timeliness of the request.
                </p>
                <Form>
                  {values.extensions.map((extension, index) => (
                    <ExtensionFormInfo
                      key={index}
                      index={index}
                      submitterData={submitterData}
                    />
                  ))}
                  <Button
                    type="primary"
                    onClick={() =>
                      setFieldValue('extensions', [
                        ...values.extensions,
                        {
                          businessName: '',
                          extensionType: '',
                          applicableDataPeriod: '',
                          requestedTargetDate: '',
                          currentExpectedDate: '',
                        },
                      ])
                    }
                    disabled={values.extensions.length >= 5}
                  >
                    + Add Another Extension Request
                  </Button>{' '}
                  <Button
                    type="secondary"
                    onClick={() =>
                      values.extensions.length > 1 &&
                      setFieldValue(
                        'extensions',
                        values.extensions.slice(0, -1)
                      )
                    }
                    disabled={values.extensions.length === 1}
                  >
                    - Remove Last Extension Request
                  </Button>
                  <hr />
                  <h4>Request and Justification</h4>
                  <p>
                    Provide rationale for the exception request, outlining the
                    reasons why the organization is unable to comply with the
                    relevant requirements. Provide as much detail as possible
                    regarding the exception request, indicating the specific
                    submission requirements for which relief is being sought. If
                    applicable, indicate how the organization plans to become
                    compliant.**
                  </p>
                  <FormGroup className="field-wrapper required">
                    <FormLabel
                      labelFor={'justification'}
                      label={''}
                      isRequired={true}
                    />
                    <Field
                      as="textarea"
                      name="justification"
                      id="justification"
                      rows="5"
                      maxLength="2000"
                    />
                    <ErrorMessage
                      name="justification"
                      component="div"
                      className={styles.isInvalid}
                    />
                    <div className="help-text">2000 character limit</div>
                  </FormGroup>
                  <hr />
                  <h4>Acknowledgment of Terms</h4>
                  <p>
                    I understand and acknowledge that the Texas Department of
                    Insurance (TDI) may review the validity of the information
                    submitted on this form.
                  </p>
                  <div className={styles.fieldRows}>
                    <FormGroup className="field-wrapper required">
                      <FormLabel
                        labelFor={'requestorName'}
                        label={'Requestor Name'}
                        isRequired={true}
                      />
                      <Field
                        type="text"
                        name="requestorName"
                        id="requestorName"
                        className={`form-control`}
                      />
                      <ErrorMessage
                        name="requestorName"
                        component="div"
                        className={styles.isInvalid}
                      />
                    </FormGroup>
                    <FormGroup className="field-wrapper required">
                      <FormLabel
                        labelFor={'requestorEmail'}
                        label={'Requestor Email'}
                        isRequired={true}
                      />
                      <Field
                        type="email"
                        name="requestorEmail"
                        id="requestorEmail"
                        className={`form-control`}
                      />
                      <ErrorMessage
                        name="requestorEmail"
                        component="div"
                        className={styles.isInvalid}
                      />
                    </FormGroup>
                  </div>
                  <div className={styles.fieldRows}>
                    <FormGroup check inline>
                      <Field
                        name="acceptTerms"
                        type="checkbox"
                        className={styles.termsCheckbox}
                      />
                      <FormLabel
                        labelFor={'acceptTerms'}
                        label={'Accept'}
                        isRequired={true}
                        check
                        style={{ marginLeft: '4px' }}
                      />
                      <div style={{ paddingLeft: '4px' }}>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className={styles.isInvalid}
                        />
                      </div>
                    </FormGroup>
                  </div>
                  {isSuccess ? (
                    <>
                      <Button
                        type="primary"
                        attr="submit"
                        isLoading={isSubmitting}
                        onClick={() => setIsSuccess(false)}
                      >
                        Submit Another Extension
                      </Button>
                      <div className={styles.fieldRows}>
                        <SectionMessage
                          type="success"
                          canDismiss={true}
                          onDismiss={() => setIsSuccess(false)}
                        >
                          Your extension request was successfully sent.
                        </SectionMessage>
                      </div>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      attr="submit"
                      isLoading={isSubmitting}
                      onClick={() => setIsSuccess(false)}
                    >
                      Submit
                    </Button>
                  )}
                  {errorMessage && (
                    <div className={styles.fieldRows}>
                      <SectionMessage type="error">
                        {errorMessage}
                      </SectionMessage>
                    </div>
                  )}
                  <hr />
                  <small>
                    <sup>1</sup> Applicable data period - month/year in which
                    claims data was adjudicated.
                  </small>
                  <br />
                  <small>
                    <sup>2</sup> Requested target date - requested
                    day/month/year by which the data should be received (the
                    extension date).
                  </small>
                  <br />
                  <small>
                    <sup>3</sup> Current expected date - day/month/year in which
                    applicable data was expected within the submission window.
                  </small>
                </Form>
              </>
            );
          }
        }}
      </Formik>
    </>
  );
};
