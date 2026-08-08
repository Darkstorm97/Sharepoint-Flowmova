export type PriorityListStatus = 'ready' | 'missing' | 'repairable' | 'incompatible';

export interface IPriorityListConfiguration {
  incompatibleFields: string[];
  listUrl: string;
  missingFields: string[];
  status: PriorityListStatus;
}
