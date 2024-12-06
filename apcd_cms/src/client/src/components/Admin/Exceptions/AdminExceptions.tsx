import React, { useState, useEffect } from 'react';
import { useExceptions, ExceptionRow } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import ViewExceptionModal from '../ViewExceptionModal/ViewExceptionModal';
import EditExceptionModal from '../EditExceptionModal/EditExceptionModal';
import styles from './AdminExceptions.module.css';
import { formatDate } from 'utils/dateUtil';
import { ClearOptionsButton } from 'apcd-components/ClearOptionsButton';

export const AdminExceptions: React.FC = () => {
  const [status, setStatus] = useState('Pending');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useExceptions(
    status,
    org,
    page
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const [selectedException, setSelectedException] =
    useState<ExceptionRow | null>(null);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    setPage(1);
  }, [status, org]);

  const clearSelections = () => {
    setStatus('Pending');
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
    return <div>Error loading data</div>;
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    exception: ExceptionRow
  ) => {
    const selectedOption = event.target.value;
    setSelectedException(exception);
    setDropdownValue('');
    if (selectedOption == 'viewException') {
      setIsViewModalOpen(true);
    } else if (selectedOption == 'editException') {
      setIsEditModalOpen(true);
    }
  };

  const closeAction = () => {
    refetch();
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
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
              value={status}
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
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            >
              {data?.org_options.map((org, index) => (
                <option className="dropdown-text" key={index} value={org}>
                  {org}
                </option>
              ))}
            </select>
            {status !== 'Pending' || org !== 'All' ? (
              <ClearOptionsButton onClick={clearSelections} />
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
          {data?.page && data.page.length > 0 ? (
            data?.page.map((row: ExceptionRow, rowIndex: number) => (
              <tr key={rowIndex}>
                <td>{formatDate(row.created_at)}</td>
                <td>{row.entity_name}</td>
                <td>{row.requestor_name}</td>
                <td>{row.request_type}</td>
                <td>{row.outcome}</td>
                <td>{row.status}</td>
                <td className="modal-cell">
                  <select
                    id={`actionsDropdown_${row.exception_id}`}
                    value={dropdownValue}
                    className="status-filter"
                    onChange={(e) => openAction(e, row)}
                  >
                    <option value="">Select Action</option>
                    <option value="viewException">View Record</option>
                    <option value="editException">Edit Record</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>
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
      {selectedException && (
        <>
          <ViewExceptionModal
            exception={selectedException}
            isOpen={isViewModalOpen}
            onClose={() => closeAction()}
          />
          <EditExceptionModal
            exception={selectedException}
            statusOptions={data?.status_modal_options}
            outcomeOptions={data?.outcome_modal_options}
            isOpen={isEditModalOpen}
            onClose={() => closeAction()}
          />
        </>
      )}
    </div>
  );
};
