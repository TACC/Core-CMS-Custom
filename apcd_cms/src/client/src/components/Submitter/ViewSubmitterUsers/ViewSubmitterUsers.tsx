import React, { useState } from 'react';
import { SubmitterUserRow, useSubmitterUsers } from 'hooks/admin';
import ViewRecordModal from './ViewRecordModal';
import EditRecordModal from './EditRecordModal';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import styles from './ViewSubmitterUsers.module.scss';

export const ViewSubmitterUsers: React.FC = () => {
    const header = [
        'Submitter ID',
        'User ID',
        'User Number',
        'User Email',
        'User Name',
        'Payor Code',
        'Actions',
    ];

    const [page, setPage] = useState(1);
    
    const {
        data: submitterUserData,
        isLoading,
        isError,
        refetch,
    } = useSubmitterUsers(page);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SubmitterUserRow | null>(null);
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const clearSelections = () => {
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

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (submitterUserData?.total_pages ?? 1)) {
          setPage(newPage);
        }
    };

    const handleEditSuccess = (updatedUser: SubmitterUserRow) => {
        // Refresh user data after editing is successful
        refetch();
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

export default ViewSubmitterUsers;