import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Alert } from 'reactstrap';
import { Field, useFormik, FormikHelpers, FormikProvider } from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import * as Yup from 'yup';
import { ExceptionRow } from 'hooks/admin';
import { ExceptionForm } from 'apcd-components/Submitter/Exceptions';
import { formatDate } from 'utils/dateUtil';
import QueryWrapper from 'core-wrappers/QueryWrapper';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';
import Button from 'core-components/Button';

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  exception: ExceptionRow | null;
  statusOptions: string[] | undefined;
  outcomeOptions: string[] | undefined;
  onEditSuccess?: (updatedException: ExceptionRow) => void;
}

interface FormValues {
  exception_id: string;
  approved_threshold: string;
  approved_expiration_date: string;
  status: string;
  outcome: string;
  notes: string;
  exceptions: Array<{
    businessName: number;
    fileType: string;
    fieldCode: string;
    expiration_date: string;
    requested_threshold: number;
    required_threshold: number;
    justification: string;
  }>;
}

const EditExceptionModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  onClose,
  exception,
  statusOptions,
  outcomeOptions,
  onEditSuccess,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(
    Error('Exception data is not avalible')
  );
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  // maps file names from DB to values associated with form to populate edit fields
  const mapFileTypeToCDL = (fileTypeName: string): string => {
    const map: { [key: string]: string } = {
      'dental claims': 'dc',
      'medical claims': 'mc',
      'member eligibility': 'me',
      'pharmacy claims': 'pc',
      // prettier removes ' around provider
      // prettier-ignore
      'provider': 'pv',
    };

    const fileType = fileTypeName.toLowerCase();
    for (const [key, value] of Object.entries(map)) {
      if (fileType.includes(key)) {
        return value;
      }
    }
    return fileType.substring(0, 2);
  };

  if (!exception) return null;
  if (isLoading) {
    setIsLoading(false);
    setLoadingError(null);
  }

  // Use the custom hook to get form fields and validation
  const useFormFields = () => {
    const initialValues: FormValues = {
      exception_id: exception?.exception_id || '',
      approved_threshold: exception?.approved_threshold || '',
      approved_expiration_date: exception?.approved_expiration_date || '',
      status: exception?.view_modal_content?.status || '',
      outcome: exception?.view_modal_content?.outcome || '',
      notes: exception?.notes || 'None',
      // Adds an exceptions array that ExceptionForm expects
      exceptions: [
        {
          businessName: exception?.submitter_id,
          fileType: mapFileTypeToCDL(
            exception?.view_modal_content?.data_file_name || ''
          ),
          fieldCode: exception?.view_modal_content?.field_number || '',
          expiration_date:
            exception?.view_modal_content?.requested_expiration_date,
          requested_threshold: parseFloat(
            exception?.view_modal_content?.requested_threshold || '0'
          ),
          required_threshold: parseFloat(
            exception?.view_modal_content?.required_threshold || '0'
          ),
          justification:
            exception?.view_modal_content?.explanation_justification || '',
        },
      ],
    };

    const validationSchema = Yup.object({
      notes: Yup.string()
        .max(2000, 'Notes cannot exceed 2000 characters')
        .nullable(),
      exceptions: Yup.array().of(
        Yup.object().shape({
          businessName: Yup.number(),
          fileType: Yup.string(),
          fieldCode: Yup.string(),
          expiration_date: Yup.date(),
          requested_threshold: Yup.number(),
          required_threshold: Yup.number(),
          explanation_justification: Yup.string(),
        })
      ),
    });

    return { initialValues, validationSchema };
  };
  const { initialValues, validationSchema } = useFormFields();
  let {
    created_at,
    entity_name,
    requestor_name,
    requestor_email,
    request_type,
    status,
    outcome,
    data_file_name,
    field_number,
    required_threshold,
    requested_expiration_date,
    explanation_justification,
    updated_at,
  } = exception.view_modal_content;
  const [currentException, setCurrentException] = useState([
    {
      label: 'Created',
      value: created_at ? formatDate(created_at) : 'None',
    },
    {
      label: 'Entity Organization',
      value: entity_name,
    },
    {
      label: 'Requestor',
      value: requestor_name,
    },
    {
      label: 'Requestor Email',
      value: requestor_email,
    },
    {
      label: 'Exception Type',
      value: request_type,
    },
    {
      label: 'Status',
      value: status,
    },
    {
      label: 'Outcome',
      value: outcome ? outcome : 'None',
    },
    {
      label: 'File Type',
      value: data_file_name ? data_file_name : 'None',
    },
    {
      label: 'Field Number',
      value: field_number ? field_number : 'None',
    },
    {
      label: 'Required Threshold',
      value: required_threshold ? required_threshold : 'None',
    },
    {
      label: 'Requested Expiration Date',
      value:
        (requested_expiration_date &&
          new Date(requested_expiration_date).toLocaleDateString(
            undefined,
            dateFormat
          )) ||
        'None',
    },
    {
      label: 'Explanation Justification',
      value: explanation_justification || 'None',
    },
    {
      label: 'Last Updated',
      value: updated_at ? formatDate(updated_at) : 'None',
    },
  ]);

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { exception_id } = values;
    const url = `administration/exceptions/${exception_id}/`;
    try {
      setShowSuccessMessage(false);
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: values,
      });
      setCurrentException(
        currentException.map((field, index) => {
          if (field.label === 'Status') {
            return {
              label: field.label,
              value: values.status,
            };
          }
          if (field.label === 'Outcome') {
            return {
              label: field.label,
              value: values.outcome,
            };
          }
          return field;
        })
      );
      if (response) {
        setShowSuccessMessage(true);

        if (onEditSuccess) onEditSuccess(response);
      }
    } catch (error: any) {
      console.error('Error saving data:', error);
      if (error.response && error.response.data) {
        // Use error message from the server response
        setErrorMessage(
          error.response.data.message ||
            'An error occurred while saving the data. Please try again.'
        );
      } else {
        // Use generic error message
        setErrorMessage(
          'An error occurred while saving the data. Please try again.'
        );
      }
      setShowErrorMessage(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const dismissMessages = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
  };

  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="modal-dialog modal-lg"
        onClosed={dismissMessages}
      >
        <ModalHeader close={closeBtn}>
          Edit Exception ID {exception.exception_id} for {exception.entity_name}
        </ModalHeader>
        <ModalBody>
          <QueryWrapper isLoading={false} error={loadingError}>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                {formik.values &&
                  formik.values.exceptions.map((item, index) => (
                    <ExceptionForm
                      key={index}
                      index={index}
                      isModal={true}
                      exceptionType={exception.request_type}
                    />
                  ))}
                {/* admin only fields not in exception form */}
                <Row>
                  {exception.request_type.toLowerCase() == 'threshold' && (
                    <Col md={3}>
                      <FieldWrapper
                        name="approved_threshold"
                        label="Approved Threshold"
                        required={false}
                      >
                        <Field
                          type="text"
                          name="approved_threshold"
                          id="approved_threshold"
                          value={
                            formik.values.approved_threshold
                              ? formik.values.approved_threshold
                              : ''
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </FieldWrapper>
                    </Col>
                  )}
                  <Col md={3}>
                    <FieldWrapper
                      name="approved_expiration_date"
                      label="Approved Expiration Date"
                      required={false}
                    >
                      <Field
                        type="date"
                        name="approved_expiration_date"
                        id="approved_expiration_date"
                        value={
                          formik.values.approved_expiration_date
                            ? formik.values.approved_expiration_date
                            : ''
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </FieldWrapper>
                  </Col>
                  <Col md={3}>
                    <FieldWrapper name="status" label="Exception Status">
                      <Field
                        as="select"
                        name="status"
                        id="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                      >
                        {statusOptions?.map(
                          (val, index) =>
                            val !== 'All' && (
                              <option
                                className="dropdown-text"
                                key={index}
                                value={val}
                              >
                                {val}
                              </option>
                            )
                        )}
                      </Field>
                    </FieldWrapper>
                  </Col>
                  <Col md={3}>
                    <FieldWrapper
                      name="outcome"
                      label="Exception Outcome"
                      required={false}
                    >
                      <Field
                        as="select"
                        name="outcome"
                        id="outcome"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.outcome}
                      >
                        {outcomeOptions?.map((val, index) => (
                          <option
                            className="dropdown-text"
                            key={index}
                            value={val}
                          >
                            {val}
                          </option>
                        ))}
                      </Field>
                    </FieldWrapper>
                  </Col>
                  <Col md={6}>
                    <FieldWrapper
                      name="explanation_justification"
                      label="Justification"
                    >
                      {formik.values.exceptions.map((item, index) => (
                        <Field
                          key={item}
                          as="textarea"
                          name={`exceptions[${index}].justification`}
                          id={`explanation_justification_${index}`}
                          rows="5"
                          cols="40"
                          maxLength="2000"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      ))}
                      <div className="help-text">2000 character limit</div>
                    </FieldWrapper>
                  </Col>
                  <Col md={6}>
                    <FieldWrapper name="notes" label="Notes" required={false}>
                      <Field
                        as="textarea"
                        name="notes"
                        id="notes"
                        rows="5"
                        cols="40"
                        maxLength="2000" // Set the maxLength attribute
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="help-text">2000 character limit</div>
                    </FieldWrapper>
                  </Col>
                </Row>
                <br />
                <Alert color="success" isOpen={showSuccessMessage}>
                  Success: The exception data has been successfully updated.
                </Alert>
                <Alert color="danger" isOpen={showErrorMessage}>
                  Error: {errorMessage}
                </Alert>
                <Button
                  type="primary"
                  attr="submit"
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </QueryWrapper>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditExceptionModal;
