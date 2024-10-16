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
  [key: string]: string | number | '';
}

interface ExceptionFormProps {
  exception: number;
}

export const ExceptionForm: React.FC<ExceptionFormProps> = ({ exception }) => {
  const initialValues: FormValues = {
    [`businessName_${exception}`]: '',
    [`fileType_${exception}`]: '',
    [`fieldCode_${exception}`]: '',
    [`expiration_date_${exception}`]: '',
    [`requested_threshold_${exception}`]: '',
    [`required_threshold_${exception}`]: '',
  };

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
      <div className="loadingField">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <h4>Requested Threshold Reduction {exception}</h4>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="form-wrapper" id={`threshold-form_${exception}`}>
            <FormGroup className="field-wrapper required">
              <Label for={`business-name_${exception}`}>Business Name</Label>
              {submitterData && (
                <InputGroup>
                  <Field
                    type="select"
                    name={`businessName_${exception}`}
                    id={`business-name_${exception}`}
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id={`business-name_${exception}`}
                        {...field}
                        invalid={
                          touched[`businessName_${exception}`] &&
                          !!errors[`businessName_${exception}`]
                        }
                        type="select"
                      >
                        {submitterData?.submitters?.map(
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
                  <ErrorMessage
                    name={`businessName_${exception}`}
                    component={FormFeedback}
                  />
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
              <Label for={`fileType_${exception}`}>File Type</Label>
              <InputGroup>
                <Field
                  type="select"
                  name={`fileType_${exception}`}
                  id={`fileType_${exception}`}
                >
                  {({ field }: { field: any }) => (
                    <Input
                      id={`fileType_${exception}`}
                      {...field}
                      type="select"
                      invalid={
                        touched[`fileType_${exception}`] &&
                        !!errors[`fileType_${exception}`]
                      }
                      onChange={(e) => {
                        handleFileChange(e.target.value);
                        setFieldValue(`fileType_${exception}`, e.target.value);
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
                <ErrorMessage
                  name={`fileType_${exception}`}
                  component={FormFeedback}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="field-wrapper required">
              <Label for={`fieldCode_${exception}`}>Field Code</Label>
              {cdlLoading ? (
                <LoadingSpinner className={styles.loadingField} />
              ) : (
                <InputGroup>
                  <Field
                    type="select"
                    name={`fieldCode_${exception}`}
                    id={`fieldCode_${exception}`}
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id={`fieldCode_${exception}`}
                        className="dropdown-text"
                        type="select"
                        {...field}
                        invalid={
                          touched[`fieldCode_${exception}`] &&
                          !!errors[`fieldCode_${exception}`]
                        }
                        onChange={(e) => {
                          handleCDLChange(e.target.value);
                          setFieldValue(
                            `fieldCode_${exception}`,
                            e.target.value
                          );
                        }}
                      >
                        {cdlData ? (
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
                        ) : (
                          <option value="">
                            -- Select a File Type Above First --
                          </option>
                        )}
                      </Input>
                    )}
                  </Field>
                  <ErrorMessage
                    name={`fieldCode_${exception}`}
                    component={FormFeedback}
                  />
                </InputGroup>
              )}
            </FormGroup>
            <div className={styles.fieldRows}>
              <FormGroup className="field-wrapper required">
                <Label for={`expiration_date_${exception}`}>
                  Expiration Date
                </Label>
                <InputGroup>
                  <Field
                    type="date"
                    name={`expiration_date_${exception}`}
                    id={`expiration_date_${exception}`}
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id={`expiration_date_${exception}`}
                        {...field}
                        invalid={
                          touched[`expiration_date_${exception}`] &&
                          !!errors[`expiration_date_${exception}`]
                        }
                        type="date"
                        className={styles.expirationDate}
                      >
                        {}
                      </Input>
                    )}
                  </Field>
                  <ErrorMessage
                    name={`expiration_date_${exception}`}
                    component={FormFeedback}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="field-wrapper required">
                <Label for={`requested_threshold_${exception}`}>
                  Requested Threshold Percentage
                </Label>
                <InputGroup className={styles.thresholdRequested}>
                  <Field
                    type="number"
                    name={`requested_threshold_${exception}`}
                    id={`requested_threshold_${exception}`}
                    min="0"
                    max={selectedCDL?.threshold_value}
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id={`requested_threshold_${exception}`}
                        {...field}
                        invalid={
                          touched[`requested_threshold_${exception}`] &&
                          !!errors[`requested_threshold_${exception}`]
                        }
                      >
                        {}
                      </Input>
                    )}
                  </Field>
                  <ErrorMessage
                    name={`requested_threshold_${exception}`}
                    component={FormFeedback}
                  />
                </InputGroup>
                {selectedCDL && (
                  <div className="help-text">
                    Must be less than the {selectedCDL.threshold_value}{' '}
                    required.
                  </div>
                )}
              </FormGroup>
              <FormGroup className="field-wrapper required">
                <Label for={`required_threshold_${exception}`}>
                  Required Threshold Percentage
                </Label>
                <InputGroup>
                  <Field
                    type="number"
                    name={`required_threshold_${exception}`}
                    id={`required_threshold_${exception}`}
                    min="0"
                    max="99"
                  >
                    {({ field }: { field: any }) => (
                      <Input
                        id={`required_threshold_${exception}`}
                        className={styles.requiredThreshold}
                        readOnly
                        {...field}
                        invalid={
                          touched[`required_threshold_${exception}`] &&
                          !!errors[`required_threshold_${exception}`]
                        }
                        value={
                          selectedCDL?.threshold_value
                            ? selectedCDL.threshold_value
                            : ''
                        }
                      ></Input>
                    )}
                  </Field>
                  <ErrorMessage
                    name={`required_threshold_${exception}`}
                    component={FormFeedback}
                  />
                </InputGroup>
              </FormGroup>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
