import React, { useEffect, useMemo, useState } from 'react';
import { useRegistrations, RegistrationResult, RegistrationRow } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';


export const AdminRegistrations: React.FC<RegistrationResult> = () => {
  const [status, setStatus] = useState('All');
  const [org, setOrg] = useState('All');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch} = useRegistrations(status, org, page);


  if (isLoading) {
    return (
      <div className='loading-placeholder'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  useEffect(() => {
    refetch();
  }, [status, org, page, refetch]);

  const clearSelections = () => {
    setStatus('');
    setOrg('');
    setPage(1);
  };

  const openAction = (reg_id: string) => {
    var actionsDropdown, selectedOption, modal_id;
    actionsDropdown = document.getElementById(`actionsDropdown_${reg_id}`);
    /* grabs dropdown option number selected by user via selectedIndex, 
      then grabs actual value associated with that option via 
      options[index].value */
    selectedOption = actionsDropdown.options[actionsDropdown.selectedIndex].value;
    modal_id = `${selectedOption}Modal_${reg_id}`;
    $(`#${modal_id}`).modal({backdrop: "static"}); /* modal appears manually */
    actionsDropdown.selectedIndex = 0; /* resets dropdown to display 'Select Action' again */
  }

  return (
    <div>
      <div>
        </div>
        <div className="filter-container">
          <div className="filter-content">
            {/* Filter */}
            <span><b>Filter by Status: </b></span>
            <select id="statusFilter" className="status-filter" 
              onChange={(e) => setStatus(e.target.value)} >

              {data?.status_options.map((status, index) => (
                <option className="dropdown-text" key={index} value={status} selected={status === data?.selected_status}>
                  {status}
                </option>
              ))}
            </select>
            <span><b>Filter by Organization: </b></span>
            <select id="organizationFilter" className="status-filter org-filter" onChange={(e) => setOrg(e.target.value)} >
              {data?.org_options.map((org, index) => (
                  <option className="dropdown-text" key={index} value={org} selected={org === data?.selected_org}>
                    {org}
                  </option>
              ))}
            </select>

            {data?.selected_status || data?.selected_org ? (
              <button onClick={clearSelections}>Clear Options</button>
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
          {data?.page.map((row: RegistrationRow, rowIndex: number) => (
            <tr key={rowIndex}>
              <td>{row.biz_name}</td>
              <td>{row.year}</td>
              <td>{row.type}</td>
              <td>{row.location}</td>
              <td>{row.reg_status}</td>
              <td>
                    {% include "view_registration_modal.html" %}
                    {% include "edit_registration_modal.html" %}
                    <select id='actionsDropdown_{{r.reg_id}}' class='status-filter' onchange="openAction('{{r.reg_id}}')">
                      <option value="">Select Action</option>
                      <option value="viewRegistration">View Record</option>
                      <option value="editRegistration">Edit Record</option>
                    </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* Pagination */}
        <Paginator pages={data?.total_pages??0} current={data?.page_num??0} callback={setPage} />
      </div>
    </div>
  );
};
