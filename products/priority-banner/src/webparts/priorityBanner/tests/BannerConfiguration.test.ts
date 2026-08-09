import {
  buildDismissKey,
  isBannerExpired,
  isFutureExpiration,
  selectBannerContent
} from '../domain/BannerConfiguration';
import { PriorityLevel } from '../domain/PriorityLevel';

const baseProperties = {
  actionText: 'En savoir plus',
  message: 'Message principal',
  primaryLanguage: 'fr' as const,
  priority: PriorityLevel.Important,
  title: 'Titre principal'
};

describe('BannerConfiguration', () => {
  it('uses the primary content for a viewer using the primary language', () => {
    expect(selectBannerContent(baseProperties, true)).toEqual({
      actionText: 'En savoir plus',
      message: 'Message principal',
      title: 'Titre principal'
    });
  });

  it('uses a complete optional translation for the other language', () => {
    expect(selectBannerContent({
      ...baseProperties,
      translatedActionText: 'Learn more',
      translatedMessage: 'Translated message',
      translatedTitle: 'Translated title',
      translationEnabled: true
    }, false)).toEqual({
      actionText: 'Learn more',
      message: 'Translated message',
      title: 'Translated title'
    });
  });

  it('allows an optional translated message when the translated title exists', () => {
    expect(selectBannerContent({
      ...baseProperties,
      translatedTitle: 'Translated title',
      translationEnabled: true
    }, false)).toEqual({
      actionText: undefined,
      message: undefined,
      title: 'Translated title'
    });
  });

  it('renders a title without a message', () => {
    expect(selectBannerContent({ ...baseProperties, message: '   ' }, true)).toEqual({
      actionText: 'En savoir plus',
      message: undefined,
      title: 'Titre principal'
    });
  });

  it('does not render without a title', () => {
    expect(selectBannerContent({ ...baseProperties, title: '   ' }, true)).toBeUndefined();
  });

  it('accepts only future expiration dates and identifies expired messages', () => {
    const now = new Date('2026-08-08T12:00:00Z');
    expect(isFutureExpiration('2026-08-08T12:01:00Z', now)).toBe(true);
    expect(isFutureExpiration('2026-08-08T11:59:00Z', now)).toBe(false);
    expect(isBannerExpired('2026-08-08T12:00:00Z', now)).toBe(true);
    expect(isBannerExpired(undefined, now)).toBe(false);
  });

  it('changes the dismissal key when visible content changes', () => {
    const firstKey = buildDismissKey('instance', baseProperties);
    expect(buildDismissKey('instance', baseProperties)).toBe(firstKey);
    expect(buildDismissKey('instance', { ...baseProperties, message: 'Nouveau message' })).not.toBe(firstKey);
  });
});
