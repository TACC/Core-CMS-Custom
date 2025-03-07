import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { formatDate, formatUTCDate } from 'utils/dateUtil';
import { ExtensionRow } from 'hooks/admin';

const ViewExtensionModal: React.FC<{
  extension: ExtensionRow;
  isVisible: boolean;
  onClose: () => void;
}> = ({ extension, isVisible, onClose }) => {
  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );
  return (
    <Modal title="View Extension" isOpen={isVisible} toggle={onClose} size="lg">
      <ModalHeader close={closeBtn}>
        Extension Details ID {extension.ext_id} for {extension.org_name}
      </ModalHeader>
      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <div className="modal-section">
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Created</Col>
              <Col md={7}>
                {extension.created
                  ? new Date(extension.created).toLocaleString()
                  : 'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Entity Organization</Col>
              <Col md={7}>{extension.org_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor</Col>
              <Col md={7}>{extension.requestor}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor Email</Col>
              <Col md={7}>{extension.requestor_email}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Extension Type</Col>
              <Col md={7}>{extension.type}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Status</Col>
              <Col md={7}>{extension.ext_status}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Outcome</Col>
              <Col md={7}>{extension.ext_outcome}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Applicable Data Period</Col>
              <Col md={7}>{extension.applicable_data_period}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Current Expected Date</Col>
              <Col md={7}>
                {extension.current_expected_date
                  ? formatUTCDate(extension.current_expected_date)
                  : 'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requested Target Date</Col>
              <Col md={7}>
                {extension.requested_target_date
                  ? formatUTCDate(extension.requested_target_date)
                  : 'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Approved Expiration Date</Col>
              <Col md={7}>
                {extension.approved_expiration_date
                  ? formatUTCDate(extension.approved_expiration_date)
                  : 'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Extension Justification</Col>
              <Col md={7}>{extension.explanation_justification}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Extension Notes</Col>
              <Col md={7}>{extension.notes}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Last Updated</Col>
              <Col md={7}>
                {extension.updated_at
                  ? formatDate(extension.updated_at)
                  : 'None'}
              </Col>
            </Row>
            <hr />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExtensionModal;
