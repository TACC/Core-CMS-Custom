import React, { useEffect, useMemo, useState } from 'react';
import { RegistrationRow, RegistrationModalContent, RegistrationEntity, RegistrationContact, StringMap } from 'hooks/admin';
import LoadingSpinner from 'core-components/LoadingSpinner';
import Paginator from 'core-components/Paginator';

export const ViewRegistrationModal: React.FC<RegistrationRow> = ({reg_id, view_modal_content}) => {
    return (
        <div id={`viewRegistrationModal_${reg_id}`} className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">

        <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title">View Registration</h4>
            <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&#xe912;</span>
            </button>
        </div>
        <div className="modal-body">
            <div>
            <dl>
                <h4>Organization</h4>
                <dd>          
                <dl className="c-data-list--is-vert c-data-list--is-wide">
                    <dt className="c-data-list__key">On behalf of</dt>
                    <dd className="c-data-list__value">
                        {view_modal_content.for_self? "Self": "Other"}
                    </dd>
                    <dt className="c-data-list__key">Registration Year</dt>
                    <dd className="c-data-list__value">{view_modal_content.year}</dd>                       
                    <dt className="c-data-list__key">Type</dt>
                    <dd className="c-data-list__value">{view_modal_content.type}</dd>                       
                    <dt className="c-data-list__key">Business Name</dt>                
                    <dd className="c-data-list__value">{view_modal_content.biz_name}</dd>
                    <dt className="c-data-list__key">Mailing Address</dt>                
                    <dd className="c-data-list__value">{view_modal_content.address}</dd>
                    <dd className="c-data-list__value">{view_modal_content.city}, {view_modal_content.state}</dd>
                    <dd className="c-data-list__value">{view_modal_content.zip}</dd>
                </dl>
                </dd>
                <hr />
                <h4>Entity/Entities Being Registered</h4>
                <dd>
                    {view_modal_content.entities.map((entity, index) => (
                    <React.Fragment>
                    <h5>Entity {index}</h5>
                    <dl className="c-data-list--is-vert c-data-list--is-wide">
                    <dt className="c-data-list__key">Name</dt>
                    <dd className="c-data-list__value">{entity.ent_name}</dd>                                 
                    <dt className="c-data-list__key">FEIN</dt>
                    <dd className="c-data-list__value">{entity.fein}</dd>
                    <dt className="c-data-list__key">License Number</dt>
                    <dd className="c-data-list__value">{entity.license}</dd>
                    <dt className="c-data-list__key">NAIC Company Code</dt>
                    <dd className="c-data-list__value">{entity.naic}</dd>
                    <h6>Type of Plan</h6>
                    <dd>
                        <dl className="c-data-list--is-vert c-data-list--is-wide">
                        <dt className="c-data-list__key">Types of Plans</dt>
                        {Object.entries(entity.plans_type).map(([plan_type, plan_type_selected]) => {
                            if (plan_type_selected) {
                                return (
                                <dd className="c-data-list__value">
                                    {plan_type}
                                </dd>
                                );
                            } else {
                                return null;
                            }
                            })}

                        </dl>
                    </dd>
                    <h6>File Submission</h6>
                    <dd>
                        <dl className="c-data-list--is-vert c-data-list--is-wide">
                        <dt className="c-data-list__key">Types of Files</dt>
                        {Object.entries(entity.files_type).map(([file_type, file_type_selected]) => {
                            if (file_type_selected) {
                                return (
                                <dd className="c-data-list__value">
                                    {file_type}
                                </dd>
                                );
                            } else {
                                return null;
                            }
                            })}
                        </dl>
                    </dd>
                    <h6>Coverage Estimates <small>(Inclusive of all claims as of December 31 of previous year.)</small></h6>
                    <dt className="c-data-list__key">Total Covered Lives</dt>
                    <dd className="c-data-list__value">{{entity.no_covered}}</dd>
                    <dt className="c-data-list__key">Claims and Encounters Volume</dt>
                    <dd className="c-data-list__value">{{entity.claim_and_enc_vol}}</dd>
                    <dt className="c-data-list__key">Total Claims Value (USD)</dt>
                    <dd className="c-data-list__value">{{entity.claim_val}}</dd>
                    </dl>
                    </React.Fragment>
                    ))};
                </dd>             
                <hr />
                <h4>Contact Information</h4>
                <dd>
                {view_modal_content.contacts.map((contact, index) => (
                    <React.Fragment key={index}>
                        <h5>Contact {index}</h5>
                        <dl className="c-data-list--is-vert c-data-list--is-wide">
                        <dt className="c-data-list__key">Role</dt>
                        <dd className="c-data-list__value">{contact.role}</dd>
                        <dt className="c-data-list__key">Name</dt>
                        <dd className="c-data-list__value">{contact.name}</dd>
                        <dt className="c-data-list__key">Phone</dt>
                        <dd className="c-data-list__value">{contact.phone}</dd>
                        <dt className="c-data-list__key">Email</dt>
                        <dd className="c-data-list__value">{contact.email}</dd>
                        <dt> 
                            <i>
                            Should
                            {!contact.notif && <strong>not</strong>}
                            receive system notifications
                            </i>
                        </dt>
                        </dl>
                    </React.Fragment>
                    ))}
                </dd>
            </dl>
            </div>
        </div>
        </div>
  </div>
</div>)};