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

export type UserRow = {
  user_id: string;
  user_email: string;
  user_name: string;
  entity_name: string;
  role_name: string;
  status: string;
  user_number: string;
  created_at: string;
  updated_at: string;
  notes: string;
}

export type UserResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: UserRow[];
};

export type SubmissionRow = {
  submission_id: string;
  submitter_id: string;
  entity_name: string;
  file_name: string;
  status: string;
  outcome: string;
  received_timestamp: string;
  updated_at: string;
  view_modal_content: SubmissionLogsModalContent[];
};

export type SubmissionResult = {
  header: string[];
  status_options: string[];
  filter_options: string[];
  sort_options: { name: string; value: string }[];
  selected_status: string;
  selected_sort: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: SubmissionRow[];
  page_num: number;
  total_pages: number;
};

export type SubmissionLogsModalContent = {
  log_id: string;
  entity_name: string;
  file_type: string;
  validation_suite: string;
  outcome: string;
};

export type ExtensionRow = {
  created: string;
  org_name: string;
  requestor: string;
  type: string;
  ext_outcome: string;
  ext_status: string;
  ext_id: string;
  submitter_id: string;
  approved_expiration_date: string;
};

export type ExtensionResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: ExtensionRow[];
};

export type ExceptionRow = {
  created_at: string;
  entity_name: string;
  requestor_name: string;
  requestor_type: string;
  outcome: string;
  status: string;
  exception_id: string;
};

export type ExceptionResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  selected_org: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: ExceptionRow[];
};

export {
  useExtensions,
  useRegistrations,
  useSubmissions,
  useUsers,
  useExceptions,
} from './useAdmin';
