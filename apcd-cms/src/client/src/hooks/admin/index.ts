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
  current_expected_date: string;
  requested_target_date: string;
  applicable_data_period: string;
  updated_at: string;
  submitter_code: string;
  payor_code: string;
  requestor_email: string;
  explanation_justification: string;
  notes: string;
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
  useSubmissions,
  useUsers,
  useExceptions,
} from './useAdmin';
