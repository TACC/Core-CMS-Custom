import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
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
    const url = `submissions/exception/`;
    console.log(values.exceptions)
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
      <div className={styles.fieldRows}>
        <FormGroup className="field-wrapper required">
          <select
            name="exceptionType"
            value={selectedExceptionType}
            onChange={(e) => {
              setSelectedExceptionType(e.target.value);
            }}
          >
            <option value="">-- Select Exception Type --</option>
            <option value="threshold">Threshold Exception</option>
            <option value="other">Other Exception</option>
          </select>
        </FormGroup>
        {selectedExceptionType !== '' && (
          <SectionMessage type="info">
            Your changes will not be saved if you change the exception type.
          </SectionMessage>
        )}
      </div>
      <Formik
        key={numberOfExceptionBlocks}
        initialValues={initialValues}

        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => {
            console.log("Formik values:", values)
          useEffect(() => {
            if (numberOfExceptionBlocks > values.exceptions.length) {
              const additionalBlocks = Array.from(
                { length: numberOfExceptionBlocks - values.exceptions.length },
                () => ({
                  businessName: '',
                  fileType: '',
                  fieldCode: '',
                  expiration_date: '',
                  requested_threshold: 0,
                  required_threshold: 0,
                })
              );
              setFieldValue('exceptions', [
                ...values.exceptions,
                ...additionalBlocks,
              ]);
            } else if (numberOfExceptionBlocks < values.exceptions.length) {
              setFieldValue(
                'exceptions',
                values.exceptions.slice(0, numberOfExceptionBlocks)
              );
            }

          }, [numberOfExceptionBlocks, values.exceptions, setFieldValue]);
          return (
            <Form className="form-wrapper" id="threshold-form">
              {selectedExceptionType == 'threshold' && (
                <div>
                  {values.exceptions
                    .slice(0, numberOfExceptionBlocks)
                    .map((exception, index) => (
                      <ExceptionForm key={index} index={index} />
                    ))}
                  <div className={styles.fieldRows}>
                    <Button
                      className="c-button c-button--primary"
                      type="button"
                      onClick={() => handleAddException()}
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
                      <Field
                        type="date"
                        name="expirationDateOther"
                        id="expirationDateOther"
                        className={styles.expirationDate}
                      ></Field>
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
                    ></Field>
                    <ErrorMessage
                      name="justification"
                      component={FormFeedback}
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
                        component={FormFeedback}
                      />
                    </FormGroup>
                    <FormGroup className="field-wrapper required">
                      <Label for="requestorEmail">Requestor E-mail</Label>

                      <Field
                        type="email"
                        name="requestorEmail"
                        id="requestorEmail"
                      ></Field>
                      <ErrorMessage
                        name="requestorEmail"
                        component={FormFeedback}
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
                        component={FormFeedback}
                      />
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
