import React from 'react';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { UserRow } from 'hooks/admin';
import styles from './ViewRecordModal.module.scss';  // Import SCSS module

interface UserDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserRow | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, toggle, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={styles.customModal}>
      <ModalHeader>
        <Label className={styles.customModalTitle}>
          Details for User: {user.user_name} ({user.user_id})
        </Label>
        <button type="button" className={`close ${styles.customCloseButton}`} onClick={toggle}>
          <span aria-hidden="true">&times;</span> {/* Use &times; for a standard close icon */}
        </button>
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
    </Modal>
  );
};

export default UserDetailsModal;
