import React, { useState } from 'react';
import { UserRow, useUsers, useUserFilters } from 'hooks/admin';
import ViewRecordModal from './ViewRecordModal';
import EditRecordModal from './EditRecordModal';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import styles from './ViewUsers.module.scss';
import Button from 'core-components/Button';

export const ViewUsers: React.FC = () => {
  const header = [
    'User ID',
    'Name',
    'Entity Organization',
    'Role',
    'Status',
    'User Number',
    'Actions',
  ];
  const {
    data: filterData,
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useUserFilters();
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useUsers(status, org, page);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const clearSelections = () => {
    setStatus('All');
    setOrg('All');
    setPage(1);
  };

  const handleActionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    user: UserRow
  ) => {
    const action = event.target.value;
    setSelectedUser(user);
    setDropdownValue('');
    if (action === 'view') {
      setViewModalOpen(true);
      setEditModalOpen(false);
    } else if (action === 'edit') {
      setEditModalOpen(true);
      setViewModalOpen(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (userData?.total_pages ?? 1)) {
      setPage(newPage);
    }
  };

  const handleEditSuccess = (updatedUser: UserRow) => {
    // Refresh user data after editing is successful
    refetch();
    setEditModalOpen(false);
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  if (isFilterLoading || isLoading) {
    return (
      <div className="loading-placeholder">
        <LoadingSpinner />
      </div>
    );
  }

  if (isFilterError || isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>View Users</h1>
      <hr />
      <p style={{ marginBottom: '30px' }}>View submitted users.</p>
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {filterData?.status_options.map((status, index) => (
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
              className="org-filter"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            >
              {filterData?.org_options.map((org, index) => (
                <option className="dropdown-text" key={index} value={org}>
                  {org}
                </option>
              ))}
            </select>
            {status !== 'All' || org !== 'All' ? (
              <Button onClick={clearSelections}>Clear Options</Button>
            ) : null}
        </div>
      </div>
      <div>
        <table id="viewUserTable" className="users-table">
          <thead>
            <tr>
              {header.map((columnName: string, index: number) => (
                <th key={index}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData?.page.map((user: UserRow, rowIndex: number) => (
              <tr key={rowIndex}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.entity_name}</td>
                <td>{user.role_name}</td>
                <td>{user.status}</td>
                <td>{user.user_number}</td>
                <td>
                  <select
                    onChange={(event) => handleActionChange(event, user)}
                    value={dropdownValue}
                  >
                    <option value="" disabled>
                      Select Action
                    </option>
                    <option value="view">View Record</option>
                    <option value="edit">Edit Record</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginatorContainer}>
        <Paginator
          pages={userData?.total_pages ?? 0}
          current={userData?.page_num ?? 1}
          callback={handlePageChange} // Pass setPage as the callback function
        />
      </div>
      {selectedUser && viewModalOpen && (
        <ViewRecordModal
          isOpen={viewModalOpen}
          toggle={closeModal}
          user={selectedUser}
        />
      )}
      {selectedUser && editModalOpen && (
        <EditRecordModal
          isOpen={editModalOpen}
          toggle={closeModal}
          user={selectedUser}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default ViewUsers;
