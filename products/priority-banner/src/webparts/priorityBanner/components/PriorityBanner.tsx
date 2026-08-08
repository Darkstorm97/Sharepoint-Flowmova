import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import styles from './PriorityBanner.module.scss';
import type { IPriorityBannerProps } from './IPriorityBannerProps';
import { PriorityLevel } from '../domain/PriorityLevel';

export default class PriorityBanner extends React.Component<IPriorityBannerProps> {
  public render(): React.ReactElement<IPriorityBannerProps> {
    const {
      priority,
      priorityLabel,
      title,
      message
    } = this.props;
    const priorityClassNames: Record<PriorityLevel, string> = {
      [PriorityLevel.Information]: styles.information,
      [PriorityLevel.Important]: styles.important,
      [PriorityLevel.Urgent]: styles.urgent,
      [PriorityLevel.Critical]: styles.critical
    };

    return (
      <section
        className={`${styles.priorityBanner} ${priorityClassNames[priority]}`}
        aria-label={priorityLabel}
        role="status"
      >
        <div className={styles.icon} aria-hidden="true">
          <Icon iconName="Info" />
        </div>
        <div className={styles.content}>
          <span className={styles.priorityLabel}>{priorityLabel}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
        </div>
      </section>
    );
  }
}
