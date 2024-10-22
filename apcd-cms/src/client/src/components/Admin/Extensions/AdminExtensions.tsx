import React, { useEffect, useState } from 'react';
import { useExtensions, ExtensionRow } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';
import styles from './ExtensionList.module.css';
import ViewExtensionModal from 'apcd-components/Extensions/ViewExtensionModal/ViewExtensionModal';
//import EditExtensionModal from 'apcd-components/Extensions/EditExtensionModal/EditExtensionModal';

export const AdminExtensions: React.FC = () => {
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useExtensions(status, org, page);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  //const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedExtension, setSelectedExtension] =
    useState<ExtensionRow | null>(null);

  const clearSelections = () => {
    setStatus('');
    setOrg('');
    setPage(1);
  };

  useEffect(() => {
    refetch();
  }, [status, org, page, refetch]);

   if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const openAction = (
    event: React.ChangeEvent<HTMLSelectElement>,
    ext_id: string
  ) => {
    const actionsDropdown = event.target;
    const selectedOption = actionsDropdown.value;
    console.log(ext_id);
    setSelectedExtension(
      data?.page.find((x) => x.ext_id === ext_id) ?? null
    );
    if (selectedOption == 'viewExtension') {
      setIsViewModalOpen(true);
    //} else if (selectedOption == 'editRegistration') {
     // setIsEditModalOpen(true);
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
    <table id="extensionTable" className="extension-table">
      <thead>
        <tr>
          {data?.header.map((columnName: string, index: number) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.page.map((row: ExtensionRow, rowIndex: number) => (
          <tr key={rowIndex}>
            <td>{row.created}</td>
            <td>{row.org_name}</td>
            <td>{row.requestor}</td>
            <td>{row.type}</td>
            <td>{row.ext_outcome}</td>
            <td>{row.ext_status}</td>
            <td>{row.approved_expiration_date}</td>
            <td className="modal-cell">
                <select
                  id={`actionsDropdown_${row.ext_id}`}
                  defaultValue=""
                  className="status-filter"
                  onChange={(e) => openAction(e, row.ext_id)}
                >
                <option value="">Select Action</option>
                <option value="viewExtension">View Record</option>
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
        {selectedExtension && (
        <>
          <ViewExtensionModal
            extension={selectedExtension}
            isVisible={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />
        </>
      )}
      </div>
      </div>
  );
};
