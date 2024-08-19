import React, { useState, useEffect } from 'react';
import { useExceptions, ExceptionRow } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import ViewExceptionModal from '../ViewExceptiontionModal/ViewExceptionModal';
import styles from './AdminExceptions.module.css';

export const AdminExceptions: React.FC = () => {
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useExceptions(
    status,
    org,
    page
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedException, setSelectedException] =
    useState<ExceptionRow | null>(null);

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
    return <div>Error loading data</div>;
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    exception_id: string
  ) => {
    const actionsDropdown = event.target;
    const selectedOption = actionsDropdown.value;
    setSelectedException(
      data?.page.find((x) => x.exception_id === exception_id) ?? null
    );
    if (selectedOption == 'viewException') {
      setIsViewModalOpen(true);
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
      <table id="exceptionTable" className="exception-table">
        <thead>
          <tr>
            {data?.header.map((columnName: string, index: number) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.page.map((row: ExceptionRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{row.created_at}</td>
              <td>{row.entity_name}</td>
              <td>{row.requestor_name}</td>
              <td>{row.requestor_type}</td>
              <td>{row.outcome}</td>
              <td>{row.status}</td>
              <td className="modal-cell">
                <select
                  id={`actionsDropdown_${row.exception_id}`}
                  defaultValue=""
                  className="status-filter"
                  onChange={(e) => openAction(e, row.exception_id)}
                >
                  <option value="">Select Action</option>
                  <option value="viewException">View Record</option>
                  <option value="editException">Edit Record</option>
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
      {selectedException && (
        <>
          <ViewExceptionModal
            exception={selectedException}
            isVisible={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};
