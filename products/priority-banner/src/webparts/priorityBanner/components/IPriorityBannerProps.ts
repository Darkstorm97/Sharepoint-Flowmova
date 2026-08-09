import type { BannerLayout } from '../domain/BannerLayout';
import type { PriorityLevel } from '../domain/PriorityLevel';

export interface IPriorityBannerProps {
  actionText?: string;
  actionUrl?: string;
  dismissKey: string;
  dismissLabel: string;
  layout: BannerLayout;
  message?: string;
  priority: PriorityLevel;
  priorityLabel: string;
  showDismiss: boolean;
  title: string;
}
