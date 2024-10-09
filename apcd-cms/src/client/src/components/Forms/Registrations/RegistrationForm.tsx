import React from 'react';
import { FormField } from 'core-components/Form';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { useFormData } from 'hooks/registrations';
import USStates from './USStates.fixture';
import SectionHeader from 'core-components/SectionHeader';
import { TextFormField } from './TextFormField';

/*const TextFormField: React.FC<{name: string; label: string; helpText?: string; touched: any; errors: any;}> = ({name, label, helpText, touched, errors}) => {
    return (
        <FormGroup>
        <Label for={name}>{label}</Label>
        <InputGroup>
            <Field name={name}>
            {({ field }: { field: any }) => (
                <Input
                    type="text"
                    id={name}
                    className='textinput'
                    {...field}
                    invalid={touched[name] && !!errors[name]}
                />
            )}
            </Field>
            <ErrorMessage
                name={name}
                component={FormFeedback}
            />
        </InputGroup>
        { helpText ? 
            <FormText className='help-text'>
                {helpText}
            </FormText>
            : <></>
        }
        </FormGroup>
    )
};*/

export const RegistrationForm: React.FC = () => {
    const { data, isLoading, isError } = useFormData({});

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isError) {
        return <div>Error loading form</div>;
    }

    interface FormValues {
        on_behalf_of?: undefined;
        reg_year: string;
        type?: undefined;
        business_name: string;
        mailing_address: string;
        city: string;
        state?: undefined;
        zip_code: string;
    };
      
    const initialValues: FormValues = {
        reg_year: '',
        business_name: '',
        mailing_address: '',
        city: '',
        zip_code: ''
    };

    const initialTouched = {
        reg_year: true,
        business_name: true,
        mailing_address: true,
        city: true,
        zip_code: true
    };
      
    
    return (
        <div className="container mt-5">
            <Formik
                validateOnMount
                initialValues={initialValues}
                initialTouched={initialTouched}
            >
                {({ errors, touched }) => (
                <Form>
                    <SectionHeader isNestedHeader={false} isForForm>
                        Organization
                    </SectionHeader>
                    <FormGroup tag="fieldset" id="on_behalf_of">
                        <legend>
                            On Behalf Of Foo:
                        </legend>
                        <FormGroup check className="radioselect">
                            <Label check>
                                <Input
                                    name="on_behalf_of"
                                    id="on_behalf_of"
                                    type="radio"
                                    className="radioselect"
                                    />
                                    {' '}Self
                            </Label>
                        </FormGroup>
                        <FormGroup check className="radioselect">
                            <Input
                                name="on_behalf_of"
                                id="on_behalf_of"
                                type="radio"
                                className="radioselect"
                            />
                            {' '}
                            <Label check>
                                Other
                            </Label>
                        </FormGroup>
                    </FormGroup>

                    <TextFormField 
                        name="reg_year"
                        label="Registration Year"
                        helpText="Enter the registration year. Must be 2023 or later."
                        touched={touched}
                        errors={errors}
                    />

                    <FormGroup>
                        <Label for="type">Type</Label>
                        <InputGroup>
                            <Field name="type">
                            {({ field }: { field: any }) => (
                                <Input
                                    type="select"
                                    id="type"
                                    className="choicefield"
                                    {...field}
                                    invalid={touched.type && !!errors.type}
                                >
                                    <option value="carrier">Insurance Carrier</option>
                                    <option value="tpa_aso">
                                        Plan Administrator¹ (TPA/ASO)
                                    </option>
                                    <option value="pbm">
                                        Pharmacy Benefit Manager (PBM)
                                    </option>
                                </Input>
                            )}
                            </Field>
                            <ErrorMessage
                                name="type"
                                component={FormFeedback}
                            />
                        </InputGroup>
                    </FormGroup>

                    <TextFormField 
                        name="business_name"
                        label="Business Name"
                        touched={touched}
                        errors={errors}
                    />

                    <TextFormField 
                        name="mailing_address"
                        label="Mailing Address"
                        touched={touched}
                        errors={errors}
                    />

                    <TextFormField 
                        name="city"
                        label="City"
                        touched={touched}
                        errors={errors}
                    />

                    <FormGroup>
                        <Label for="state">Type</Label>
                        <InputGroup>
                            <Field name="state">
                            {({ field }: { field: any }) => (
                                <Input
                                    type="select"
                                    id="state"
                                    className="choicefield"
                                    {...field}
                                    invalid={touched.type && !!errors.type}
                                >
                                    {USStates.map((USState) => (
                                        <option value={USState.value}>{USState.label}</option>
                                    ))}
                                </Input>
                            )}
                            </Field>
                            <ErrorMessage
                                name="type"
                                component={FormFeedback}
                            />
                        </InputGroup>
                    </FormGroup>

                    <TextFormField 
                        name="zip_code"
                        label="ZIP Code"
                        touched={touched}
                        errors={errors}
                    />
                </Form>
                )}
            </Formik>
        </div>
    );
};