import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserRow, UserResult } from 'hooks/admin';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export const ViewUsers: React.FC = () => {
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [userData, setUserData] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptionsAndData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dropdown options
        const optionsResponse = await axios.get('/administration/view-users/api/options');
        console.log("Dropdown options response:", optionsResponse.data);
        setStatusOptions(optionsResponse.data.status_options || []);
        setFilterOptions(optionsResponse.data.org_options || []);

        const queryParams = new URLSearchParams(location.search);
        const statusParam = queryParams.get('status') || 'All';
        const orgParam = queryParams.get('org') || 'All';

        // Fetch initial user data
        await fetchData(statusParam, orgParam);

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
  }, [location.search]);

  const fetchData = async (statusFilter: string, orgFilter: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch filtered user data
      const userResponse = await axios.get('/administration/view-users/api/', {
        params: { status: statusFilter, org: orgFilter },
      });
      console.log("User data fetched:", userResponse.data);
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
    if (action === 'view') {
      console.log("Selected user for view:", user);
      setSelectedUser(user);
      setModalIsOpen(true);
    } else if (action === 'edit') {
      window.location.href = `/administration/edit-user/${user.user_id}`;
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>View Users</h1>
      <hr />
      <p style={{ marginBottom: "30px" }}>View submitted users.</p>
      <hr />
      <div className="filter-container">
        <div className="filter-content">
          <span><b>Filter by Status: </b></span>
          <select
            id="statusFilter"
            className="status-filter"
            value={status}
            onChange={handleStatusChange}
          >
            {statusOptions.length > 0 ? statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            )) : <option>Loading...</option>}
          </select>
          <span><b>Filter by Organization: </b></span>
          <select
            id="organizationFilter"
            className="status-filter"
            value={org}
            onChange={handleOrgChange}
          >
            {filterOptions.length > 0 ? filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            )) : <option>Loading...</option>}
          </select>
          {(status !== 'All' || org !== 'All') && (
            <button onClick={() => { setStatus('All'); setOrg('All'); fetchData('All', 'All'); }}>Clear Options</button>
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
                  <select onChange={(event) => handleActionChange(event, user)} defaultValue="">
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
      {selectedUser && (
        <Modal isOpen={modalIsOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal} style={{ textTransform: 'none' }}>
            Details for User: {selectedUser.user_name} ({selectedUser.user_id})
          </ModalHeader>
          <ModalBody>
            <p><strong>User ID:</strong> {selectedUser.user_id}</p>
            <p><strong>Name:</strong> {selectedUser.user_name}</p>
            <p><strong>User Number:</strong> {selectedUser.user_number}</p>
            <p><strong>Email:</strong> {selectedUser.user_email}</p>
            <p><strong>Entity Organization:</strong> {selectedUser.entity_name}</p>
            <p><strong>Role:</strong> {selectedUser.role_name}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p><strong>Created Date:</strong> {selectedUser.created_at}</p>
            <p><strong>Updated Date:</strong> {selectedUser.updated_at}</p>
            <p><strong>Notes:</strong> {selectedUser.notes}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={closeModal}>Close</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default ViewUsers;
