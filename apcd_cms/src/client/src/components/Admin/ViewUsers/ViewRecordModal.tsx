import React from 'react';
import { Modal, ModalHeader, Row, Col, ModalBody } from 'reactstrap';
import { UserRow } from 'hooks/admin';
import styles from './ViewUsers.module.scss';
import { formatDate } from 'utils/dateUtil';

interface UserDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserRow | null;
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
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              User ID:
            </Col>
            <Col sm="9">{user.user_id}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Name:
            </Col>
            <Col sm="9">{user.user_name}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              User Number:
            </Col>
            <Col sm="9">{user.user_number}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Email:
            </Col>
            <Col sm="9">{user.user_email}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Entity Organization:
            </Col>
            <Col sm="9">{user.entity_name}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Role:
            </Col>
            <Col sm="9">{user.role_name}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Status:
            </Col>
            <Col sm="9">{user.status}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Created Date:
            </Col>
            <Col sm="9">{formatDate(user.created_at)}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Updated Date:
            </Col>
            <Col sm="9">{formatDate(user.updated_at)}</Col>
          </Row>
          <Row className={styles.userRow}>
            <Col sm="3" className={styles.userkey}>
              Notes:
            </Col>
            <Col sm="9">{user.notes ? user.notes : 'None'}</Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UserDetailsModal;
