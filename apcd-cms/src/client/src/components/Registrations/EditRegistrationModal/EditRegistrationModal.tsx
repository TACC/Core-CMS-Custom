import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import {
  transformToRegistrationFormValues,
  RegistrationFormValues,
  useAdminRegistration,
} from 'hooks/registrations';
import { RegistrationForm } from 'apcd-components/Forms/Registrations';

const EditRegistrationModal: React.FC<{
  reg_id: number;
  isVisible: boolean;
  onClose: () => void;
}> = ({ reg_id, isVisible, onClose }) => {
  const { data, isLoading, error } = useAdminRegistration(reg_id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data Found.</div>;

  const form_values: RegistrationFormValues =
    transformToRegistrationFormValues(data);

  return (
    <Modal
      title="Edit Registration"
      isOpen={isVisible}
      toggle={onClose}
      size="lg"
    >
      <div className="modal-header">
        <h4 className="modal-title text-capitalize">Edit Registration</h4>
        <button type="button" className="close" onClick={onClose}>
          <span aria-hidden="true">&#xe912;</span>
        </button>
      </div>
      <ModalBody className="modal-body">
        <RegistrationForm
          isEdit={true}
          inputValues={form_values}
          isModal={true}
          onSuccessCallback={onClose}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditRegistrationModal;
