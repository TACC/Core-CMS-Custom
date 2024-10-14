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
import { cdlObject, useCDLs, cdl } from 'hooks/cdls';
import { Entities, useEntities } from 'hooks/entities';
import styles from './ExceptionForm.module.css';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';

//Boiler plate example for validation schema

const validationSchema = Yup.object({
  name: Yup.string()
    .max(64, 'Must be 64 characters or less')
    .required('Required'),
  id: Yup.string().required('Required'),
  year: Yup.number().required('Required'),
});

interface FormValues {
  businessName_1: string;
  file_type_1: string;
  fieldThresholdException_1: string;
  expiration_date_1: string;
  requested_threshold_1: number | '';
  required_threshold_1: number | '';
}

const initialValues: FormValues = {
  businessName_1: '',
  file_type_1: '',
  fieldThresholdException_1: '',
  expiration_date_1: '',
  requested_threshold_1: '',
  required_threshold_1: '',
};

export const ExceptionForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
  };

  const [selectedFileType, setSelectedFileType] = useState<string>();
  const [cdlData, setCdlData] = useState<cdlObject>();
  const [selectedCDL, setSelectedCDL] = useState<cdl>();

  const {
    data: submitterData,
    isLoading: entitiesLoading,
    isError: entitiesError,
  } = useEntities();

  const {
    data: fetchedCDLData,
    isLoading: cdlLoading,
    isError: cdlError,
  } = useCDLs(selectedFileType);

  useEffect(() => {
    if (fetchedCDLData && fetchedCDLData.cdls) {
      setCdlData(fetchedCDLData);
    } else {
      setCdlData(undefined);
    }
  }, [fetchedCDLData]);

  const handleFileChange = (file_type: string) => {
    setSelectedFileType(file_type);
  };
  const handleCDLChange = (cdlCode: string) => {
    setSelectedCDL(
      cdlData?.cdls.find((cdl) => cdl.field_list_code === cdlCode)
    );
  };

  if (entitiesLoading) 
    return (
  <LoadingSpinner></LoadingSpinner>
    )

  return (
    <>
      <h1>Exception Request</h1>
      <hr />
      <p>
        This form should be completed and submitted only by entities who are
        eligible for an exception to certain data submission requirements under H.B. 2090 (87(R))
        and associated regulations. Please review the legislation and regulation before
        submitting this form. Links to both can be found on the
        <a href="https://sph.uth.edu/research/centers/center-for-health-care-data/texas-all-payor-claims-database/index.htm" target="_blank" rel="noreferrer">Texas All-Payor Claims Database
          website.</a>
      </p>
      <div className={styles.exceptionBlock}>
        <h4>Requested Threshold Reduction</h4>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="form-wrapper" id="threshold-form">
            <FormGroup className="field-wrapper required">
              <Label for="business-name_1">Business Name</Label>
              {submitterData && (
                <InputGroup>
                  <Field
                    type="select"
                    name="business-name_1"
                    id="business-name_1"
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id="business-name_1"
                        {...field}
                        invalid={touched.name && !!errors.name}
                        type="select"
                      >
                        {submitterData?.submitters &&
                          submitterData.submitters.map(
                            (submitter: Entities) => (
                              <option key={submitter.entity_name}>
                                {submitter.entity_name} - Payor Code:{' '}
                                {submitter.payor_code}
                              </option>
                            )
                          )}
                      </Input>
                    )}
                  </Field>
                  <ErrorMessage name="business-name_1" component={FormFeedback} />
                </InputGroup>
              )}
              {entitiesError && (
                <SectionMessage type="error">
                  There was an error finding your associated businesses.{' '}
                  <a href="https://txapcd.org/workbench/dashboard/tickets/create">
                    Please submit a ticket.
                  </a>
                </SectionMessage>
              )}
            </FormGroup>
            <FormGroup className="field-wrapper required">
              <Label for="file_type_1">File Type</Label>
              <InputGroup>
                <Field type="select" name="file_type_1" id="file_type_1">
                  {({ field }: { field: any }) => (
                    <Input
                      id="file_type_1"
                      className="dropdown-text"
                      type="select"
                      {...field}
                      invalid={touched.name && !!errors.name}
                      onChange={(e) => {
                        handleFileChange(e.target.value);
                      }}
                    >
                      <option value="">-- Choose File Type --</option>
                      <option value="dc">Dental Claims</option>

                      <option value="mc">Medical Claims</option>

                      <option value="me">Member Eligibility</option>

                      <option value="pc">Pharmacy Claims</option>

                      <option value="pv">Provider</option>
                    </Input>
                  )}
                </Field>
                <ErrorMessage name="file_type_1" component={FormFeedback} />
              </InputGroup>
            </FormGroup>
            <FormGroup className="field-wrapper required">
              <Label for="field-threshold-exception_1">Field Code</Label>
              {cdlLoading ? (
                <LoadingSpinner className={styles.loadingField} />
              ) : (
                <InputGroup>
                  <Field
                    type="select"
                    name="field-threshold-exception_1"
                    id="field-threshold-exception_1"
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id="field-threshold-exception_1"
                        className="dropdown-text"
                        type="select"
                        {...field}
                        invalid={touched.name && !!errors.name}
                        onChange={(e) => {
                          handleCDLChange(e.target.value);
                        }}
                      >
                        {cdlData && (
                          <>
                            <option value="">-- Select a Field Code --</option>
                            {cdlData.cdls.map((cdl: any) => (
                              <option
                                key={cdl.field_list_code}
                                id={cdl.field_list_code}
                                value={cdl.field_list_code}
                              >
                                {cdl.field_list_code}
                                {' - '}
                                {cdl.field_list_value}
                              </option>
                            ))}
                          </>
                        )}
                        {cdlData?.cdls.length === 0 && (
                          <option value="">
                            -- Select a File Type Above First --
                          </option>
                        )}
                      </Input>
                    )}
                  </Field>
                  <ErrorMessage name="field-threshold-exception_1" component={FormFeedback} />
                </InputGroup>
              )}
            </FormGroup>
            <div className={styles.dateRow}>
            <FormGroup className="field-wrapper required">
              <Label for="expiration_date_1">Expiration Date</Label>
              <InputGroup>
                <Field
                  type="date"
                  name="expiration_date_1"
                  id="expiration_date_1"
                  
                >
                  {({ field }: { field: any }) => (
                    <Input
                      id="expiration_date_1"
                      {...field}
                      invalid={touched.name && !!errors.name}
                      type="date"
                      className={styles.expirationDate}
                    >
                      {}
                    </Input>
                  )}
                </Field>
                <ErrorMessage name="expiration_date_1" component={FormFeedback} />
              </InputGroup>
            </FormGroup>
            <FormGroup className="field-wrapper required">
              <Label for="requested_threshold_1">
                Requested Threshold Percentage
              </Label>
              <InputGroup className={styles.thresholdRequested}>
                <Field
                  type="number"
                  name="requested_threshold_1"
                  id="requested_threshold_1"
                  min="0"
                  max={selectedCDL?.threshold_value}
                >
                  {({ field }: { field: any }) => (
                    <Input
                      id="requested_threshold_1"
                      {...field}
                      invalid={touched.name && !!errors.name}
                    >
                      {}
                    </Input>
                  )}
                </Field>
                <ErrorMessage name="requested_threshold_1" component={FormFeedback} />
              </InputGroup>
              {selectedCDL && (
                <div className="help-text">
                  Must be less than the {selectedCDL.threshold_value} required.
                </div>
              )}
            </FormGroup>
            <FormGroup className="field-wrapper required">
              <Label for="required_threshold_1">
                Required Threshold Percentage
              </Label>
              <InputGroup>
                <Field
                  type="number"
                  name="required_threshold_1"
                  id="required_threshold_1"
                  min="0"
                  max="99"

                >
                  {({ field }: { field: any }) => (
                    <Input
                      id="required_threshold_1"
                      className={styles.requiredThreshold}
                      readOnly
                      {...field}
                      invalid={touched.name && !!errors.name}
                      value={
                        selectedCDL?.threshold_value
                          ? selectedCDL.threshold_value
                          : ''
                      }
                    ></Input>
                  )}
                </Field>
                <ErrorMessage name="required_threshold_1" component={FormFeedback} />
              </InputGroup>
            </FormGroup>
            </div>
            <div>
            <Button
              className="c-button c-button--primary"
              id="exception-add-btn"
              type="button"
            >
              + Add Another Threshold Exception
            </Button>
            <Button
              className="c-button c-button--secondary"
              id="exception-drop-btn"
              type="button"
            >
              - Remove Last Threshold Exception
            </Button>
            </div>
            <hr />
            <Button type="submit" className="form-button" value="Submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      </div>
    </>
  );
};
