import type {
  ILocalizedPriorityMessage,
  IPriorityMessage
} from '../models/IPriorityMessage';
import type {
  ISharePointPriorityMessageItem,
  ISharePointUrlValue
} from '../models/ISharePointPriorityMessageItem';
import { PriorityLevel } from './PriorityLevel';

const priorityValues: ReadonlySet<string> = new Set<string>([
  PriorityLevel.Information,
  PriorityLevel.Important,
  PriorityLevel.Urgent,
  PriorityLevel.Critical
]);

export function mapPriorityMessage(item: ISharePointPriorityMessageItem): IPriorityMessage | undefined {
  const id: number = typeof item.ID === 'number' ? item.ID : Number(item.ID);
  const priorityValue: string = typeof item.Priority === 'string' ? item.Priority.toLowerCase() : '';
  const startDateTime: Date = new Date(String(item.StartDateTime || ''));
  const endDateTime: Date = new Date(String(item.EndDateTime || ''));
  const modified: Date = new Date(String(item.Modified || ''));
  const titleFr: string | undefined = toOptionalText(item.TitleFr);
  const titleEn: string | undefined = toOptionalText(item.TitleEn);
  const messageFr: string | undefined = toOptionalText(item.MessageFr);
  const messageEn: string | undefined = toOptionalText(item.MessageEn);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !priorityValues.has(priorityValue) ||
    Number.isNaN(startDateTime.getTime()) ||
    Number.isNaN(endDateTime.getTime()) ||
    Number.isNaN(modified.getTime()) ||
    startDateTime >= endDateTime ||
    ((!titleFr || !messageFr) && (!titleEn || !messageEn))
  ) {
    return undefined;
  }

  return {
    actionLabelEn: toOptionalText(item.ActionLabelEn),
    actionLabelFr: toOptionalText(item.ActionLabelFr),
    actionUrl: toActionUrl(item.ActionUrl),
    allowDismiss: item.AllowDismiss === true,
    endDateTime,
    id,
    isEnabled: item.IsEnabled === true,
    messageEn,
    messageFr,
    modified,
    priority: priorityValue as PriorityLevel,
    startDateTime,
    titleEn,
    titleFr
  };
}

export function localizePriorityMessage(
  message: IPriorityMessage,
  useFrench: boolean
): ILocalizedPriorityMessage | undefined {
  const preferredTitle: string | undefined = useFrench ? message.titleFr : message.titleEn;
  const preferredMessage: string | undefined = useFrench ? message.messageFr : message.messageEn;
  const fallbackTitle: string | undefined = useFrench ? message.titleEn : message.titleFr;
  const fallbackMessage: string | undefined = useFrench ? message.messageEn : message.messageFr;
  const title: string | undefined = preferredTitle && preferredMessage ? preferredTitle : fallbackTitle;
  const localizedMessage: string | undefined = preferredTitle && preferredMessage
    ? preferredMessage
    : fallbackMessage;

  if (!title || !localizedMessage) {
    return undefined;
  }

  return {
    actionText: useFrench
      ? message.actionLabelFr || message.actionLabelEn
      : message.actionLabelEn || message.actionLabelFr,
    actionUrl: message.actionUrl,
    allowDismiss: message.allowDismiss,
    id: message.id,
    message: localizedMessage,
    priority: message.priority,
    title
  };
}

function toOptionalText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue: string = value.trim();
  return trimmedValue || undefined;
}

function toActionUrl(value: ISharePointUrlValue | string | undefined): string | undefined {
  if (typeof value === 'string') {
    return toOptionalText(value);
  }

  return toOptionalText(value?.Url);
}
