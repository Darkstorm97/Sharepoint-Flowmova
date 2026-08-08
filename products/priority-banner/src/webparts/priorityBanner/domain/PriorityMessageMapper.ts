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
  const priorityValue: string = typeof item.Priority === 'string' && item.Priority.trim()
    ? item.Priority.toLowerCase()
    : PriorityLevel.Information;
  const startDateTime: Date | undefined = toOptionalDate(
    item.StartDateTime,
    new Date(0)
  );
  const endDateTime: Date | undefined = toOptionalDate(
    item.EndDateTime,
    new Date('9999-12-31T23:59:59.999Z')
  );
  const modified: Date = new Date(String(item.Modified || ''));
  const titleFr: string | undefined = toOptionalText(item.TitleFr);
  const titleEn: string | undefined = toOptionalText(item.TitleEn);
  const messageFr: string | undefined = toOptionalText(item.MessageFr);
  const messageEn: string | undefined = toOptionalText(item.MessageEn);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !priorityValues.has(priorityValue) ||
    !startDateTime ||
    !endDateTime ||
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
    allowDismiss: item.AllowDismiss !== false,
    endDateTime,
    id,
    isEnabled: item.IsEnabled !== false,
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
    actionText: (useFrench
      ? message.actionLabelFr || message.actionLabelEn
      : message.actionLabelEn || message.actionLabelFr) || (message.actionUrl
      ? useFrench ? 'En savoir plus' : 'Learn more'
      : undefined),
    actionUrl: message.actionUrl,
    allowDismiss: message.allowDismiss,
    id: message.id,
    message: localizedMessage,
    priority: message.priority,
    title
  };
}

export function isPriorityMessageActive(message: IPriorityMessage, now: Date): boolean {
  return message.isEnabled && message.startDateTime <= now && message.endDateTime >= now;
}

function toOptionalText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue: string = value.trim();
  return trimmedValue || undefined;
}

function toOptionalDate(value: unknown, fallback: Date): Date | undefined {
  if (value === undefined || value === null || value === '') {
    return new Date(fallback.getTime());
  }

  const parsedDate: Date = new Date(String(value));
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}

function toActionUrl(value: ISharePointUrlValue | string | undefined): string | undefined {
  if (typeof value === 'string') {
    return toOptionalText(value);
  }

  return toOptionalText(value?.Url);
}
