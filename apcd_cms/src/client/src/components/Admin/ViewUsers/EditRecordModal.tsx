import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  FormGroup,
  Row,
  Col,
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import * as Yup from 'yup';
import { UserRow } from 'hooks/admin';
import styles from './ViewUsers.module.scss';
import { formatDate } from 'utils/dateUtil';
import QueryWrapper from 'core-wrappers/QueryWrapper';
import FieldWrapper from 'core-wrappers/FieldWrapperFormik';
import Button from 'core-components/Button';

interface EditRecordModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserRow | null;
  onEditSuccess?: (updatedUser: UserRow) => void;
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  toggle,
  user,
  onEditSuccess,
}) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(
    Error('User data is not avalible')
  );

  if (!user) return null;
  console.log('The user is ', user);
  if (isLoading) {
    setIsLoading(false);
    setLoadingError(null);
  }

  const initialValues: UserRow = {
    ...user,
    notes: user.notes || 'None', // Set notes to 'None' if it is null
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required('Name is required'),
    user_email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    status: Yup.string().required('Status is required'),
    role_name: Yup.string().required('Role is required'),
    notes: Yup.string()
      .max(2000, 'Notes cannot exceed 2000 characters')
      .nullable(),
  });

  const handleSave = async (
    values: UserRow,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { user_number } = values;
    const url = `administration/users/${user_number}/`;
    try {
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: values,
      });

      if (onEditSuccess && response) {
        onEditSuccess(response);
      }

      setSuccessModalOpen(true);
    } catch (error: any) {
      console.error('Error saving data:', error);
      console.log(url);
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
      setErrorModalOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const userFields = [
    { label: 'User ID', value: user.user_id },
    { label: 'Name', value: user.user_name },
    { label: 'User Number', value: user.user_number },
    { label: 'Email', value: user.user_email },
    { label: 'Entity Organization', value: user.entity_name },
    { label: 'Role', value: user.role_name },
    { label: 'Status', value: user.status },
    { label: 'Created Date', value: formatDate(user.created_at) },
    { label: 'Updated Date', value: formatDate(user.updated_at) },
    { label: 'Notes', value: user.notes ? user.notes : 'None' },
  ];

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={styles.customModal}>
        <ModalHeader close={closeBtn}>
          Edit User ID: {user.user_id} for {user.user_name}
        </ModalHeader>
        <ModalBody>
          <div className={styles.greyRectangle}>Edit Selected User</div>
          <QueryWrapper isLoading={false} error={loadingError}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ isSubmitting, dirty }) => (
                <Form>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <FieldWrapper
                          name="user_name"
                          label="Name"
                          className={styles.customLabel}
                          required={true}
                        >
                          <Field
                            type="text"
                            name="user_name"
                            id="user_name"
                            className={`form-control ${styles.viewRecord}`}
                          />
                        </FieldWrapper>
                        <ErrorMessage
                          name="user_name"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <FieldWrapper
                          name="user_email"
                          label="Email"
                          className={styles.customLabel}
                          required={true}
                        >
                          <Field
                            type="email"
                            name="user_email"
                            id="user_email"
                            className={`form-control ${styles.viewRecord}`}
                          />
                        </FieldWrapper>

                        <ErrorMessage
                          name="user_email"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <FieldWrapper
                          name="status"
                          label="Status"
                          className={styles.customLabel}
                          required={true}
                        >
                          <Field
                            as="select"
                            name="status"
                            id="status"
                            className={`form-control ${styles.viewRecord}`}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </Field>
                        </FieldWrapper>

                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <FieldWrapper
                          name="role_name"
                          label="Role"
                          className={styles.customLabel}
                          required={true}
                        >
                          <Field
                            as="select"
                            name="role_name"
                            id="role_name"
                            className={`form-control ${styles.viewRecord}`}
                          >
                            <option value="SUBMITTER_USER">
                              SUBMITTER_USER
                            </option>
                            <option value="SUBMITTER_ADMIN">
                              SUBMITTER_ADMIN
                            </option>
                            <option value="APCD_ADMIN">APCD_ADMIN</option>
                          </Field>
                        </FieldWrapper>
                        <ErrorMessage
                          name="role_name"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <FieldWrapper
                          name="notes"
                          label="Notes"
                          className={styles.customLabel}
                          required={false}
                        ></FieldWrapper>
                        <Field
                          as="textarea"
                          name="notes"
                          id="notes"
                          rows="5"
                          maxLength="2000" // Set the maxLength attribute
                          className={`form-control ${styles.viewRecord}`}
                        />
                        <small
                          className="form-text text-muted"
                          style={{ fontStyle: 'italic' }}
                        >
                          2000 character limit
                        </small>
                        <ErrorMessage
                          name="notes"
                          component="div"
                          className="text-danger"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Button
                    attr="submit"
                    disabled={isSubmitting || !dirty}
                    className={styles.customSubmitButton}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
            <hr />
            <div className={styles.viewRecord}>
              {userFields.map((field, index) => (
                <Row key={index}>
                  <Col md={6}>
                    <p>{field.label}:</p>
                  </Col>
                  <Col md={6}>
                    <p>{field.value}</p>
                  </Col>
                </Row>
              ))}
            </div>
          </QueryWrapper>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={successModalOpen}
        toggle={() => setSuccessModalOpen(false)}
        className={styles.customModal}
      >
        {/* Success must be in line with submit button*/}
        <div className={`modal-header ${styles.modalHeader}`}>
          <Label className={styles.customModalTitle}>Success</Label>
          <button
            type="button"
            className={`close ${styles.customCloseButton}`}
            onClick={toggle}
          >
            <span aria-hidden="true">&#xe912;</span>
          </button>
        </div>
        <ModalBody>The user data has been successfully updated.</ModalBody>
      </Modal>

      <Modal
        isOpen={errorModalOpen}
        toggle={() => setErrorModalOpen(false)}
        className={styles.customModal}
      >
        <div className={`modal-header ${styles.modalHeader}`}>
          <Label className={styles.customModalTitle}>Error</Label>
          <button
            type="button"
            className={`close ${styles.customCloseButton}`}
            onClick={toggle}
          >
            <span aria-hidden="true">&#xe912;</span>
          </button>
        </div>
        <ModalBody>{errorMessage}</ModalBody>
      </Modal>
    </>
  );
};

export default EditRecordModal;
