export type StringMap = {
  [key: string]: string;
};

export type FileSubmissionRow = {
  submission_id: string;
  submitter_id: string;
  entity_name: string;
  file_name: string;
  status: string;
  outcome: string;
  received_timestamp: string;
  updated_at: string;
  view_modal_content: FileSubmissionLogsModalContent[];
};

export type FileSubmissionResult = {
  header: string[];
  selected_status: string;
  selected_sort: string;
  query_str: string;
  pagination_url_namespaces: string;
  page: FileSubmissionRow[];
  page_num: number;
  total_pages: number;
};

export type FileSubmissionLogsModalContent = {
  log_id: string;
  submission_id: string;
  entity_name: string;
  file_type: string;
  validation_suite: string;
  outcome: string;
};

export { useListSubmissions, useSubmissionFilters } from './useSubmissions';
