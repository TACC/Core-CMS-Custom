import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
    Badge,
    InputGroup,
    FormFeedback,
  } from "reactstrap";
import SectionHeader from 'core-components/SectionHeader';
  

export const RegistrationEntity: React.FC = () => {


    return (
        <SectionHeader isNestedHeader={true} isForForm>
            Entity Being Registered
            <small>
                (If single company, enter the same organization as above.)
            </small>
        </SectionHeader>
        
    )
}