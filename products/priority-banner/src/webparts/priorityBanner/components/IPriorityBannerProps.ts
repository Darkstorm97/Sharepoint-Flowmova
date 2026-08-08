import type { PriorityLevel } from '../domain/PriorityLevel';

export interface IPriorityBannerProps {
  priority: PriorityLevel;
  priorityLabel: string;
  title: string;
  message: string;
}
