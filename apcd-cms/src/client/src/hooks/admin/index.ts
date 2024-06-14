export type RegistrationRow = {
  biz_name: string;
  year: string;
  type: string;
  location: string;
  reg_status: string;
  reg_id: string;
};

export type RegistrationResult = {
  header: string[];
  status_options: string[];
  org_options: string[];
  selected_status: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: RegistrationRow[];
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
}

export type SubmissionResult = {
  header: string[];
  status_options: string[];
  filter_options: string[];
  sort_options: { name: string; value: string }[]
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
}

export { useRegistrations, useSubmissions } from './useAdmin';
