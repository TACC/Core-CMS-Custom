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

interface Exception {
  businessName: string;
  fileType: string;
  fieldCode: string;
  expiration_date: string;
  requested_threshold: number;
  required_threshold: number;
}
interface ExceptionFormProps {
  exception: number;
  formikProps: {
    errors: any;
    touched: any;
    setFieldValue: (field: string, value: any) => void;
    values: Exception;
  };
}

export const ExceptionForm: React.FC<ExceptionFormProps> = ({
  exception,
  formikProps,
}) => {
  const { values, errors, touched, setFieldValue } = formikProps;

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
      <hr />
      <h4>Requested Threshold Reduction {exception}</h4>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${exception}].businessName`}>
          Business Name
        </Label>
        {submitterData && (
          <>
            <InputGroup>
              <Field
                type="select"
                name={`exceptions[${exception}].businessName`}
                id={`exceptions[${exception}].businessName`}
              >
                {({ field }: { field: any }) => (
                  <Input
                    id={`exceptions[${exception}].businessName`}
                    {...field}
                    invalid={
                      touched.exceptions?.[exception]?.businessName &&
                      !!errors.exceptions?.[exception]?.businessName
                    }
                    type="select"
                    onChange={(e) => {
                      console.log(`Setting businessName to: ${e.target.value}`);
                      setFieldValue(
                        `exceptions[${exception}].businessName`,
                        e.target.value
                      );
                    }}
                  >
                    {submitterData?.submitters?.map((submitter: Entities) => (
                      <option key={submitter.entity_name}>
                        {submitter.entity_name} - Payor Code:{' '}
                        {submitter.payor_code}
                      </option>
                    ))}
                  </Input>
                )}
              </Field>
              <ErrorMessage
                name={`exceptions[${exception}].businessName`}
                component={FormFeedback}
              />
            </InputGroup>
          </>
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
        <Label for={`exceptions[${exception}].fileType`}>File Type</Label>
        <InputGroup>
          <Field
            type="select"
            name={`exceptions[${exception}].fileType`}
            id={`exceptions[${exception}].fileType`}
          >
            {({ field }: { field: any }) => (
              <Input
                {...field}
                type="select"
                invalid={
                  touched.exceptions?.[exception]?.fileType &&
                  !!errors.exceptions?.[exception]?.fileType
                }
                onChange={(e) => {
                  handleFileChange(e.target.value);
                  setFieldValue(
                    `exceptions[${exception}].fileType`,
                    e.target.value
                  );
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
            name={`exceptions[${exception}].fileType`}
            component={FormFeedback}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="field-wrapper required">
        <Label for={`exceptions[${exception}].fieldCode`}>Field Code</Label>
        <InputGroup>
          <Field
            type="select"
            name={`exceptions[${exception}].fieldCode`}
            id={`exceptions[${exception}].fieldCode`}
          >
            {({ field }: { field: any }) => (
              <Input
                {...field}
                type="select"
                invalid={
                  touched.exceptions?.[exception]?.fieldCode &&
                  !!errors.exceptions?.[exception]?.fieldCode
                }
                onChange={(e) => {
                  handleCDLChange(e.target.value);
                  setFieldValue(
                    `exceptions[${exception}].fieldCode`,
                    e.target.value
                  );
                }}
              >
                {cdlData ? (
                  <>
                    <option value="">-- Select Field Code --</option>
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
                  <option value="">-- Select a File Type Above First --</option>
                )}
              </Input>
            )}
          </Field>
          <ErrorMessage
            name={`exceptions[${exception}].fieldCode`}
            component={FormFeedback}
          />
        </InputGroup>
      </FormGroup>
      <div className={styles.fieldRows}>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${exception}].expiration_date`}>
            Expiration Date
          </Label>
          <InputGroup>
            <Field
              type="date"
              name={`exceptions[${exception}].expiration_date`}
              id={`exceptions[${exception}].expiration_date`}
            >
              {({ field }: { field: any }) => (
                <Input
                  {...field}
                  type="date"
                  invalid={
                    touched.exceptions?.[exception]?.expiration_date &&
                    !!errors.exceptions?.[exception]?.expiration_date
                  }
                  onChange={(e) => {
                    setFieldValue(
                      `exceptions[${exception}].expiration_date`,
                      e.target.value
                    );
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name={`exceptions[${exception}].expiration_date`}
              component={FormFeedback}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${exception}].requested_threshold`}>
            Requested Threshold Percentage
          </Label>
          <InputGroup className={styles.thresholdRequested}>
            <Field
              type="number"
              name={`exceptions[${exception}].requested_threshold`}
              id={`exceptions[${exception}].requested_threshold`}
              min="0"
              max={selectedCDL?.threshold_value}
            >
              {({ field }: { field: any }) => (
                <Input
                  {...field}
                  invalid={
                    touched.exceptions?.[exception]?.requested_threshold &&
                    !!errors.exceptions?.[exception]?.requested_threshold
                  }
                  onChange={(e) => {
                    setFieldValue(
                      `exceptions[${exception}].requested_threshold`,
                      e.target.value
                    );
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name={`exceptions[${exception}].requested_threshold`}
              component={FormFeedback}
            />
          </InputGroup>
          {selectedCDL && (
            <div className="help-text">
              Must be less than the {selectedCDL.threshold_value} required.
            </div>
          )}
        </FormGroup>
        <FormGroup className="field-wrapper required">
          <Label for={`exceptions[${exception}].required_threshold`}>
            Required Threshold Percentage
          </Label>

          <InputGroup>
            <Field
              type="number"
              name={`exceptions[${exception}].required_threshold`}
              id={`exceptions[${exception}].required_threshold`}
              min="0"
              max="99"
            >
              {({ field }: { field: any }) => (
                <Input
                  id={`exceptions[${exception}].required_threshold`}
                  className={styles.requiredThreshold}
                  readOnly
                  {...field}
                  value={
                    selectedCDL?.threshold_value
                      ? selectedCDL.threshold_value
                      : ''
                  }
                  onChange={(e) => {
                    setFieldValue(
                      `exceptions[${exception}].required_threshold`,
                      e.target.value
                    );
                  }}
                />
              )}
            </Field>
          </InputGroup>
        </FormGroup>
      </div>
    </>
  );
};
