import React, { useEffect, useState } from 'react';
import { RegistrationResult, RegistrationRow } from 'hooks/registrations';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import ViewRegistrationModal from 'apcd-components/Registrations/ViewRegistrationModal/ViewRegistrationModal';
import EditRegistrationModal from 'apcd-components/Registrations/EditRegistrationModal/EditRegistrationModal';
import styles from './RegistrationList.module.css';

export const RegistrationList: React.FC<{ useDataHook: any }> = ({
  useDataHook,
}) => {
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useDataHook(status, org, page);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationRow | null>(null);

  useEffect(() => {
    refetch();
  }, [status, org, page, refetch]);

  const clearSelections = () => {
    setStatus('');
    setOrg('');
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="loading-placeholder">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <p className="c-message c-message--error">
          An error occurred loading your registrations. For help,{' '}
          <a href="/workbench/dashboard">submit a ticket</a>.
        </p>
        <a className="c-button c-button--primary" href="/">
          Back to Home
        </a>
      </>
    );
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    reg_id: string
  ) => {
    const actionsDropdown = event.target;
    const selectedOption = actionsDropdown.value;
    setSelectedRegistration(
      data?.page.find((x) => x.reg_id === reg_id) ?? null
    );
    if (selectedOption == 'viewRegistration') {
      setIsViewModalOpen(true);
    } else if (selectedOption == 'editRegistration') {
      setIsEditModalOpen(true);
    }
    actionsDropdown.selectedIndex = 0;
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-content">
          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>
              <b>Filter by Status: </b>
            </span>
            <select
              id="statusFilter"
              className="status-filter"
              defaultValue={data?.selected_status} // Use defaultValue to set the initial selected value
              onChange={(e) => setStatus(e.target.value)}
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
              defaultValue={data?.selected_org} // Use defaultValue to set the initial selected value
              onChange={(e) => setOrg(e.target.value)}
            >
              {data?.org_options.map((org, index) => (
                <option className="dropdown-text" key={index} value={org}>
                  {org}
                </option>
              ))}
            </select>
            {data?.selected_status || data?.selected_org ? (
              <button onClick={clearSelections}>Clear Options</button>
            ) : null}
          </div>
        </div>
      </div>
      <table id="registrationTable" className="registration-table">
        <thead>
          <tr>
            {data?.header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.page.map((row: RegistrationRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{row.biz_name}</td>
              <td>{row.year ? row.year : 'None'}</td>
              <td>{row.type}</td>
              <td>{row.location}</td>
              <td>{row.reg_status ? row.reg_status : 'None'}</td>
              <td>
                <select
                  id={`actionsDropdown_${row.reg_id}`}
                  defaultValue=""
                  className="status-filter"
                  onChange={(e) => openAction(e, row.reg_id)}
                >
                  <option value="">Select Action</option>
                  <option value="viewRegistration">View Record</option>
                  <option value="editRegistration">Edit Record</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginatorContainer}>
        <Paginator
          pages={data?.total_pages ?? 0}
          current={data?.page_num ?? 0}
          callback={setPage}
        />
      </div>
      {selectedRegistration && (
        <>
          <ViewRegistrationModal
            registration={selectedRegistration}
            isVisible={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />
          <EditRegistrationModal
            registration={selectedRegistration}
            isVisible={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};