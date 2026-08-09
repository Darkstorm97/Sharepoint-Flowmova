import type { PriorityLevel } from './PriorityLevel';

export type BannerContentLanguage = 'en' | 'fr';

export interface IConfigurableBannerProperties {
  actionText?: string;
  actionUrl?: string;
  allowDismiss?: boolean;
  expirationDateTime?: string;
  message?: string;
  primaryLanguage?: BannerContentLanguage;
  priority?: PriorityLevel;
  title?: string;
  translatedActionText?: string;
  translatedMessage?: string;
  translatedTitle?: string;
  translationEnabled?: boolean;
}

export interface ISelectedBannerContent {
  actionText?: string;
  message?: string;
  title: string;
}

export function selectBannerContent(
  properties: IConfigurableBannerProperties,
  useFrench: boolean
): ISelectedBannerContent | undefined {
  const primaryTitle: string | undefined = optionalText(properties.title);
  const primaryMessage: string | undefined = optionalText(properties.message);
  if (!primaryTitle) {
    return undefined;
  }

  const primaryLanguage: BannerContentLanguage = properties.primaryLanguage || (useFrench ? 'fr' : 'en');
  const viewerLanguage: BannerContentLanguage = useFrench ? 'fr' : 'en';
  const translatedTitle: string | undefined = optionalText(properties.translatedTitle);
  const translatedMessage: string | undefined = optionalText(properties.translatedMessage);
  const canUseTranslation: boolean = properties.translationEnabled === true &&
    viewerLanguage !== primaryLanguage &&
    Boolean(translatedTitle);

  return canUseTranslation
    ? {
      actionText: optionalText(properties.translatedActionText),
      message: translatedMessage,
      title: translatedTitle!
    }
    : {
      actionText: optionalText(properties.actionText),
      message: primaryMessage,
      title: primaryTitle
    };
}

export function buildDismissKey(instanceId: string, properties: IConfigurableBannerProperties): string {
  const signature: string = [
    properties.title,
    properties.message,
    properties.priority,
    properties.expirationDateTime,
    properties.actionUrl
  ].join('|');
  return `flowmova.priority-banner.dismissed.${instanceId}.${simpleHash(signature)}`;
}

export function parseExpiration(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const expiration: Date = new Date(value);
  return Number.isNaN(expiration.getTime()) ? undefined : expiration;
}

export function isBannerExpired(value: string | undefined, now: Date = new Date()): boolean {
  const expiration: Date | undefined = parseExpiration(value);
  return Boolean(expiration && expiration.getTime() <= now.getTime());
}

export function isFutureExpiration(value: string, now: Date = new Date()): boolean {
  const expiration: Date | undefined = parseExpiration(value);
  return Boolean(expiration && expiration.getTime() > now.getTime());
}

function optionalText(value: string | undefined): string | undefined {
  const trimmedValue: string = value?.trim() || '';
  return trimmedValue || undefined;
}

function simpleHash(value: string): string {
  let hash: number = 0;
  for (let index: number = 0; index < value.length; index++) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}
