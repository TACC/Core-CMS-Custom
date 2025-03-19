import React, { useEffect, useState } from 'react';
import { RegistrationRow } from 'hooks/registrations';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import ViewRegistrationModal from 'apcd-components/Registrations/ViewRegistrationModal/ViewRegistrationModal';
import EditRegistrationModal from 'apcd-components/Registrations/EditRegistrationModal/EditRegistrationModal';
import styles from './RegistrationList.module.css';
import { ClearOptionsButton } from 'apcd-components/ClearOptionsButton';
import {
  useAdminRegistration,
  useSubmitterRegistration,
} from 'hooks/registrations';

export const RegistrationList: React.FC<{
  useDataHook: any;
  isAdmin?: boolean;
}> = ({ useDataHook, isAdmin = false }) => {
  const initStateFilter = isAdmin ? 'Received' : ''; // for admin listing, show records w/ status 'Received' by default
  const [status, setStatus] = useState(initStateFilter);
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
    setStatus(initStateFilter);
    setOrg('All');
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
          <a href="/workbench/dashboard/tickets/create" className="wb-link">
            Please submit a ticket.
          </a>
        </p>
        <a className="c-button c-button--primary" href="/">
          Back to Home
        </a>
      </>
    );
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    reg_id: number
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
    } else if (selectedOption == 'renewRegistration') {
      var xhr, url;
      url = `/register/request-to-submit/?reg_id=${reg_id}`;
      xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      window.location.href = url;
    }
    actionsDropdown.selectedIndex = 0;
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-content">
          {/* Filter */}
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {data?.status_options.map((status, index) => (
              <option className="dropdown-text" key={index} value={status}>
                {status}
              </option>
            ))}
          </select>

          <span>
            <b>Filter by Organization: </b>
          </span>
          <select
            id="organizationFilter"
            className="status-filter org-filter"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          >
            {data?.org_options.map((org, index) => (
              <option className="dropdown-text" key={index} value={org}>
                {org}
              </option>
            ))}
          </select>
          {data?.selected_status !== initStateFilter || data?.selected_org ? (
            <ClearOptionsButton onClick={clearSelections} />
          ) : null}
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
          {data?.page && data.page.length > 0 ? (
            data?.page.map((row: RegistrationRow, rowIndex: number) => (
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
                    {isAdmin ? (
                      <option value="editRegistration">Edit Record</option>
                    ) : (
                      <option value="renewRegistration">
                        Renew Registration
                      </option>
                    )}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
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
      </div>
      {selectedRegistration && (
        <>
          <ViewRegistrationModal
            reg_id={selectedRegistration.reg_id}
            isVisible={isViewModalOpen}
            useDataHook={
              isAdmin ? useAdminRegistration : useSubmitterRegistration
            }
            onClose={() => setIsViewModalOpen(false)}
          />
          <EditRegistrationModal
            reg_id={selectedRegistration.reg_id}
            isVisible={isEditModalOpen}
            useDataHook={
              isAdmin ? useAdminRegistration : useSubmitterRegistration
            }
            status_options={data?.status_options as string[]}
            onClose={() => setIsEditModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};
