import * as React from 'react';
import { localizePriorityMessage } from '../domain/PriorityMessageMapper';
import type { ILocalizedPriorityMessage, IPriorityMessage } from '../models/IPriorityMessage';
import type { IPriorityListConfiguration } from '../models/PriorityListStatus';
import { PriorityMessagesServiceError } from '../services/PriorityMessagesServiceError';
import PriorityBanner from './PriorityBanner';
import type { IPriorityBannerHostProps } from './IPriorityBannerHostProps';
import PriorityBannerStatus from './PriorityBannerStatus';

type HostState = 'creating' | 'empty' | 'error' | 'incompatible' | 'loading' | 'missing' | 'permission' | 'ready';

interface IPriorityBannerHostState {
  hostState: HostState;
  message?: ILocalizedPriorityMessage;
  missingFields?: string[];
}

export default class PriorityBannerHost extends React.Component<IPriorityBannerHostProps, IPriorityBannerHostState> {
  public state: IPriorityBannerHostState = {
    hostState: 'loading'
  };

  public componentDidMount(): void {
    this._load().catch((error: unknown) => this._setErrorState(error));
  }

  public render(): React.ReactElement {
    const { labels, layout, service } = this.props;
    const { hostState, message, missingFields } = this.state;

    if (hostState === 'ready' && message) {
      return (
        <PriorityBanner
          actionText={message.actionText}
          actionUrl={message.actionUrl}
          dismissLabel={labels.dismissLabel}
          layout={layout}
          message={message.message}
          priority={message.priority}
          priorityLabel={labels.priorityLabels[message.priority]}
          showDismiss={message.allowDismiss}
          title={message.title}
        />
      );
    }

    if (hostState === 'missing') {
      return (
        <PriorityBannerStatus
          actionLabel={labels.createButton}
          description={labels.configurationDescription}
          iconName="Settings"
          onAction={this._createList}
          title={labels.configurationTitle}
        />
      );
    }

    if (hostState === 'creating') {
      return (
        <PriorityBannerStatus
          actionLabel={labels.createButton}
          description={labels.creatingDescription}
          disabled
          iconName="Sync"
          onAction={this._createList}
          title={labels.creatingTitle}
        />
      );
    }

    if (hostState === 'incompatible') {
      return (
        <PriorityBannerStatus
          description={labels.incompatibleDescription}
          details={missingFields?.join(', ')}
          iconName="Warning"
          title={labels.incompatibleTitle}
        />
      );
    }

    if (hostState === 'empty') {
      return (
        <PriorityBannerStatus
          actionHref={`${service.listUrl}/AllItems.aspx`}
          actionLabel={labels.openListButton}
          description={labels.emptyDescription}
          iconName="AddNotes"
          title={labels.emptyTitle}
        />
      );
    }

    if (hostState === 'permission') {
      return (
        <PriorityBannerStatus
          description={labels.permissionDescription}
          iconName="Lock"
          title={labels.permissionTitle}
        />
      );
    }

    if (hostState === 'error') {
      return (
        <PriorityBannerStatus
          actionLabel={labels.retryButton}
          description={labels.errorDescription}
          iconName="Error"
          onAction={this._retry}
          title={labels.errorTitle}
        />
      );
    }

    return (
      <PriorityBannerStatus
        description={labels.loadingDescription}
        iconName="Sync"
        title={labels.loadingTitle}
      />
    );
  }

  private readonly _createList = async (): Promise<void> => {
    this.setState({ hostState: 'creating', message: undefined, missingFields: undefined });

    try {
      await this.props.service.createStandardList(
        this.props.labels.listDisplayTitle,
        this.props.labels.listDescription
      );
      await this._load();
    } catch (error: unknown) {
      this._setErrorState(error);
    }
  };

  private readonly _retry = (): void => {
    this._load().catch((error: unknown) => this._setErrorState(error));
  };

  private async _load(): Promise<void> {
    this.setState({ hostState: 'loading', message: undefined, missingFields: undefined });

    try {
      const configuration: IPriorityListConfiguration = await this.props.service.getConfiguration();
      if (configuration.status !== 'ready') {
        this.setState({
          hostState: configuration.status,
          missingFields: configuration.missingFields
        });
        return;
      }

      const messages: IPriorityMessage[] = await this.props.service.getMessages();
      const localizedMessage: ILocalizedPriorityMessage | undefined = messages
        .filter((message: IPriorityMessage) => message.isEnabled)
        .map((message: IPriorityMessage) => localizePriorityMessage(message, this.props.useFrench))
        .find((message: ILocalizedPriorityMessage | undefined): message is ILocalizedPriorityMessage => Boolean(message));

      this.setState({
        hostState: localizedMessage ? 'ready' : 'empty',
        message: localizedMessage
      });
    } catch (error: unknown) {
      this._setErrorState(error);
    }
  }

  private _setErrorState(error: unknown): void {
    const statusCode: number | undefined = error instanceof PriorityMessagesServiceError
      ? error.statusCode
      : undefined;
    this.setState({
      hostState: statusCode === 401 || statusCode === 403 ? 'permission' : 'error',
      message: undefined
    });
  }
}
