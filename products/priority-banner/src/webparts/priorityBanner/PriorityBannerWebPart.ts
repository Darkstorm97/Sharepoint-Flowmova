import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PriorityBannerWebPartStrings';
import PriorityBannerHost from './components/PriorityBannerHost';
import type {
  IPriorityBannerHostLabels,
  IPriorityBannerHostProps
} from './components/IPriorityBannerHostProps';
import { BannerLayout } from './domain/BannerLayout';
import { PriorityLevel } from './domain/PriorityLevel';
import { PriorityMessagesService } from './services/PriorityMessagesService';

export interface IPriorityBannerWebPartProps {
  layout: BannerLayout;
}

export default class PriorityBannerWebPart extends BaseClientSideWebPart<IPriorityBannerWebPartProps> {
  private _messagesService!: PriorityMessagesService;

  protected onInit(): Promise<void> {
    this.properties.layout ||= BannerLayout.Standard;
    this._messagesService = new PriorityMessagesService(
      this.context.spHttpClient,
      this.context.pageContext.web.absoluteUrl,
      this.context.pageContext.web.serverRelativeUrl
    );

    return Promise.resolve();
  }

  public render(): void {
    const labels: IPriorityBannerHostLabels = {
      configurationDescription: strings.ConfigurationDescription,
      configurationTitle: strings.ConfigurationTitle,
      createButton: strings.CreateButton,
      creatingDescription: strings.CreatingDescription,
      creatingTitle: strings.CreatingTitle,
      dismissLabel: strings.DismissLabel,
      emptyDescription: strings.EmptyDescription,
      emptyTitle: strings.EmptyTitle,
      errorDescription: strings.ErrorDescription,
      errorTitle: strings.ErrorTitle,
      incompatibleDescription: strings.IncompatibleDescription,
      incompatibleTitle: strings.IncompatibleTitle,
      listDescription: strings.ListDescription,
      listDisplayTitle: strings.ListDisplayTitle,
      loadingDescription: strings.LoadingDescription,
      loadingTitle: strings.LoadingTitle,
      openListButton: strings.OpenListButton,
      permissionDescription: strings.PermissionDescription,
      permissionTitle: strings.PermissionTitle,
      priorityLabels: {
        [PriorityLevel.Information]: strings.PriorityInformation,
        [PriorityLevel.Important]: strings.PriorityImportant,
        [PriorityLevel.Urgent]: strings.PriorityUrgent,
        [PriorityLevel.Critical]: strings.PriorityCritical
      },
      retryButton: strings.RetryButton
    };
    const element: React.ReactElement<IPriorityBannerHostProps> = React.createElement(
      PriorityBannerHost,
      {
        labels,
        layout: this.properties.layout,
        service: this._messagesService,
        useFrench: this.context.pageContext.cultureInfo.currentUICultureName.toLowerCase().startsWith('fr')
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneDropdown('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: BannerLayout.Standard, text: strings.LayoutStandard },
                    { key: BannerLayout.Compact, text: strings.LayoutCompact }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
