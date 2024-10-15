import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormGroup, Label, Row, FormFeedback } from 'reactstrap';
import styles from './ExtensionsForm.module.css';

const validationSchema = Yup.object().shape({
    businessName: Yup.string().required('Business Name is required'),
    extensionType: Yup.string().required('Extension Type is required'),
    applicableDataPeriod: Yup.string().required('Applicable Data Period is required'),
    requestedTargetDate: Yup.date().required('Requested Target Date is required'),
    requestorName: Yup.string().required('Requestor Name is required'),
    requestorEmail: Yup.string().email('Invalid email').required('Requestor Email is required'),
    justification: Yup.string().max(2000, '2000 character limit').required('Justification is required'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  });
  
  interface FormValues {
    businessName: string;
    extensionType: string;
    applicableDataPeriod: string;
    requestedTargetDate: string;
    currentExpectedDate: string;
    justification: string;
    requestorName: string;
    requestorEmail: string;
    acceptTerms: boolean;
  }
  
  const initialValues: FormValues = {
    businessName: '',
    extensionType: '',
    applicableDataPeriod: '',
    requestedTargetDate: '',
    currentExpectedDate: '',
    justification: '',
    requestorName: '',
    requestorEmail: '',
    acceptTerms: false,
  };

export const ExtensionRequestForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <h1>Request an Extension</h1>
      <hr />
      <p>
        This form should be completed and submitted by data submitters to request an extension to the deadline 
        for submitting either a regular submission or a corrected resubmission. Please review the{" "}
        <a
          href="https://sph.uth.edu/research/centers/center-for-health-care-data/texas-all-payor-claims-database/payor-registration-information"
          target="_blank"
          rel="noreferrer"
        >
          Data Submission Guide
        </a>{" "}
        for details about completing and submitting this form, especially regarding the timeliness of the request.
      </p>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <h4>Extension Information</h4>
          <p>This extension is on behalf of the following organization:</p>
          <FormGroup>
            <Label for="businessName">
                Business Name{' '}
                <span className={styles.requiredText}>(required)</span>
            </Label>
            <Field as="select" name="businessName" className="form-control">
                <option value="">Select Business Name</option>
                <option value="Test Meritan Health">Test Meritan Health - Payor Code: 10000003</option>
                {/* Add more options as necessary */}
            </Field>
            <ErrorMessage name="businessName" component={FormFeedback} />
            </FormGroup>

          <FormGroup>
            <Label for="extensionType">
                Extension Type{' '}
                <span className={styles.requiredText}>(required)</span>
            </Label>
            <Field as="select" name="extensionType" className="form-control">
              <option value="">Select Extension Type</option>
              <option value="regular">Regularly Scheduled Submission</option>
              <option value="resubmission">Corrected Resubmission</option>
              <option value="small_carrier">Small Carrier (Fewer Than 10,000 Lives Covered)</option>
            </Field>
            <ErrorMessage name="extensionType" component={FormFeedback} />
          </FormGroup>

          <h6>Submission Dates</h6>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="applicableDataPeriod">
                  Applicable Data Period <sup>1</sup>
                  <span className={styles.requiredText}>{" "}(required)</span>
                </Label>
                <Field as="select" name="applicableDataPeriod" className="form-control">
                  <option value="">-- Select period --</option>
                  <option value="2024-01">January 2024</option>
                  <option value="2024-02">February 2024</option>
                </Field>
                <ErrorMessage name="applicableDataPeriod" component={FormFeedback} />
              </FormGroup>
            </Col>

            <Col md={4}>
            <FormGroup className={`position-relative ${styles.dateInputContainer}`}>
                <Label for="requestedTargetDate">
                    Requested Target Date <sup>2</sup>
                    <span className={styles.requiredText}>{" "}(required)</span>
                </Label>
                <Field
                    type="date"
                    name="requestedTargetDate"
                    id="requestedTargetDate"
                    className={`form-control ${styles.dateInputField}`} // Apply the .dateInputField style
                />
                <ErrorMessage name="requestedTargetDate" component={FormFeedback} />
                </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup className={`position-relative ${styles.dateInputContainer}`}>
                <Label for="currentExpectedDate">
                  Current Expected Date <sup>3</sup>
                  <span className={styles.requiredText}>{" "}(required)</span>
                </Label>
                <Field
                  type="date"
                  name="currentExpectedDate"
                  className="form-control"
                />
                <ErrorMessage name="currentExpectedDate" component={FormFeedback} />
              </FormGroup>
            </Col>
          </Row>

          <Button
            type="button"
            onClick={() => console.log('Add another extension request')}
            color="primary"
          >
            + Add Another Extension Request
          </Button>
          {" "}
          <Button
            type="button"
            onClick={() => console.log('Remove last extension request')}
            color="secondary"
          >
            - Remove Last Extension Request
          </Button>

          <hr />
          <h4>Request and Justification</h4>
          <p>
            Provide rationale for the extension request, outlining the reasons why the organization is unable to 
            comply with the relevant requirements. Provide as much detail as possible regarding the extension 
            request, indicating the specific submission requirements for which relief is being sought. 
            If applicable, indicate how the organization plans to become compliant.
          </p>
          <FormGroup>
            <Label for="justification"> 
                <span className={styles.requiredText}>{" "}(required)</span>
            </Label>
            <Field
              as="textarea"
              name="justification"
              rows="5"
              className="form-control"
              maxLength="2000"
            />
            <ErrorMessage name="justification" component={FormFeedback} />
            <small className="form-text text-muted">2000 character limit</small>
          </FormGroup>

          <hr />
          <h4>Acknowledgment of Terms</h4>
          <Row>
            <Col md={4}>
            <FormGroup>
                <Label for="requestorName">
                Requestor Name
                <span className={styles.requiredText}> (required)</span>
                </Label>
                <Field
                type="text"
                name="requestorName"
                id="requestorName"
                className={`form-control`}
                />
                <ErrorMessage name="requestorName" component={FormFeedback} />
            </FormGroup>
            </Col>

            <Col md={4}>
            <FormGroup>
                <Label for="requestorEmail">
                Requestor Email
                <span className={styles.requiredText}> (required)</span>
                </Label>
                <Field
                type="email"
                name="requestorEmail"
                id="requestorEmail"
                className={`form-control`}
                />
                <ErrorMessage name="requestorEmail" component={FormFeedback} />
            </FormGroup>
            </Col>
          </Row>
          <br />
          <p>I understand and acknowledge that the Texas Department of Insurance (TDI) may review the validity of the information submitted on this form.</p>
          <FormGroup check>
            <Field name="acceptTerms" type="checkbox" className="form-check-input" />
            <Label check>
            {" "}Accept
            <span className={styles.requiredText}> (required)</span>
            </Label>
            <ErrorMessage name="acceptTerms" component={FormFeedback} />
          </FormGroup>
          <br />
          <Button type="submit" color="primary" disabled={isSubmitting}>
            Submit
          </Button>
          <hr />
          <small><sup>1</sup>Applicable data period - month/year in which claims data was adjudicated.</small><br />
          <small><sup>2</sup>Requested target date - requested day/month/year by which the data should be received (the extension date).</small><br />
          <small><sup>3</sup>Current expected date - day/month/year in which applicable data was expected within the submission window.</small>
        </Form>
        
      )}
    </Formik>
    </>
  );
};
