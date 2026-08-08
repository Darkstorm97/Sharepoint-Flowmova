export interface ISharePointUrlValue {
  Description?: string;
  Url?: string;
}

export interface ISharePointPriorityMessageItem {
  ActionLabelEn?: unknown;
  ActionLabelFr?: unknown;
  ActionUrl?: ISharePointUrlValue | string;
  AllowDismiss?: unknown;
  EndDateTime?: unknown;
  ID?: unknown;
  IsEnabled?: unknown;
  MessageEn?: unknown;
  MessageFr?: unknown;
  Modified?: unknown;
  Priority?: unknown;
  StartDateTime?: unknown;
  TitleEn?: unknown;
  TitleFr?: unknown;
}
