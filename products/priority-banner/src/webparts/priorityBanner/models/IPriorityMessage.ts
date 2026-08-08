import type { PriorityLevel } from '../domain/PriorityLevel';

export interface IPriorityMessage {
  actionLabelEn?: string;
  actionLabelFr?: string;
  actionUrl?: string;
  allowDismiss: boolean;
  endDateTime: Date;
  id: number;
  isEnabled: boolean;
  messageEn?: string;
  messageFr?: string;
  modified: Date;
  priority: PriorityLevel;
  startDateTime: Date;
  titleEn?: string;
  titleFr?: string;
}

export interface ILocalizedPriorityMessage {
  actionText?: string;
  actionUrl?: string;
  allowDismiss: boolean;
  id: number;
  message: string;
  priority: PriorityLevel;
  title: string;
}
