import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import styles from './PriorityBanner.module.scss';
import type { IPriorityBannerProps } from './IPriorityBannerProps';
import { BannerLayout } from '../domain/BannerLayout';
import { PriorityLevel } from '../domain/PriorityLevel';

interface IPriorityBannerState {
  isDismissed: boolean;
}

const priorityClassNames: Record<PriorityLevel, string> = {
  [PriorityLevel.Information]: styles.information,
  [PriorityLevel.Important]: styles.important,
  [PriorityLevel.Urgent]: styles.urgent,
  [PriorityLevel.Critical]: styles.critical
};

const priorityIconNames: Record<PriorityLevel, string> = {
  [PriorityLevel.Information]: 'Info',
  [PriorityLevel.Important]: 'Warning',
  [PriorityLevel.Urgent]: 'Clock',
  [PriorityLevel.Critical]: 'ErrorBadge'
};

export default class PriorityBanner extends React.Component<IPriorityBannerProps, IPriorityBannerState> {
  public state: IPriorityBannerState = {
    isDismissed: this._wasDismissed(this.props.dismissKey)
  };

  public componentDidUpdate(previousProps: IPriorityBannerProps): void {
    if (previousProps.dismissKey !== this.props.dismissKey) {
      const isDismissed: boolean = this._wasDismissed(this.props.dismissKey);
      if (isDismissed !== this.state.isDismissed) {
        this.setState({ isDismissed });
      }
    }
  }

  public render(): React.ReactElement<IPriorityBannerProps> {
    const {
      actionText,
      actionUrl,
      dismissLabel,
      layout,
      message,
      priority,
      priorityLabel,
      showDismiss,
      title,
    } = this.props;

    if (this.state.isDismissed) {
      return <React.Fragment />;
    }

    const safeActionUrl: string | undefined = this._getSafeActionUrl(actionUrl);
    const isCompact: boolean = layout === BannerLayout.Compact;
    const layoutClassName: string = isCompact ? styles.compact : styles.standard;

    return (
      <section
        className={`${styles.priorityBanner} ${priorityClassNames[priority]} ${layoutClassName}`}
        aria-label={priorityLabel}
        role={priority === PriorityLevel.Urgent || priority === PriorityLevel.Critical ? 'alert' : 'status'}
      >
        <div className={styles.icon} aria-hidden="true">
          <Icon iconName={priorityIconNames[priority]} />
        </div>
        <div className={styles.content}>
          {!isCompact && <span className={styles.priorityLabel}>{priorityLabel}</span>}
          <h2 className={styles.title}>{title || priorityLabel}</h2>
          {!isCompact && message && <p className={styles.message}>{message}</p>}
        </div>
        {actionText && safeActionUrl && (
          <a className={styles.action} href={safeActionUrl} rel="noreferrer" target="_blank">
            {actionText}
          </a>
        )}
        {showDismiss && (
          <button
            aria-label={dismissLabel}
            className={styles.dismiss}
            onClick={this._dismiss}
            type="button"
          >
            <Icon iconName="Cancel" aria-hidden="true" />
          </button>
        )}
      </section>
    );
  }

  private readonly _dismiss = (): void => {
    try {
      window.localStorage.setItem(this.props.dismissKey, '1');
    } catch {
      // The banner can still be dismissed for this render when storage is unavailable.
    }
    this.setState({ isDismissed: true });
  };

  private _wasDismissed(dismissKey: string): boolean {
    try {
      return window.localStorage.getItem(dismissKey) === '1';
    } catch {
      return false;
    }
  }

  private _getSafeActionUrl(actionUrl: string | undefined): string | undefined {
    const trimmedUrl: string = actionUrl?.trim() || '';

    if (
      trimmedUrl.startsWith('/') ||
      trimmedUrl.startsWith('#') ||
      /^https?:\/\//i.test(trimmedUrl)
    ) {
      return trimmedUrl;
    }

    return undefined;
  }
}
