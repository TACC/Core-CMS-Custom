export type cdl = {
  field_list_code: string;
  field_list_value: string;
  threshold_value: number;
};

export type cdlObject = {
  cdls: cdl[];
};

export { useCDLs } from './useCDLs';
