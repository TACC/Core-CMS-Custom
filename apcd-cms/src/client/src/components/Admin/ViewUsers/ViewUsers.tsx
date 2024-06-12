import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserRow, UserResult } from 'hooks/admin';

export const ViewUsers: React.FC = () => {
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [userData, setUserData] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptionsAndData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dropdown options
        const optionsResponse = await axios.get('/administration/view-users/api/options/');
        setStatusOptions(optionsResponse.data.response.status_options || []);
        setFilterOptions(optionsResponse.data.response.org_options || []);

        // Fetch initial user data
        fetchData('All', 'All');
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionsAndData();
  }, []);

  const fetchData = async (statusFilter: string, orgFilter: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch filtered user data
      const userResponse = await axios.get('/administration/view-users/api/', {
        params: { status: statusFilter, org: orgFilter },
      });
      console.log('User response:', userResponse.data); // Log the response to debug
      setUserData(userResponse.data.response);

    } catch (err) {
      setError('Error fetching filtered data');
      console.error('Error fetching filtered data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    fetchData(newStatus, org);
  };

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrg = event.target.value;
    setOrg(newOrg);
    fetchData(status, newOrg);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
    const action = event.target.value;
    if (action === 'view') {
      window.location.href = `/administration/view-user-details/${userId}`;
    } else if (action === 'edit') {
      window.location.href = `/administration/edit-user/${userId}`;
    }
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
                  <select onChange={(event) => handleActionChange(event, user.user_id)} defaultValue="">
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
    </div>
  );
};

export default ViewUsers;
