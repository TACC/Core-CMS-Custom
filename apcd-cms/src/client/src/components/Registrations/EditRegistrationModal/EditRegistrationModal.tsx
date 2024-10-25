import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { RegistrationRow } from 'hooks/registrations';

const EditRegistrationModal: React.FC<{
  registration: RegistrationRow;
  isVisible: boolean;
  onClose: () => void;
}> = ({ registration, isVisible, onClose }) => {
  const { reg_id } = registration;

  return (
    <Modal
      title="Edit Registration"
      isOpen={isVisible}
      toggle={onClose}
      size="lg"
    >
      <div className="modal-header">
        <h4 className="modal-title text-capitalize">
          Edit Registration {reg_id}
        </h4>
        <button type="button" className="close" onClick={onClose}>
          <span aria-hidden="true">&#xe912;</span>
        </button>
      </div>
      <ModalBody className="modal-body">
        <div>
          <h4>To be implemented</h4>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditRegistrationModal;
