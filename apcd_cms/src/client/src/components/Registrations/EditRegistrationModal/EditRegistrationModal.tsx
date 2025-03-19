import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
  transformToRegistrationFormValues,
  RegistrationFormValues,
} from 'hooks/registrations';
import { RegistrationForm } from 'apcd-components/Forms/Registrations';

const EditRegistrationModal: React.FC<{
  reg_id: number;
  isVisible: boolean;
  useDataHook: any;
  status_options: string[];
  onClose: () => void;
}> = ({ reg_id, isVisible, useDataHook, status_options, onClose }) => {
  const { data, isLoading, error } = useDataHook(reg_id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data Found.</div>;

  const form_values: RegistrationFormValues =
    transformToRegistrationFormValues(data);

  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  return (
    <Modal
      title="Edit Registration"
      isOpen={isVisible}
      toggle={onClose}
      size="lg"
    >
      <ModalHeader close={closeBtn}>Edit Registration</ModalHeader>
      <ModalBody className="modal-body">
        <RegistrationForm
          isEdit={true}
          inputValues={form_values}
          isModal={true}
          status_options={status_options.filter(
            (option) => option !== 'All' && option !== 'None'
          )}
          onSuccessCallback={onClose}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditRegistrationModal;
