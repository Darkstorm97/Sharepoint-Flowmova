import {
  localizePriorityMessage,
  mapPriorityMessage
} from '../domain/PriorityMessageMapper';
import { PriorityLevel } from '../domain/PriorityLevel';
import type { ISharePointPriorityMessageItem } from '../models/ISharePointPriorityMessageItem';

const validItem: ISharePointPriorityMessageItem = {
  ActionLabelEn: 'Learn more',
  ActionLabelFr: 'En savoir plus',
  ActionUrl: { Url: 'https://example.com/details' },
  AllowDismiss: true,
  EndDateTime: '2026-08-10T14:00:00Z',
  ID: 12,
  IsEnabled: true,
  MessageEn: 'English message',
  MessageFr: 'Message français',
  Modified: '2026-08-08T13:00:00Z',
  Priority: 'Important',
  StartDateTime: '2026-08-08T12:00:00Z',
  TitleEn: 'English title',
  TitleFr: 'Titre français'
};

describe('PriorityMessageMapper', () => {
  it('maps a valid SharePoint item to the domain model', () => {
    const message = mapPriorityMessage(validItem);

    expect(message).toBeDefined();
    expect(message?.id).toBe(12);
    expect(message?.priority).toBe(PriorityLevel.Important);
    expect(message?.actionUrl).toBe('https://example.com/details');
    expect(message?.startDateTime.toISOString()).toBe('2026-08-08T12:00:00.000Z');
  });

  it('uses the complete fallback language without mixing title and message', () => {
    const message = mapPriorityMessage({
      ...validItem,
      MessageFr: '',
      TitleFr: 'Titre incomplet'
    });

    expect(message).toBeDefined();
    expect(localizePriorityMessage(message!, true)).toMatchObject({
      message: 'English message',
      title: 'English title'
    });
  });

  it('rejects an item whose end date is not after its start date', () => {
    expect(mapPriorityMessage({
      ...validItem,
      EndDateTime: validItem.StartDateTime
    })).toBeUndefined();
  });

  it('rejects an item without a complete language version', () => {
    expect(mapPriorityMessage({
      ...validItem,
      MessageEn: '',
      MessageFr: '',
      TitleEn: '',
      TitleFr: ''
    })).toBeUndefined();
  });
});
