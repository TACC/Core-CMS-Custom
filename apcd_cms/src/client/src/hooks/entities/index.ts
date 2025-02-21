export type SubmitterEntityData = {
  submitters: Entities[];
};

export type Entities = {
  submitter_id: number;
  submitter_code: string;
  payor_code: number;
  user_id: string;
  entity_name: string;
  org_name: string;
};

export type ApplicableDataPeriod = {
  data_period: string;
  expected_date: string;
};

export type SubmitterDataPeriods = {
  data_periods: ApplicableDataPeriod[];
};

export { useEntities, useSubmitterDataPeriods } from './useEntities';
