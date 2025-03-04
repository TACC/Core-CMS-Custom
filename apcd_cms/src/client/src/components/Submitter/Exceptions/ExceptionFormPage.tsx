import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label } from 'reactstrap';
import styles from './ExceptionForm.module.css';
import { ExceptionForm } from './';
import SectionMessage from 'core-components/SectionMessage';
import { fetchUtil } from 'utils/fetchUtil';
import { Link } from 'react-router-dom';
import { Entities, useEntities } from 'hooks/entities';
import Button from 'core-components/Button';
import LoadingSpinner from 'core-components/LoadingSpinner';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';

interface FormValues {
  exceptionType: string;
  exceptions: {
    businessName: number;
    fileType: string;
    fieldCode: string;
    expiration_date: string;
    requested_threshold: number;
    required_threshold: number;
  }[];
  justification: string;
  requestorName: string;
  requestorEmail: string;
  acceptTerms: boolean;
  expirationDateOther: string;
  otherExceptionBusinessName: string;
}

export const ExceptionFormPage: React.FC = () => {
  const [selectedExceptionType, setSelectedExceptionType] =
    useState<string>('');
  const [numberOfExceptionBlocks] = useState<number>(1);

  // Dynamically determines validation schema based on selectedExceptionType state
  const baseSchema = {
    exceptionType: Yup.string().required(''),
    justification: Yup.string()
      .max(2000, 'Must be 2000 characters or less')
      .required('Justification is required'),
    requestorName: Yup.string().required('Requestor name is required'),
    requestorEmail: Yup.string()
      .email('Invalid email')
      .required('Requestor email is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  };

  const exceptionSchema = Yup.array().of(
    Yup.object().shape({
      // Allows users to pick from human readable business names, but passes submitter id to
      // database query which is what the table looks for to match exception with submitter
      businessName: Yup.number()
        .transform((val, original) =>
          original == '' || isNaN(original) ? undefined : val
        )
        .typeError('Business name is required')
        .required('Business name is required'),
      fileType: Yup.string().required('File type is required'),
      fieldCode: Yup.string().required('Field code is required'),
      expiration_date: Yup.date()
        .required('Expiration date is required')
        .max('9999-12-31', 'Expiration date must be MM/DD/YYYY')
        .min('0001-01-01', 'Expiration date must be MM/DD/YYYY'),
      requested_threshold: Yup.number().required(
        'Requested threshold is required'
      ),
      required_threshold: Yup.number()
        .min(1, 'This field code does not require an exception submission.')
        .required('Required'),
    })
  );

  const validationSchema = Yup.object().shape({
    ...baseSchema,
    exceptions: Yup.mixed().when('exceptionType', {
      is: 'threshold',
      then: (schema) => exceptionSchema,
      otherwise: (schema) => schema.strip(),
    }),
    expirationDateOther: Yup.mixed().when('exceptionType', {
      is: 'other',
      then: (schema) =>
        Yup.date()
          .required('Required')
          .max('9999-12-31', 'Date must be MM/DD/YYYY')
          .min('0001-01-01', 'Date must be MM/DD/YYYY'),
      otherwise: (schema) => schema.strip(),
    }),
    otherExceptionBusinessName: Yup.mixed().when('exceptionType', {
      is: 'other',
      then: () => Yup.number().min(0, 'Required').required('Required'),
      otherwise: () => Yup.mixed().strip(),
    }),
  });
  const initialValues: FormValues = {
    exceptionType: selectedExceptionType ? selectedExceptionType : '',
    exceptions: Array.from({ length: numberOfExceptionBlocks }).map(() => ({
      businessName: 0,
      fileType: '',
      fieldCode: '',
      expiration_date: '',
      requested_threshold: 0,
      required_threshold: 0,
    })),
    justification: '',
    requestorName: '',
    requestorEmail: '',
    acceptTerms: false,
    expirationDateOther: '',
    otherExceptionBusinessName: '',
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastSubmitCount] = useState(0);

  const {
    data: submitterData,
    isLoading: entitiesLoading,
    isError: entitiesError,
  } = useEntities();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setErrorMessage('');
    const url = `submissions/exception/api/`;
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

  if (entitiesLoading) {
    return (
      <div className={styles.loadingField}>
        <LoadingSpinner />
      </div>
    );
  }

  const getExceptionTitle = () => {
    switch (selectedExceptionType) {
      case 'threshold':
        return 'Threshold ';
      case 'other':
        return 'Other ';
      default:
        return '';
    }
  };

  return (
    <div className={styles.root}>
      <h1>{getExceptionTitle()} Exception Request</h1>
      <hr />
      <p>
        This form should be completed and submitted only by entities who are
        eligible for an exception to certain data submission requirements under
        H.B. 2090 (87(R)) and associated regulations. Please review the
        legislation and regulation before submitting this form. Links to both
        can be found on the {''}
        <a
          href="https://sph.uth.edu/research/centers/center-for-health-care-data/texas-all-payor-claims-database/index.htm"
          target="_blank"
          rel="noreferrer"
        >
          Texas All-Payor Claims Database website.
        </a>
      </p>
      <hr />
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          setFieldValue,
          resetForm,
          isValid,
          submitCount,
          handleSubmit,
          dirty,
        }) => {
          // To reset values to initial values if the form submits successfully
          useEffect(() => {
            if (isSuccess) {
              resetForm({ values: { ...initialValues } });
            }
          }, [isSuccess, resetForm]);
          // To display message next to submit if fields are invalid on submit
          useEffect(() => {
            if (submitCount > lastSubmitCount && !isValid) {
              setErrorMessage('All required fields must be valid');
            }
          }, [submitCount, isValid, lastSubmitCount, handleSubmit]);
          return (
            <Form id="threshold-form">
              <h4>Select Exception Type</h4>
              <p>
                Please select below if you are requesting an exception for
                threshold submission requirements or for an general, other type
                of exception.
              </p>{' '}
              <div className={styles.fieldRows}>
                <FieldWrapper name="exceptionType" label="">
                  <Field
                    as="select"
                    name="exceptionType"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selection = e.target.value;
                      setSelectedExceptionType(selection);
                      setFieldValue('exceptionType', selection);
                      setIsSuccess(false);
                    }}
                  >
                    <option value="">-- Select Exception Type --</option>
                    <option value="threshold">Threshold Exception</option>
                    <option value="other">Other Exception</option>
                  </Field>
                </FieldWrapper>
                {selectedExceptionType !== '' && (
                  <div style={{ paddingTop: '10px' }}>
                    <b>Note:</b> Your changes will not be saved if you change
                    the exception type.
                  </div>
                )}
              </div>
              {selectedExceptionType == 'threshold' && (
                <div>
                  {values.exceptions.map((exception, index) => (
                    <ExceptionForm key={index} index={index} />
                  ))}
                  <div className={styles.fieldRows}>
                    <Button
                      type="primary"
                      onClick={() =>
                        setFieldValue('exceptions', [
                          ...values.exceptions,
                          {
                            businessName: '',
                            fileType: '',
                            fieldCode: '',
                            expiration_date: '',
                            requested_threshold: 0,
                            required_threshold: 0,
                          },
                        ])
                      }
                      disabled={values.exceptions.length >= 5}
                    >
                      + Add Another Threshold Exception
                    </Button>
                    <Button
                      type="secondary"
                      onClick={() =>
                        values.exceptions.length > 1 &&
                        setFieldValue(
                          'exceptions',
                          values.exceptions.slice(0, -1)
                        )
                      }
                      disabled={values.exceptions.length === 1}
                    >
                      - Remove Last Threshold Exception
                    </Button>
                  </div>
                </div>
              )}
              {selectedExceptionType === 'other' && (
                <>
                  <hr />
                  <h4>Exception Details</h4>
                  <div className={styles.fieldRows}>
                    {submitterData && (
                      <>
                        <FieldWrapper
                          name="otherExceptionBusinessName"
                          label="Business Name"
                          required={true}
                        >
                          <Field
                            as="select"
                            name={`otherExceptionBusinessName`}
                            id={`otherExceptionBusinessName`}
                          >
                            <option value="">-- Select a Business --</option>
                            {submitterData?.submitters?.map(
                              (submitter: Entities) => (
                                <option
                                  value={submitter.submitter_id}
                                  key={submitter.submitter_id}
                                >
                                  {submitter.entity_name} - Payor Code:{' '}
                                  {submitter.payor_code}
                                </option>
                              )
                            )}
                          </Field>
                        </FieldWrapper>
                      </>
                    )}
                  </div>
                  {entitiesError && (
                    <SectionMessage type="error">
                      There was an error finding your associated businesses.{' '}
                      <Link
                        to="/workbench/dashboard/tickets/create"
                        className="wb-link"
                      >
                        Please submit a ticket.
                      </Link>
                    </SectionMessage>
                  )}
                  <div className={styles.fieldRows}>
                    <FieldWrapper
                      name="expirationDateOther"
                      label="Requested Expiration Date"
                      required={true}
                    >
                      <Field
                        type="date"
                        name="expirationDateOther"
                        id="expirationDateOther"
                        className={styles.expirationDate}
                      ></Field>
                    </FieldWrapper>
                  </div>
                </>
              )}
              {selectedExceptionType && (
                <>
                  <hr />
                  <h4>Request and Justification</h4>
                  <FieldWrapper
                    name="justification"
                    label="Provide rationale for the exception request, outlining the
                      reasons why the organization is unable to comply with the
                      relevant requirements. Provide as much detail as possible
                      regarding the exception request, indicating the specific
                      submission requirements for which relief is being sought.
                      If applicable, indicate how the organization plans to
                      become compliant.**"
                    required={true}
                    description="2000 character limit"
                  >
                    <Field
                      as="textarea"
                      name="justification"
                      id="justification"
                      rows={5}
                    />
                  </FieldWrapper>
                  <hr />
                  <h4>Acknowledgment of Terms</h4>
                  <Label className="form-wrapper">
                    I understand and acknowledge that the Texas Department of
                    Insurance (TDI) may review the validity of the information
                    submitted on this form.
                  </Label>
                  <div className={styles.fieldRows}>
                    <FieldWrapper
                      name="requestorName"
                      label="Requestor Name"
                      required={true}
                    >
                      <Field
                        type="text"
                        name="requestorName"
                        id="requestorName"
                      ></Field>
                    </FieldWrapper>
                    <FieldWrapper
                      name="requestorEmail"
                      label="Requestor E-mail"
                      required={true}
                    >
                      <Field
                        type="email"
                        name="requestorEmail"
                        id="requestorEmail"
                      />
                    </FieldWrapper>
                    <FieldWrapper
                      name="acceptTerms"
                      label="Accept"
                      required={true}
                      description=""
                    >
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        className={`form-control`}
                      />
                    </FieldWrapper>
                  </div>
                  {isSuccess ? (
                    <>
                      <Button
                        type="primary"
                        attr="submit"
                        disabled={isSubmitting || !dirty}
                        isLoading={isSubmitting}
                        onClick={() => setIsSuccess(false)}
                      >
                        Submit Another Exception
                      </Button>
                      <div className={styles.fieldRows}>
                        <SectionMessage
                          type="success"
                          canDismiss={true}
                          onDismiss={() => setIsSuccess(false)}
                        >
                          Your exception request was successfully sent.
                        </SectionMessage>
                      </div>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      attr="submit"
                      disabled={isSubmitting || !dirty}
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
                  <div>
                    <hr />
                    <small>
                      * Exceptions cannot be granted for periods longer than a
                      year.
                      <br />
                      ** Exceptions cannot be granted from any requirement in
                      insurance code Chapter 38.
                      <br />
                    </small>
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
