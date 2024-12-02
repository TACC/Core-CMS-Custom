import React from 'react'
import { RegistrationList } from './RegistrationList'
import {useSubmitterRegistrations} from 'hooks/registrations'

export const UserRegistrations: React.FC = () => {
    return (
        <RegistrationList isAdmin={false} useDataHook={useSubmitterRegistrations}/>
    )
}