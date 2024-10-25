import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label } from 'reactstrap';
import styles from './ExceptionForm.module.css';
import { ExceptionForm } from './';
import SectionMessage from 'core-components/SectionMessage';
import { fetchUtil } from 'utils/fetchUtil';
import Button from 'core-components/Button';

const validationSchema = Yup.object().shape({
  exceptionType: Yup.string().required('Required'),
  exceptions: Yup.array().of(
    Yup.object().shape({
      businessName: Yup.number().min(1, 'Required').required('Required'),
      fileType: Yup.string().required('Required'),
      fieldCode: Yup.string().required('Required'),
      expiration_date: Yup.date().required('Required'),
      requested_threshold: Yup.number().min(1, 'Requied').required('Required'),
      required_threshold: Yup.number().required('Required'),
    })
  ),
  justification: Yup.string()
    .max(2000, 'Must be 2000 characters or less')
    .required('Required'),
  requestorName: Yup.string().required('Required'),
  requestorEmail: Yup.string().email().required('Required'),
  acceptTerms: Yup.boolean().oneOf([true], 'Required'),
  //expirationDateOther: Yup.date().required('Required'),
});

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
  //expirationDateOther: Date | null;
}

export const ExceptionFormPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedExceptionType, setSelectedExceptionType] =
    useState<string>('');
  const [numberOfExceptionBlocks, setNumberOfExceptionBlocks] =
    useState<number>(1);

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

  const initialValues: FormValues = {
    exceptionType: '',
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
    //expirationDateOther: null,
  };

  return (
    <div className={styles.root}>
      <h1>Exception Request</h1>
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
      <h4>Select Exception Type</h4>
      <p>
        Please select below if you are requesting an exception for threshold
        submission requirements or for an general, other type of exception.
      </p>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue, resetForm }) => {
          useEffect(() => {
            if (isSuccess) {
              resetForm();
            }
          }, [isSuccess, resetForm]);
          return (
            <Form id="threshold-form">
              <div className={styles.fieldRows}>
                <FormGroup className="field-wrapper required">
                <h4>Select Exception Type</h4>
      <p>
        Please select below if you are requesting an exception for threshold
        submission requirements or for an general, other type of exception.
      </p>
                  <Field
                    as="select"
                    name="exceptionType"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selection = e.target.value;
                      setSelectedExceptionType(selection);
                      resetForm();
                      setFieldValue('exceptionType', selection);
                    }}
                  >
                    <option value="">-- Select Exception Type --</option>
                    <option value="threshold">Threshold Exception</option>
                    <option value="other">Other Exception</option>
                  </Field>
                  <ErrorMessage
                    name="exceptionType"
                    component="div"
                    className={styles.isInvalid}
                  />
                </FormGroup>
                {selectedExceptionType !== '' && (
                  <SectionMessage type="info">
                    Your changes will not be saved if you change the exception
                    type.
                  </SectionMessage>
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
              {/*{selectedExceptionType === 'other' && (
                <>
                  <h4>Exception Time Period</h4>
                  <p>Provide the requested expiration date for your request.</p>
                  <div className={styles.fieldRows}>
                    <FormGroup className="field-wrapper required">
                      <Field
                        type="date"
                        name="expirationDateOther"
                        id="expirationDateOther"
                        className={styles.expirationDate}
                      ></Field>
                      <ErrorMessage
                      name="expirationDateOther"
                     component="div" className={styles.isInvalid}
                    />
                    </FormGroup>
                  </div>
                </>
              )}*/}
              {selectedExceptionType && (
                <>
                  <hr />
                  <h4>Request and Justification</h4>
                  <FormGroup className="field-wrapper required">
                    <p>
                      Provide rationale for the exception request, outlining the
                      reasons why the organization is unable to comply with the
                      relevant requirements. Provide as much detail as possible
                      regarding the exception request, indicating the specific
                      submission requirements for which relief is being sought.
                      If applicable, indicate how the organization plans to
                      become compliant.**
                    </p>

                    <Field
                      as="textarea"
                      name="justification"
                      id="justification"
                      rows={5}
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
                      <Label for="requestorName">Requestor Name</Label>
                      <Field
                        type="text"
                        name="requestorName"
                        id="requestorName"
                      ></Field>
                      <ErrorMessage
                        name="requestorName"
                        component="div"
                        className={styles.isInvalid}
                      />
                    </FormGroup>
                    <FormGroup className="field-wrapper required">
                      <Label for="requestorEmail">Requestor E-mail</Label>
                      <Field
                        type="email"
                        name="requestorEmail"
                        id="requestorEmail"
                      />
                      <ErrorMessage
                        name="requestorEmail"
                        component="div"
                        className={styles.isInvalid}
                      />
                    </FormGroup>
                    <FormGroup className="field-wrapper required" check>
                      <Label for="acceptTerms" check>
                        {' '}
                        Accept
                      </Label>
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        className={styles.termsCheckbox}
                      ></Field>
                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className={styles.isInvalid}
                      />
                    </FormGroup>
                  </div>
                  <Button
                    type="primary"
                    attr="submit"
                    isLoading={isSubmitting}
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit
                  </Button>
                  {isSuccess && (
                    <div className={styles.fieldRows}>
                      <SectionMessage type="success" canDismiss={true}>
                        Your exception request was successfully sent.
                      </SectionMessage>
                    </div>
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
                      ** Exceptions cannot be granted "from any requirement in
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
