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

const validationSchema = Yup.object({
  justification: Yup.string()
    .max(2000, 'Must be 2000 characters or less')
    .required('Required'),
  requestorName: Yup.string().required('Required'),
  requestorEmail: Yup.string().email().required('Required'),
  acceptTerms: Yup.boolean().isTrue().required('Required'),
  expirationDate: Yup.date().required('Required'),
});

interface FormValues {
  justification: string;
  requestorName: string;
  requestorEmail: string;
  acceptTerms: boolean;
  expirationDate: Date | null;
}

const initialValues: FormValues = {
  justification: '',
  requestorName: '',
  requestorEmail: '',
  acceptTerms: false,
  expirationDate: null,
};

export const ExceptionFormPage: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
  };

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


  return (
    <div className={styles.root}>
      <h1>Exception Request</h1>
      <hr />
      <p>
        This form should be completed and submitted only by entities who are
        eligible for an exception to certain data submission requirements under
        H.B. 2090 (87(R)) and associated regulations. Please review the
        legislation and regulation before submitting this form. Links to both
        can be found on the
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
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="form-wrapper" id="threshold-form">
            <div className={styles.fieldRows}>
            <FormGroup className="field-wrapper required">
              <Input
                type="select"
                name="exceptionType"
                id="exceptionType"
                value={selectedExceptionType}
                onChange={(e) => {setSelectedExceptionType(e.target.value);}
                }
              >
                <option value="">-- Select Exception Type --</option>
                <option value="threshold">Threshold Exception</option>
                <option value="other">Other Exception</option>
              </Input>
            </FormGroup>
            {selectedExceptionType != '' && (
            <SectionMessage type="info">Your changes will not be saved if you
            change the exception type.</SectionMessage>

            )}
            </div>
            {selectedExceptionType === 'threshold' && (
              <div className={styles.exceptionBlock}>
                {[...Array(numberOfExceptionBlocks)].map((_, index) => (
                  <>
                    <hr />
                    <ExceptionForm key={index} exception={index + 1} />
                  </>
                ))}
                <div>
                  <Button
                    className="c-button c-button--primary"
                    id="exception-add-btn"
                    type="button"
                    onClick={handleAddException}
                    disabled={!addButtonStatus}
                  >
                    + Add Another Threshold Exception
                  </Button>
                  <Button
                    className="c-button c-button--secondary"
                    id="exception-drop-btn"
                    type="button"
                    onClick={handleRemoveException}
                    disabled={!removeButtonStatus}
                  >
                    - Remove Last Threshold Exception
                  </Button>
                </div>
              </div>
            )}
            {selectedExceptionType === 'other' && (
              <>
                <h4>Exception Time Period</h4>
                <p>Provide the requested expiration date for your request.</p>
                <div className={styles.fieldRows}>
                  <FormGroup className="field-wrapper required">
                    <InputGroup>
                      <Field
                        type="date"
                        name="expirationDate"
                        id="expirationDate"
                      >
                        {({ field }: { field: any }) => (
                          <Input
                            id="expirationDate"
                            {...field}
                            invalid={
                              touched.expirationDate && !!errors.expirationDate
                            }
                            type="date"
                            className={styles.expirationDate}
                          >
                            {}
                          </Input>
                        )}
                      </Field>
                      <ErrorMessage
                        name="expirationDate"
                        component={FormFeedback}
                      />
                    </InputGroup>
                  </FormGroup>
                </div>
              </>
            )}
            {selectedExceptionType && (
              <>
                <hr />
                <h4>Request and Justification</h4>
                <FormGroup className="field-wrapper text-input required">
                  <p>
                    Provide rationale for the exception request, outlining the
                    reasons why the organization is unable to comply with the
                    relevant requirements. Provide as much detail as possible
                    regarding the exception request, indicating the specific
                    submission requirements for which relief is being sought. If
                    applicable, indicate how the organization plans to become
                    compliant.**
                  </p>
                  <InputGroup>
                    <Field
                      type="text"
                      name="justification"
                      id="justification"
                      max="2000ch"
                    >
                      {({ field }: { field: any }) => (
                        <textarea
                          id="justification"
                          {...field}
                          invalid={
                            touched.justification && !!errors.justification
                          }
                          cols={40}
                          rows={5}
                        ></textarea>
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
                              touched.justification && !!errors.justification
                            }
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
                              touched.requestorEmail && !!errors.requestorEmail
                            }
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
                  <FormGroup className="field-wrapper checkbox required">
                    <Label for="acceptTerms">Accept</Label>
                    <InputGroup>
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
                            className={styles.acceptTerms}
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
                  <Button type="submit" className="form-button" value="Submit">
                    Submit
                  </Button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
