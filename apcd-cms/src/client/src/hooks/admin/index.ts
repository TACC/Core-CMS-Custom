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

export { useRegistrations } from './useAdmin';

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

export { useExtensions } from './useAdmin';