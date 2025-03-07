import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Alert } from 'reactstrap';
import { Field, useFormik, FormikHelpers, FormikProvider } from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import { formatDate, formatUTCDate } from 'utils/dateUtil';
import * as Yup from 'yup';
import { ExtensionRow } from 'hooks/admin';
import { useSubmitterDataPeriods } from 'hooks/entities';
import QueryWrapper from 'core-wrappers/QueryWrapper';
import {
  convertPeriodLabelToApiValue,
  convertApiValueToPeriodLabel,
} from 'utils/dateUtil';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';
import Button from 'core-components/Button';

interface EditExtensionModalProps {
  isVisible: boolean;
  onClose: () => void;
  extension: ExtensionRow | null;
  statusOptions: string[] | undefined;
  outcomeOptions: string[] | undefined;
  onEditSuccess?: (updatedExtension: ExtensionRow) => void;
}

interface FormValues {
  ext_outcome: string;
  ext_status: string;
  ext_id: string;
  approved_expiration_date: string;
  applicable_data_period: string;
  notes: string;
}

const EditExtensionModal: React.FC<EditExtensionModalProps> = ({
  isVisible,
  onClose,
  extension,
  statusOptions,
  outcomeOptions,
  onEditSuccess,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentExtension, setCurrentExtension] = useState<ExtensionRow | null>(
    extension
  );

  const {
    data: submitterData,
    isLoading: submitterDataLoading,
    error: submitterDataError,
  } = useSubmitterDataPeriods(extension?.submitter_id);

  useEffect(() => {
    setCurrentExtension(extension);
  }, [extension]);

  if (!currentExtension) return null;

  const extensionFields = [
    {
      label: 'Created',
      value: currentExtension?.created
        ? formatDate(currentExtension.created)
        : 'None',
    },
    {
      label: 'Entity Organization',
      value: currentExtension?.org_name,
    },
    {
      label: 'Requestor',
      value: currentExtension?.requestor,
    },
    {
      label: 'Requestor Email',
      value: currentExtension?.requestor_email,
    },
    {
      label: 'Extension Type',
      value: currentExtension?.type,
    },
    {
      label: 'Status',
      value: currentExtension?.ext_status,
    },
    {
      label: 'Outcome',
      value: currentExtension?.ext_outcome,
    },
    {
      label: 'Applicable Data Period',
      value: currentExtension?.applicable_data_period,
    },
    {
      label: 'Current Expected Date',
      value:
        currentExtension?.current_expected_date &&
        currentExtension?.current_expected_date !== 'None'
          ? formatUTCDate(currentExtension?.current_expected_date)
          : 'None',
    },
    {
      label: 'Requested Target Date',
      value:
        currentExtension?.requested_target_date &&
        currentExtension?.requested_target_date !== 'None'
          ? formatUTCDate(currentExtension?.requested_target_date)
          : 'None',
    },
    {
      label: 'Approved Expiration Date',
      value:
        currentExtension?.approved_expiration_date &&
        currentExtension?.approved_expiration_date !== 'None'
          ? formatUTCDate(currentExtension?.approved_expiration_date)
          : 'None',
    },
    {
      label: 'Extension Justification',
      value: currentExtension?.explanation_justification,
    },
    {
      label: 'Extension Notes',
      value: currentExtension?.notes,
    },
    {
      label: 'Last Updated',
      value:
        currentExtension?.updated_at && currentExtension?.updated_at !== 'None'
          ? formatDate(currentExtension?.updated_at)
          : 'None',
    },
  ];

  // Use the custom hook to get form fields and validation
  const useFormFields = () => {
    const initialValues: FormValues = {
      ...currentExtension,
      ext_id: currentExtension?.ext_id,
      notes: currentExtension?.notes || 'None', // Set notes to 'None' if it is null
    };

    const validationSchema = Yup.object({
      notes: Yup.string()
        .max(2000, 'Notes cannot exceed 2000 characters')
        .nullable(),
    });

    return { initialValues, validationSchema };
  };
  const { initialValues, validationSchema } = useFormFields();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { ext_id } = values;
    const api_values = {
      ...values,
      applicable_data_period: convertPeriodLabelToApiValue(
        values['applicable_data_period']
      ),
    };
    const url = `administration/update-extension/${ext_id}/`;

    try {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: api_values,
      });

      if (response) {
        setCurrentExtension((prevExtension) => ({
          ...prevExtension!,
          ext_status: values.ext_status,
          ext_outcome: values.ext_outcome,
          applicable_data_period: values.applicable_data_period,
          approved_expiration_date: values.approved_expiration_date,
          notes: values.notes,
          updated_at: new Date().toISOString(),
        }));

        setShowSuccessMessage(true);
        if (onEditSuccess) onEditSuccess(response);
      }
    } catch (error: any) {
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

  const handleClose = () => {
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    onClose();
  };

  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={onClose}
        className="modal-dialog modal-lg"
      >
        <ModalHeader close={closeBtn}>
          Edit Extension ID {currentExtension.ext_id} for{' '}
          {currentExtension.org_name}
        </ModalHeader>
        <ModalBody>
          <h4 className="modal-header">Edit Selected Extension</h4>
          <QueryWrapper
            isLoading={submitterDataLoading}
            error={submitterDataError as Error}
          >
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={3}>
                    <FieldWrapper
                      name="applicable_data_period"
                      label="Applicable Data Period"
                      required={false}
                    >
                      <Field
                        as="select"
                        name="applicable_data_period"
                        id="applicable_data_period"
                        value={convertPeriodLabelToApiValue(
                          formik.values.applicable_data_period
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {submitterData?.data_periods?.map((item) => (
                          <option
                            key={item.data_period}
                            value={item.data_period}
                          >
                            {item.data_period}
                          </option>
                        ))}
                      </Field>
                      <div className="help-text">
                        Current: {currentExtension.applicable_data_period}
                      </div>
                    </FieldWrapper>
                  </Col>
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
                      <div className="help-text">
                        Requested Target Date:{' '}
                        {currentExtension.requested_target_date
                          ? new Date(
                              currentExtension.requested_target_date
                            ).toLocaleDateString()
                          : 'None'}
                      </div>
                    </FieldWrapper>
                  </Col>
                  <Col md={3}>
                    <FieldWrapper
                      name="ext_status"
                      label="Extension Status"
                      required={false}
                    >
                      <Field
                        as="select"
                        name="ext_status"
                        id="ext_status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ext_status}
                      >
                        {statusOptions?.map(
                          (opt) =>
                            opt.value !== 'All' && (
                              <option
                                className="dropdown-text"
                                key={opt.key}
                                value={opt.value}
                              >
                                {opt.value}
                              </option>
                            )
                        )}
                      </Field>
                    </FieldWrapper>
                  </Col>
                  <Col md={3}>
                    <FieldWrapper
                      name="ext_outcome"
                      label="Extension Outcome"
                      required={false}
                    >
                      <Field
                        as="select"
                        name="ext_outcome"
                        id="ext_outcome"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ext_outcome}
                      >
                        {outcomeOptions?.map((opt) => (
                          <option
                            className="dropdown-text"
                            key={opt.key}
                            value={opt.value}
                          >
                            {opt.value}
                          </option>
                        ))}
                      </Field>
                    </FieldWrapper>
                  </Col>
                  <Col md={6}>
                    <FieldWrapper name="notes" label="Notes" required={false}>
                      <Field
                        as="textarea"
                        name="notes"
                        id="notes"
                        rows="5"
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
                  Success: The extension data has been successfully updated.
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
          <hr />
          <h4 className="modal-header">Current Extension Information</h4>
          <div>
            {extensionFields.map((field, index) => (
              <Row key={index}>
                <Col md={{ size: 4, offset: 1 }}>{field.label}:</Col>
                <Col md={6}>{field.value}</Col>
              </Row>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditExtensionModal;
