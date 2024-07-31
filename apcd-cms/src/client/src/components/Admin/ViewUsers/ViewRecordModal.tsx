import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UserRow } from 'hooks/admin';
import styles from './ViewRecordModal.module.scss';

interface UserDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserRow | null;
}

const ViewRecordModal: React.FC<UserDetailsModalProps> = ({ isOpen, toggle, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={styles.customModal}>
      <ModalHeader toggle={toggle} className={`${styles.customModalHeader}`}>
        Details for User: {user.user_name} ({user.user_id})
      </ModalHeader>
      <ModalBody>
        <p><strong>User ID:</strong> {user.user_id}</p>
        <p><strong>Name:</strong> {user.user_name}</p>
        <p><strong>User Number:</strong> {user.user_number}</p>
        <p><strong>Email:</strong> {user.user_email}</p>
        <p><strong>Entity Organization:</strong> {user.entity_name}</p>
        <p><strong>Role:</strong> {user.role_name}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <p><strong>Created Date:</strong> {user.created_at}</p>
        <p><strong>Updated Date:</strong> {user.updated_at}</p>
        <p><strong>Notes:</strong> {user.notes !== null ? user.notes : "None"}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewRecordModal;