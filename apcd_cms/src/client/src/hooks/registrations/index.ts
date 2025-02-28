export type RegFormData = {
  registration_data: RegistrationContent;
  renew: boolean;
};

export { useRegFormData, usePostRegistration } from './useForm';

export type StringMap = {
  [key: string]: boolean;
};

export type RegistrationEntity = {
  claim_val: string;
  ent_id: number;
  claim_and_enc_vol: string;
  license: string | null | undefined;
  naic: string | null | undefined;
  no_covered: number;
  ent_name: string;
  fein: string | null | undefined;
  plans_type: StringMap;
  files_type: StringMap;
};

export type RegistrationContact = {
  cont_id: number;
  notif: string;
  role: string;
  name: string;
  phone: string;
  email: string;
};

export type RegistrationContent = {
  reg_id: number;
  biz_name: string;
  type: string | null | undefined;
  city: string;
  state: string;
  address: string;
  zip: number;
  for_self: string | null | undefined;
  year: number;
  status: string;
  entities: RegistrationEntity[];
  contacts: RegistrationContact[];
  org_types: StringMap;
  us_state_list: string[];
};

export type RegistrationRow = {
  biz_name: string;
  year: string;
  type: string;
  location: string;
  reg_status: string;
  reg_id: number;
};

export type RegistrationResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  selected_org: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: RegistrationRow[];
  page_num: number;
  total_pages: number;
};

export type RegistrationFormValues = {
  on_behalf_of: string;
  reg_year: string;
  type: string;
  business_name: string;
  mailing_address: string;
  city: string;
  state: string;
  zip_code: string;
  reg_id?: number;
  reg_status?: string;
  entities: {
    entity_name: string;
    fein: string;
    license_number: string;
    naic_company_code: string;
    types_of_plans_commercial: boolean;
    types_of_plans_medicare: boolean;
    types_of_plans_medicaid: boolean;
    types_of_plans_hidden?: boolean;
    types_of_files_eligibility_enrollment: boolean;
    types_of_files_provider: boolean;
    types_of_files_medical: boolean;
    types_of_files_pharmacy: boolean;
    types_of_files_dental: boolean;
    types_of_files_hidden?: boolean;
    total_covered_lives: any;
    claims_encounters_volume: any;
    total_claims_value: any;
    entity_id?: number;
  }[];
  contacts: {
    contact_type: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    contact_notifications: boolean;
    contact_id?: number;
  }[];
};

export function transformToRegistrationFormValues(
  registration: RegistrationContent,
  renew?: boolean | undefined
): RegistrationFormValues {
  const typeValueMap: Record<string, string> = {
    // to set database value for field rather than display value
    'Insurance Carrier': 'carrier',
    'Plan Administrator¹ (TPA/ASO)': 'tpa_aso',
    'Pharmacy Benefit Manager (PBM)': 'pbm',
  };
  return {
    on_behalf_of: registration.for_self?.toString() ?? '',
    reg_year: (registration.year + (renew ? 1 : 0)).toString(),
    type: registration.type ? typeValueMap[registration.type] : '',
    business_name: registration.biz_name,
    mailing_address: registration.address,
    city: registration.city,
    state: registration.state as string,
    zip_code: registration.zip.toString(),
    reg_id: registration.reg_id,
    reg_status: registration.status,
    entities: registration.entities.map((entity) => ({
      entity_name: entity.ent_name,
      fein: entity.fein ?? '',
      license_number: entity.license ?? '',
      naic_company_code: entity.naic ?? '',
      types_of_plans_commercial: entity.plans_type['Commercial'],
      types_of_plans_medicare: entity.plans_type['Medicare'],
      types_of_plans_medicaid: entity.plans_type['Medicaid'],
      types_of_plans_hidden: false,
      types_of_files_eligibility_enrollment:
        entity.files_type['Eligibility/Enrollment'],
      types_of_files_provider: entity.files_type['Provider'],
      types_of_files_medical: entity.files_type['Medical'],
      types_of_files_pharmacy: entity.files_type['Pharmacy'],
      types_of_files_dental: entity.files_type['Dental'],
      types_of_files_hidden: false,
      total_covered_lives: entity.no_covered,
      claims_encounters_volume: entity.claim_and_enc_vol,
      total_claims_value: entity.claim_val,
      entity_id: entity.ent_id,
    })),
    contacts: registration.contacts.map((contact) => ({
      contact_type: contact.role,
      contact_name: contact.name,
      contact_phone: contact.phone,
      contact_email: contact.email,
      contact_notifications: contact.notif ? true : false,
      contact_id: contact.cont_id,
    })),
  };
}

export {
  useAdminRegistrations,
  useSubmitterRegistrations,
  useSubmitterRegistration,
  useAdminRegistration,
} from './useRegistrations';
