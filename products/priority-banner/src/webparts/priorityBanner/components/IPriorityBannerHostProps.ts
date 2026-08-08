import type { BannerLayout } from '../domain/BannerLayout';
import type { PriorityLevel } from '../domain/PriorityLevel';
import type { IPriorityMessagesService } from '../services/IPriorityMessagesService';

export interface IPriorityBannerHostLabels {
  configurationDescription: string;
  configurationTitle: string;
  createButton: string;
  creatingDescription: string;
  creatingTitle: string;
  dismissLabel: string;
  emptyDescription: string;
  emptyTitle: string;
  errorDescription: string;
  errorTitle: string;
  incompatibleDescription: string;
  incompatibleTitle: string;
  listDescription: string;
  listDisplayTitle: string;
  loadingDescription: string;
  loadingTitle: string;
  openListButton: string;
  permissionDescription: string;
  permissionTitle: string;
  priorityLabels: Record<PriorityLevel, string>;
  retryButton: string;
}

export interface IPriorityBannerHostProps {
  labels: IPriorityBannerHostLabels;
  layout: BannerLayout;
  service: IPriorityMessagesService;
  useFrench: boolean;
}
