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
};

export type UserResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: UserRow[];
  page_num: number;
  total_pages: number;
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

export type ExceptionModalContent = {
  created_at: string;
  entity_name: string;
  requestor_name: string;
  requestor_email: string;
  request_type: string;
  status: string;
  outcome: string;
  data_file_name: string;
  field_number: string;
  required_threshold: string;
  requested_threshold: string;
  approved_threshold: string;
  requested_expiration_date: string;
  approved_expiration_date: string;
  explanation_justification: string;
  notes: string;
  updated_at: string;
  exception_id: string;
};

export type ExceptionRow = {
  created_at: string;
  entity_name: string;
  requestor_name: string;
  request_type: string;
  requested_threshold: string;
  outcome: string;
  status: string;
  approved_threshold: string;
  approved_expiration_date: string;
  notes: string;
  exception_id: string;
  view_modal_content: ExceptionModalContent;
};

export type ExceptionResult = {
  header: string[];
  status_options: string[];
  status_modal_options: string[];
  outcome_modal_options: string[];
  org_options: string[];
  selected_status: string;
  selected_org: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: ExceptionRow[];
  page_num: number;
  total_pages: number;
};

export {
  useExtensions,
  useSubmissions,
  useUsers,
  useExceptions,
} from './useAdmin';
