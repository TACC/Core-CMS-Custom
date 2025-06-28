import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { cdl, useCDLs } from 'hooks/cdls';
import { ExceptionRow } from 'hooks/admin';
import { formatUTCDate } from 'utils/dateUtil';

export const ViewExceptionModal: React.FC<{
  exception: ExceptionRow;
  isOpen: boolean;
  onClose: () => void;
}> = ({ exception, isOpen, onClose }) => {
  const closeBtn = (
    <button className="close" onClick={onClose} type="button">
      &times;
    </button>
  );

  const {
    created_at,
    entity_name,
    payor_code,
    requestor_name,
    requestor_email,
    request_type,
    status,
    outcome,
    data_file_name,
    field_number,
    required_threshold,
    requested_threshold,
    approved_threshold,
    requested_expiration_date,
    approved_expiration_date,
    explanation_justification,
    notes,
    updated_at,
  } = exception.view_modal_content;

  // Use data_file_name from form to find cdl field_list_code and cdl field_list_value
  const mapFileTypeToCDL = (data_file_name: string): string => {
    const map: { [key: string]: string } = {
      'dental claims': 'dc',
      'medical claims': 'mc',
      'member eligibility': 'me',
      'pharmacy claims': 'pc',
      // prettier removes ' around provider
      // prettier-ignore
      'provider': 'pv',
    };
    const fileType = data_file_name.toLowerCase();
    for (const [key, value] of Object.entries(map)) {
      if (fileType.includes(key)) {
        return value;
      }
    }
    return fileType.substring(0, 2);
  };

  const cdl = (data_file_name: string): cdl => {
    const fileTypeCode = mapFileTypeToCDL(data_file_name);
    const {
      data: fetchedCDLData,
      isLoading: cdlLoading,
      isError: cdlError,
    } = useCDLs(fileTypeCode);
    const cdls = fetchedCDLData?.cdls.find(
      (cdl) => cdl.field_list_code === field_number
    );
    return cdls as cdl;
  };
  
  return (
    <Modal title="View Exception" isOpen={isOpen} toggle={onClose} size="lg">
      <ModalHeader close={closeBtn}>Exception Detail</ModalHeader>
      <ModalBody className="modal-body">
        <div>
          <h4>Details</h4>
          <div className="modal-section">
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Created</Col>
              <Col md={7}>
                {(created_at && new Date(created_at).toLocaleString()) ||
                  'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Entity Organization</Col>
              <Col md={7}>{entity_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Payor Code</Col>
              <Col md={7}>{payor_code}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor</Col>
              <Col md={7}>{requestor_name}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requestor Email</Col>
              <Col md={7}>{requestor_email}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Exception Type</Col>
              <Col md={7}>{request_type}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Status</Col>
              <Col md={7}>{status}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Outcome</Col>
              <Col md={7}>{outcome || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>File Type</Col>
              <Col md={7}>{data_file_name || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Field Number</Col>
              {field_number && data_file_name ? (
                <Col md={7}>
                  {(() => {
                    const cdlValue = cdl(data_file_name);
                    return (
                      cdlValue?.field_list_code +
                      ' - ' +
                      cdlValue?.field_list_value
                    );
                  })()}
                </Col>
              ) : (
                <Col md={7}>{'Unavailable'}</Col>
              )}
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Required Threshold</Col>
              <Col md={7}>{required_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requested Threshold</Col>
              <Col md={7}>{requested_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Approved Threshold</Col>
              <Col md={7}>{approved_threshold || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Requested Expiration Date</Col>
              <Col md={7}>
                {(requested_expiration_date &&
                  formatUTCDate(requested_expiration_date)) ||
                  'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Approved Expiration Date</Col>
              <Col md={7}>
                {(approved_expiration_date &&
                  formatUTCDate(approved_expiration_date)) ||
                  'None'}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Explanation Justification</Col>
              <Col md={7}>{explanation_justification || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Exception Notes</Col>
              <Col md={7}>{notes || 'None'}</Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 1 }}>Last Updated</Col>
              <Col md={7}>
                {(updated_at && new Date(updated_at).toLocaleString()) ||
                  'None'}
              </Col>
            </Row>
            <hr />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewExceptionModal;
