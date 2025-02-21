import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  FormGroup,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import Button from 'core-components/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { fetchUtil } from 'utils/fetchUtil';
import * as Yup from 'yup';
import { SubmitterUserRow } from 'hooks/admin';
import styles from './ViewSubmitterUsers.module.scss';

interface EditRecordModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: SubmitterUserRow | null;
  onEditSuccess?: (updatedUser: SubmitterUserRow) => void;
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  toggle,
  user,
  onEditSuccess,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!user) return null;

  const initialValues: SubmitterUserRow = {
    ...user,
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required('Name is required'),
    user_email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleSave = async (
    values: SubmitterUserRow,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { user_number } = values;
    const url = `administration/users/${user_number}/`;
    try {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      const response = await fetchUtil({
        url,
        method: 'PUT',
        body: values,
      });

      if (onEditSuccess && response) {
        onEditSuccess(response);
      }

      setShowSuccessMessage(true);
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
      setSubmitting(false);
    }
  };

  const userFields = [
    { label: 'Submitter ID', value: user.submitter_id },
    { label: 'User ID', value: user.user_id },
    { label: 'Name', value: user.user_name },
    { label: 'Email', value: user.user_email },
    { label: 'Entity Organization', value: user.entity_name },
    { label: 'Role', value: user.role_name },
    { label: 'Status', value: user.status },
    { label: 'User Number', value: user.user_number },
    { label: 'Payor Code', value: user.payor_code },
    { label: 'Notes', value: user.notes },
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
          <div className={styles.greyRectangle}>
            Edit Selected Submitter User
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="user_name" className={styles.customLabel}>
                        <strong>Name</strong>
                      </Label>
                      <Field
                        type="text"
                        name="user_name"
                        id="user_name"
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <ErrorMessage
                        name="user_name"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="user_email" className={styles.customLabel}>
                        <strong>Email</strong>
                      </Label>
                      <Field
                        type="email"
                        name="user_email"
                        id="user_email"
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <ErrorMessage
                        name="user_email"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="payor_code" className={styles.customLabel}>
                        <strong>Payor Code</strong>
                      </Label>
                      <Field
                        type="text"
                        name="payor_code"
                        id="payor_code"
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <ErrorMessage
                        name="payor_code"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="notes" className={styles.customLabel}>
                        <strong>Notes</strong>
                      </Label>
                      <Field
                        type="text"
                        name="notes"
                        id="notes"
                        className={`form-control ${styles.viewRecord}`}
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Alert color="success" isOpen={showSuccessMessage}>
                  Success: The user data has been successfully updated.
                </Alert>
                <Alert color="danger" isOpen={showErrorMessage}>
                  Error: {errorMessage}
                </Alert>
                <Button type="primary" attr="submit" disabled={isSubmitting}>
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
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditRecordModal;
