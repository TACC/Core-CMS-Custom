import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserRow, UserResult } from 'hooks/admin';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewRecordModal from './ViewRecordModal';  
import EditRecordModal from './EditRecordModal';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import styles from './ViewUsers.module.scss';  // Import SCSS module

export const ViewUsers: React.FC = () => {
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [userData, setUserData] = useState<UserResult | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const [page, setPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptionsAndData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dropdown options
        const optionsResponse = await axios.get('/administration/view-users/api/options');
        setStatusOptions(optionsResponse.data.status_options || []);
        setFilterOptions(optionsResponse.data.org_options || []);

        const queryParams = new URLSearchParams(location.search);
        const statusParam = queryParams.get('status') || 'All';
        const orgParam = queryParams.get('org') || 'All';

        // Fetch initial user data
        await fetchData(statusParam, orgParam, page);

        // Update state with URL params
        setStatus(statusParam);
        setOrg(orgParam);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionsAndData();
  }, [location.search, page]);

  const fetchData = async (statusFilter: string, orgFilter: string, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
  
      // Fetch filtered user data with pagination
      const userResponse = await axios.get('/administration/view-users/api/', {
        params: { status: statusFilter, org: orgFilter, page: page },  
      });
      setUserData(userResponse.data.response);
    } catch (err) {
      setError('Error fetching filtered data');
      console.error('Error fetching filtered data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const updateURL = (newStatus: string, newOrg: string) => {
    const queryParams = new URLSearchParams();
    if (newStatus !== 'All') queryParams.set('status', newStatus);
    if (newOrg !== 'All') queryParams.set('org', newOrg);
    navigate({ search: queryParams.toString() });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    updateURL(newStatus, org);
  };

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrg = event.target.value;
    setOrg(newOrg);
    updateURL(status, newOrg);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, user: UserRow) => {
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
    fetchData(status, org, page);
    setEditModalOpen(false);
  };

  const closeModal = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedUser(null);
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

  return (
    <div className="container">
      <h1>View Users</h1>
      <hr />
      <p style={{ marginBottom: '30px' }}>View submitted users.</p>
      <hr />
      <div className="filter-container">
        <div className="filter-content">
          <span>
            <b>Filter by Status: </b>
          </span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status}
            onChange={handleStatusChange}
          >
            {statusOptions.length > 0 ? (
              statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
          <span>
            <b>Filter by Organization: </b>
          </span>
          <select
            id="organizationFilter"
            className="status-filter"
            value={org}
            onChange={handleOrgChange}
          >
            {filterOptions.length > 0 ? (
              filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
          {(status !== 'All' || org !== 'All') && (
            <button
              onClick={() => {
                setStatus('All');
                setOrg('All');
                fetchData('All', 'All');
              }}
            >
              Clear Options
            </button>
          )}
        </div>
      </div>
      <div>
        <table id="viewUserTable" className="view-user-table">
          <thead>
            <tr>
              {userData?.header.map((columnName: string, index: number) => (
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
                    <option value="" disabled>Select Action</option>
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
          callback={handlePageChange}  // Pass setPage as the callback function          
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
