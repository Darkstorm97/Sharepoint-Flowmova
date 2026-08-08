export type PriorityListStatus = 'ready' | 'missing' | 'incompatible';

export interface IPriorityListConfiguration {
  listUrl: string;
  missingFields: string[];
  status: PriorityListStatus;
}
