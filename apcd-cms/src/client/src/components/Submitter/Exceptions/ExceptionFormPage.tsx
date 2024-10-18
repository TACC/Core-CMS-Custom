import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  FormFeedback,
} from 'reactstrap';
import styles from './ExceptionForm.module.css';
import { ExceptionForm } from './';
import SectionMessage from 'core-components/SectionMessage';
import { fetchUtil } from 'utils/fetchUtil';

const validationSchema = Yup.object().shape({
  exceptions: Yup.array().of(
    Yup.object().shape({
      businessName: Yup.string().required('Required'),
      fileType: Yup.string().required('Required'),
      fieldCode: Yup.string().required('Required'),
      expiration_date: Yup.date().required('Required'),
      requested_threshold: Yup.number().required('Required'),
      required_threshold: Yup.number().required('Required'),
    })
  ),
  justification: Yup.string()
    .max(2000, 'Must be 2000 characters or less')
    .required('Required'),
  requestorName: Yup.string().required('Required'),
  requestorEmail: Yup.string().email().required('Required'),
  acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  //expirationDateOther: Yup.date().required('Required'),
});

interface FormValues {
  exceptions: {
    businessName: string;
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
  const [selectedExceptionType, setSelectedExceptionType] =
    useState<string>('');
  const [numberOfExceptionBlocks, setNumberOfExceptionBlocks] =
    useState<number>(1);
  const [removeButtonStatus, setRemoveButtonStatus] = useState<boolean>(false);
  const [addButtonStatus, setAddButtonStatus] = useState<boolean>(true);

  const handleAddException = () => {
    if (numberOfExceptionBlocks < 5) {
      setNumberOfExceptionBlocks((prev) => prev + 1);
    }
  };

  const handleRemoveException = () => {
    if (numberOfExceptionBlocks > 1) {
      setNumberOfExceptionBlocks((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setAddButtonStatus(numberOfExceptionBlocks < 5);
    setRemoveButtonStatus(numberOfExceptionBlocks > 1);
  }, [numberOfExceptionBlocks]);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const url = `exception/`;
    try {
      const response = await fetchUtil({
        url,
        method: `POST`,
        body: values,
      });
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
    console.log('does handle submit get called at all');
  };

  const initialValues: FormValues = {
    exceptions: Array.from({ length: numberOfExceptionBlocks }).map(() => ({
      businessName: '',
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => {
          console.log('Formik Values:', values);
          return (
            <Form className="form-wrapper" id="threshold-form">
              <div className={styles.fieldRows}>
                <FormGroup className="field-wrapper required">
                  <Input
                    type="select"
                    name="exceptionType"
                    id="exceptionType"
                    value={selectedExceptionType}
                    onChange={(e) => {
                      setSelectedExceptionType(e.target.value);
                      setFieldValue(`exceptionType`, e.target.value);
                    }}
                  >
                    <option value="">-- Select Exception Type --</option>
                    <option value="threshold">Threshold Exception</option>
                    <option value="other">Other Exception</option>
                  </Input>
                </FormGroup>
                {selectedExceptionType != '' && (
                  <SectionMessage type="info">
                    Your changes will not be saved if you change the exception
                    type.
                  </SectionMessage>
                )}
              </div>
              {selectedExceptionType === 'threshold' && (
                <div className={styles.exceptionBlock}>
                  {Array.from({ length: numberOfExceptionBlocks }).map(
                    (_, index) => (
                      <ExceptionForm
                        key={index}
                        exception={index + 1}
                        formikProps={{
                          errors: errors.exceptions?.[index] || {},
                          touched: touched.exceptions?.[index] || {},
                          setFieldValue: (field, value) =>
                            setFieldValue(
                              `exceptions[${index}].${field}`,
                              value
                            ),
                          values: values.exceptions[index] || {},
                        }}
                      />
                    )
                  )}
                  <div className={styles.fieldRows}>
                    <Button
                      className="c-button c-button--primary"
                      type="button"
                      onClick={handleAddException}
                      disabled={!addButtonStatus}
                      color="primary"
                    >
                      + Add Another Threshold Exception
                    </Button>
                    <Button
                      className="c-button c-button--secondary"
                      type="button"
                      onClick={handleRemoveException}
                      disabled={!removeButtonStatus}
                      color="secondary"
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
                    <InputGroup>
                      <Field
                        type="date"
                        name="expirationDateOther"
                        id="expirationDateOther"
                      >
                        {({ field }: { field: any }) => (
                          <Input
                            id="expirationDateOther"
                            {...field}
                            invalid={
                              touched.expirationDateOther &&
                              !!errors.expirationDateOther
                            }
                            type="date"
                            className={styles.expirationDate}
                            onChange={(e) => {
                              setFieldValue(
                                `expirationDateOther`,
                                e.target.value
                              );
                            }}
                          >
                            {}
                          </Input>
                        )}
                      </Field>
                      <ErrorMessage
                        name="expirationDateOther"
                        component={FormFeedback}
                      />
                    </InputGroup>
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

                    <InputGroup>
                      <Field
                        type="text"
                        name="justification"
                        id="justification"
                      >
                        {({ field }: { field: any }) => (
                          <Input
                            type="textarea"
                            id="justification"
                            className={styles.justification}
                            {...field}
                            invalid={
                              touched.justification && !!errors.justification
                            }
                            rows={5}
                            onChange={(e) => {
                              setFieldValue(`justification`, e.target.value);
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="justification"
                        component={FormFeedback}
                      />
                    </InputGroup>
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
                      <InputGroup>
                        <Field
                          type="text"
                          name="requestorName"
                          id="requestorName"
                        >
                          {({ field }: { field: any }) => (
                            <Input
                              id="requestorName"
                              {...field}
                              invalid={
                                touched.requestorName && !!errors.requestorName
                              }
                              onChange={(e) => {
                                setFieldValue(`requestorName`, e.target.value);
                              }}
                            >
                              {}
                            </Input>
                          )}
                        </Field>
                        <ErrorMessage
                          name="requestorName"
                          component={FormFeedback}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="field-wrapper required">
                      <Label for="requestorEmail">Requestor E-mail</Label>
                      <InputGroup>
                        <Field
                          type="text"
                          name="requestorEmail"
                          id="requestorEmail"
                        >
                          {({ field }: { field: any }) => (
                            <Input
                              id="requestorEmail"
                              {...field}
                              invalid={
                                touched.requestorEmail &&
                                !!errors.requestorEmail
                              }
                              onChange={(e) => {
                                setFieldValue(`requestorEmail`, e.target.value);
                              }}
                            >
                              {}
                            </Input>
                          )}
                        </Field>
                        <ErrorMessage
                          name="requestorEmail"
                          component={FormFeedback}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="field-wrapper required" check>
                      <Label for="acceptTerms" check>
                        {' '}
                        Accept
                      </Label>
                      <InputGroup className={styles.termsCheckbox}>
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                        >
                          {({ field }: { field: any }) => (
                            <Input
                              id="acceptTerms"
                              {...field}
                              invalid={
                                touched.acceptTerms && !!errors.acceptTerms
                              }
                              type="checkbox"
                              checked={field.value}
                              onChange={() =>
                                setFieldValue('acceptTerms', !field.value)
                              }
                            >
                              {}
                            </Input>
                          )}
                        </Field>

                        <ErrorMessage
                          name="acceptTerms"
                          component={FormFeedback}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="form-button"
                      value="Submit"
                    >
                      Submit
                    </Button>
                  </div>
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
