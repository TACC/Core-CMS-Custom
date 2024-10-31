export type SubmitterEntityData = {
  submitters: Entities[];
};

export type Entities = {
  submitter_id: number;
  submitter_code: string;
  payor_code: number;
  user_id: string;
  entity_name: string;
};

export { useEntities } from './useEntities';
