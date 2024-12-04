import React, { useState } from 'react';
// import { UserRow, useUsers, useUserFilters } from 'hooks/admin';
import { SubmitterUserRow, useSubmitterUsers } from 'hooks/admin';
// import ViewRecordModal from './ViewRecordModal';
// import EditRecordModal from './EditRecordModal';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import styles from './ViewSubmitterUsers.module.scss';
import Button from 'core-components/Button';

export const ViewSubmitterUsers: React.FC = () => {
    // Establishes the headers for each column of the table
    const header = [
        'Submitter ID',
        'User ID',
        'User Number',
        'User Email',
        'User Name',
        'Payor Code',
        'Actions',
    ];

    // Sets user filters to prepare to get data
    // const {
    //     data: filterData,
    //     isLoading: isFilterLoading,
    //     isError: isFilterError,
    // } = useSubmitterUserFilters();

    // Sets the initial state of status, org, and page of the table
    // const [status, setStatus] = useState('All');
    // const [org, setOrg] = useState('All');
    const [page, setPage] = useState(1);
    
    // Actually retrieves the data based on useUserFilters()?
    const {
        data: submitterUserData,
        isLoading,
        isError,
        refetch,
    } = useSubmitterUsers(page);

    // Sets the state for open modals, dropdowns, and selected users
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SubmitterUserRow | null>(null);
    const [dropdownValue, setDropdownValue] = useState<string>('');

    // Function to clear all filters set by dropdowns
    const clearSelections = () => {
        // setStatus('All');
        // setOrg('All');
        setPage(1);
    };

    // Opens modals based on a selected user
    const handleActionChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        user: SubmitterUserRow
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

    // Goes to the page number selected if there's more than 1
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (submitterUserData?.total_pages ?? 1)) {
          setPage(newPage);
        }
    };

    // Refresh user data after editing is successful
    const handleEditSuccess = (updatedUser: SubmitterUserRow) => {
        // Refresh user data after editing is successful
        refetch();
        setEditModalOpen(false);
    };

    // Handles the closing of modals
    const closeModal = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
        setSelectedUser(null);
    };

    // Displays LoadingSpinner when the page is loading
    if (isLoading) {
        return (
          <div className="loading-placeholder">
            <LoadingSpinner />
          </div>
        );
    }

    // Displays an error message if an error happens when loading data
    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div>
            <h1>View Submitter Users</h1>
            <hr />
            <p style={{ marginBottom: '30px' }}>View all submitter users.</p>
            <hr />
            <div>
                <table id="viewSubmitterUserTable" className="submitter-users-table">
                <thead>
                    <tr>
                    {header.map((columnName: string, index: number) => (
                        <th key={index}>{columnName}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {submitterUserData?.page && submitterUserData.page.length > 0 ? (
                    submitterUserData?.page.map((user: SubmitterUserRow, rowIndex: number) => (
                        <tr key={rowIndex}>
                        <td>{user.submitter_id}</td>
                        <td>{user.user_id}</td>
                        <td>{user.user_number}</td>
                        <td>{user.user_email}</td>
                        <td>{user.user_name}</td>
                        <td>{user.payor_code}</td>
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
            </div>
            <div className={styles.paginatorContainer}>
                <Paginator
                pages={submitterUserData?.total_pages ?? 0}
                current={submitterUserData?.page_num ?? 1}
                callback={handlePageChange} // Pass setPage as the callback function
                />
            </div>
            {/* {selectedUser && viewModalOpen && (
                <ViewRecordModal
                isOpen={viewModalOpen}
                toggle={closeModal}
                user={selectedUser}
                />
            )} */}
            {/* {selectedUser && editModalOpen && (
                <EditRecordModal
                isOpen={editModalOpen}
                toggle={closeModal}
                user={selectedUser}
                onEditSuccess={handleEditSuccess}
                />
            )} */}
    </div>
    );
};

export default ViewSubmitterUsers;