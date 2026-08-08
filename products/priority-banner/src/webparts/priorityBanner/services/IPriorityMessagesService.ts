import type { IPriorityMessage } from '../models/IPriorityMessage';
import type { IPriorityListConfiguration } from '../models/PriorityListStatus';

export interface IPriorityMessagesService {
  readonly listUrl: string;
  createStandardList(displayTitle: string, description: string): Promise<void>;
  getConfiguration(): Promise<IPriorityListConfiguration>;
  getMessages(): Promise<IPriorityMessage[]>;
  repairStandardList(displayTitle: string, description: string): Promise<void>;
}
