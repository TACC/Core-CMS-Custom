import React, { useEffect, useState } from 'react';
import { useExtensions, ExtensionRow } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import SectionMessage from 'core-components/SectionMessage';
import Paginator from 'core-components/Paginator';
import styles from './ExtensionList.module.css';
import ViewExtensionModal from 'apcd-components/Extensions/ViewExtensionModal/ViewExtensionModal';
import EditExtensionModal from 'apcd-components/Extensions/EditExtensionModal/EditExtensionModal';
import { formatDate, formatUTCDate } from 'utils/dateUtil';
import { ClearOptionsButton } from 'apcd-components/ClearOptionsButton';

export const AdminExtensions: React.FC = () => {
  const [status, setStatus] = useState('Pending');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useExtensions(
    status,
    org,
    page
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedExtension, setSelectedExtension] =
    useState<ExtensionRow | null>(null);

  const clearSelections = () => {
    setStatus('Pending');
    setOrg('');
    setPage(1);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedExtension(null);
  };

  const onEditSuccess = (updatedExtension: ExtensionRow) => {
    // Refresh extension data after editing is successful
    refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <SectionMessage type="error">
        There was an error loading the page.{''}
        <a href="/workbench/dashboard/tickets/create" className="wb-link">
          Please submit a ticket.
        </a>
      </SectionMessage>
    );
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    ext_id: string
  ) => {
    const actionsDropdown = event.target;
    const selectedOption = actionsDropdown.value;
    setSelectedExtension(data?.page.find((x) => x.ext_id === ext_id) ?? null);
    if (selectedOption == 'viewExtension') {
      setIsViewModalOpen(true);
    } else if (selectedOption == 'editExtension') {
      setIsEditModalOpen(true);
    }
    actionsDropdown.selectedIndex = 0;
  };

  return (
    <div className="container">
      <h1>View Extension Requests</h1>
      <p style={{ marginBottom: '30px' }}>All submitted extension requests</p>
      <hr />
      <div className="filter-container">
        <div className="filter-content">
          {/* Filter */}
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            onChange={(e) => setStatus(e.target.value)}
            value={data?.selected_status}
          >
            {data?.status_options.map((status, index) => (
              <option className="dropdown-text" key={index} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Filter by Organization */}
          <span>
            <b>Filter by Organization: </b>
          </span>
          <select
            id="organizationFilter"
            className="status-filter org-filter"
            onChange={(e) => setOrg(e.target.value)}
            value={data?.selected_org}
          >
            {data?.org_options.map((org, index) => (
              <option className="dropdown-text" key={index} value={org}>
                {org}
              </option>
            ))}
          </select>
          {data?.selected_status !== 'Pending' || data?.selected_org ? (
            <ClearOptionsButton onClick={clearSelections} />
          ) : null}
        </div>
      </div>
      <table id="extensionTable" className="extension-table">
        <thead>
          <tr>
            {data?.header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.page && data.page.length > 0 ? (
            data?.page.map((row: ExtensionRow, rowIndex: number) => (
              <tr key={rowIndex}>
                <td>{formatDate(row.created)}</td>
                <td>{row.org_name}</td>
                <td>{row.requestor}</td>
                <td>{row.type}</td>
                <td>{row.ext_outcome}</td>
                <td>{row.ext_status}</td>
                <td>{formatUTCDate(row.approved_expiration_date)}</td>
                <td className="modal-cell">
                  <select
                    id={`actionsDropdown_${row.ext_id}`}
                    defaultValue=""
                    className="status-filter"
                    onChange={(e) => openAction(e, row.ext_id)}
                  >
                    <option value="">Select Action</option>
                    <option value="viewExtension">View Record</option>
                    <option value="editExtension">Edit Record</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center' }}>
                No Data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.paginatorContainer}>
        <Paginator
          pages={data?.total_pages ?? 0}
          current={data?.page_num ?? 0}
          callback={setPage}
        />
        {selectedExtension && (
          <>
            <ViewExtensionModal
              extension={selectedExtension}
              isVisible={isViewModalOpen}
              onClose={closeModal}
            />
            <EditExtensionModal
              extension={selectedExtension}
              statusOptions={data?.status_edit_options}
              outcomeOptions={data?.outcome_edit_options}
              isVisible={isEditModalOpen}
              onEditSuccess={onEditSuccess}
              onClose={closeModal}
            />
          </>
        )}
      </div>
    </div>
  );
};
