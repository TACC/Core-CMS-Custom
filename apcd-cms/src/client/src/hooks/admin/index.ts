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

export type ExtensionRow = {
  created_at: string;
  entity_name: string;
  requestor_name: string;
  extension_type: string;
  outcome: string;
  status: string;
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

export { useRegistrations, useExtensions } from './useAdmin';
