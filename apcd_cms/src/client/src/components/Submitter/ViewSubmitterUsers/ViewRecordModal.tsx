import React from 'react';
import { Modal, ModalHeader, Row, Col, ModalBody } from 'reactstrap';
import { SubmitterUserRow } from 'hooks/admin';
import styles from './ViewSubmitterUsers.module.scss';
// import { formatDate } from 'utils/dateUtil';

interface UserDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: SubmitterUserRow | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  toggle,
  user,
}) => {
  if (!user) return null;
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  return (
    <Modal isOpen={isOpen} toggle={toggle} className={styles.customModal}>
      <ModalHeader close={closeBtn}>
        Details for User: {user.user_name} ({user.user_id})
      </ModalHeader>

      <ModalBody className="modal-content">
        <div className={styles.userListing}>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              Submitter ID:
            </Col>
            <Col sm="9">{user.submitter_id}</Col>
          </Row>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              User ID:
            </Col>
            <Col sm="9">{user.user_id}</Col>
          </Row>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              User Number:
            </Col>
            <Col sm="9">{user.user_number}</Col>
          </Row>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              Email:
            </Col>
            <Col sm="9">{user.user_email}</Col>
          </Row>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              Name:
            </Col>
            <Col sm="9">{user.user_name}</Col>
          </Row>
          <Row className={styles.SubmitterUserRow}>
            <Col sm="3" className={styles.userkey}>
              Payor Code:
            </Col>
            <Col sm="9">{user.payor_code}</Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UserDetailsModal;
