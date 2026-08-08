import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import styles from './PriorityBannerStatus.module.scss';

export interface IPriorityBannerStatusProps {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  details?: string;
  disabled?: boolean;
  iconName: string;
  onAction?: () => void;
  title: string;
}

export default function PriorityBannerStatus(props: IPriorityBannerStatusProps): React.ReactElement {
  const {
    actionHref,
    actionLabel,
    description,
    details,
    disabled,
    iconName,
    onAction,
    title
  } = props;

  return (
    <section className={styles.status} role="status">
      <div className={styles.icon} aria-hidden="true">
        <Icon iconName={iconName} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {details && <p className={styles.details}>{details}</p>}
        {actionLabel && onAction && (
          <button className={styles.action} disabled={disabled} onClick={onAction} type="button">
            {actionLabel}
          </button>
        )}
        {actionLabel && actionHref && (
          <a className={styles.action} href={actionHref} rel="noreferrer" target="_blank">
            {actionLabel}
          </a>
        )}
      </div>
    </section>
  );
}
