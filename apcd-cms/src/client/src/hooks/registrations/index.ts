export type RegFormData = {
  registration_data: RegistrationRow;
  renew: boolean;
};

export { useRegFormData } from './useForm';

export type StringMap = {
  [key: string]: string;
};

export type RegistrationEntity = {
  claim_val: string;
  ent_id: string;
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
  cont_id: string;
  notif: string;
  role: string;
  name: string;
  phone: string;
  email: string;
};

export type RegistrationModalContent = {
  biz_name: string;
  type: string | null | undefined;
  city: string;
  state: string;
  address: string;
  zip: number;
  for_self: string | null | undefined;
  year: number;
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
  reg_id: string;
  view_modal_content: RegistrationModalContent;
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

export {
  useAdminRegistrations,
  useSubmitterRegistrations,
} from './useRegistrations';
