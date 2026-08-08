import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PriorityBannerWebPartStrings';
import PriorityBanner from './components/PriorityBanner';
import { IPriorityBannerProps } from './components/IPriorityBannerProps';
import { BannerLayout } from './domain/BannerLayout';
import { PriorityLevel } from './domain/PriorityLevel';

export interface IPriorityBannerWebPartProps {
  actionText: string;
  actionUrl: string;
  layout: BannerLayout;
  message: string;
  priority: PriorityLevel;
  showDismiss: boolean;
  title: string;
}

export default class PriorityBannerWebPart extends BaseClientSideWebPart<IPriorityBannerWebPartProps> {
  protected onInit(): Promise<void> {
    this.properties.title ||= strings.PreviewTitle;
    this.properties.message ||= strings.PreviewMessage;
    this.properties.priority ||= PriorityLevel.Information;
    this.properties.layout ||= BannerLayout.Standard;
    this.properties.actionText ??= '';
    this.properties.actionUrl ??= '';
    this.properties.showDismiss ??= true;

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IPriorityBannerProps> = React.createElement(
      PriorityBanner,
      {
        actionText: this.properties.actionText,
        actionUrl: this.properties.actionUrl,
        dismissLabel: strings.DismissLabel,
        layout: this.properties.layout,
        message: this.properties.message,
        priority: this.properties.priority,
        priorityLabel: this._getPriorityLabel(this.properties.priority),
        showDismiss: this.properties.showDismiss,
        title: this.properties.title
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
              groupName: strings.ContentGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('message', {
                  label: strings.MessageFieldLabel,
                  multiline: true,
                  rows: 3
                }),
                PropertyPaneDropdown('priority', {
                  label: strings.PriorityFieldLabel,
                  options: [
                    { key: PriorityLevel.Information, text: strings.PriorityInformation },
                    { key: PriorityLevel.Important, text: strings.PriorityImportant },
                    { key: PriorityLevel.Urgent, text: strings.PriorityUrgent },
                    { key: PriorityLevel.Critical, text: strings.PriorityCritical }
                  ]
                }),
                PropertyPaneDropdown('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: BannerLayout.Standard, text: strings.LayoutStandard },
                    { key: BannerLayout.Compact, text: strings.LayoutCompact }
                  ]
                })
              ]
            },
            {
              groupName: strings.ActionGroupName,
              groupFields: [
                PropertyPaneTextField('actionText', {
                  label: strings.ActionTextFieldLabel
                }),
                PropertyPaneTextField('actionUrl', {
                  label: strings.ActionUrlFieldLabel,
                  placeholder: 'https://'
                }),
                PropertyPaneToggle('showDismiss', {
                  label: strings.ShowDismissFieldLabel,
                  onText: strings.ToggleYes,
                  offText: strings.ToggleNo
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getPriorityLabel(priority: PriorityLevel): string {
    const labels: Record<PriorityLevel, string> = {
      [PriorityLevel.Information]: strings.PriorityInformation,
      [PriorityLevel.Important]: strings.PriorityImportant,
      [PriorityLevel.Urgent]: strings.PriorityUrgent,
      [PriorityLevel.Critical]: strings.PriorityCritical
    };

    return labels[priority];
  }
}
