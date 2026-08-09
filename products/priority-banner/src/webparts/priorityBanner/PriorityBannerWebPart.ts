import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  type IPropertyPaneCustomFieldProps,
  type IPropertyPaneField,
  PropertyPaneDropdown,
  PropertyPaneFieldType,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PriorityBannerWebPartStrings';
import PriorityBanner from './components/PriorityBanner';
import type { IPriorityBannerProps } from './components/IPriorityBannerProps';
import PriorityBannerStatus from './components/PriorityBannerStatus';
import { BannerLayout } from './domain/BannerLayout';
import {
  buildDismissKey,
  isBannerExpired,
  isFutureExpiration,
  parseExpiration,
  selectBannerContent,
  type BannerContentLanguage,
  type IConfigurableBannerProperties
} from './domain/BannerConfiguration';
import { PriorityLevel } from './domain/PriorityLevel';

export interface IPriorityBannerWebPartProps extends IConfigurableBannerProperties {
  layout: BannerLayout;
}

export default class PriorityBannerWebPart extends BaseClientSideWebPart<IPriorityBannerWebPartProps> {
  private _expirationTimer?: number;

  protected onInit(): Promise<void> {
    this.properties.layout ||= BannerLayout.Standard;
    this.properties.priority ||= PriorityLevel.Information;
    this.properties.allowDismiss ??= true;
    this.properties.translationEnabled ??= false;
    this.properties.primaryLanguage ||= this._useFrench ? 'fr' : 'en';

    return Promise.resolve();
  }

  public render(): void {
    this._clearExpirationTimer();

    const content = selectBannerContent(this.properties, this._useFrench);
    const expiration: Date | undefined = parseExpiration(this.properties.expirationDateTime);
    const isExpired: boolean = isBannerExpired(this.properties.expirationDateTime);

    if (!content || isExpired) {
      if (this.displayMode === DisplayMode.Edit) {
        this.domElement.style.display = '';
        ReactDom.render(
          React.createElement(PriorityBannerStatus, {
            description: isExpired ? strings.ExpiredDescription : strings.ConfigureDescription,
            iconName: isExpired ? 'Clock' : 'Edit',
            title: isExpired ? strings.ExpiredTitle : strings.ConfigureTitle
          }),
          this.domElement
        );
      } else {
        ReactDom.unmountComponentAtNode(this.domElement);
        this.domElement.style.display = 'none';
      }
      return;
    }

    this.domElement.style.display = '';
    const priority: PriorityLevel = this.properties.priority || PriorityLevel.Information;
    const element: React.ReactElement<IPriorityBannerProps> = React.createElement(
      PriorityBanner,
      {
        actionText: content.actionText || (this.properties.actionUrl ? strings.DefaultActionText : undefined),
        actionUrl: this.properties.actionUrl,
        dismissKey: buildDismissKey(this.instanceId, this.properties),
        dismissLabel: strings.DismissLabel,
        layout: this.properties.layout,
        message: content.message,
        priority,
        priorityLabel: priorityLabel(priority),
        showDismiss: this.properties.allowDismiss === true && priority !== PriorityLevel.Critical,
        title: content.title
      }
    );

    ReactDom.render(element, this.domElement);
    this._scheduleExpiration(expiration);
  }

  protected onDispose(): void {
    this._clearExpirationTimer();
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === 'translationEnabled') {
      this.context.propertyPane.refresh();
    }
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const primaryLanguage: BannerContentLanguage = this.properties.primaryLanguage || (this._useFrench ? 'fr' : 'en');
    const translationLanguageLabel: string = primaryLanguage === 'fr'
      ? strings.EnglishLanguageLabel
      : strings.FrenchLanguageLabel;
    const translationFields = this.properties.translationEnabled
      ? [
        PropertyPaneTextField('translatedTitle', {
          label: strings.TranslatedTitleFieldLabel,
          onGetErrorMessage: this._validateTranslatedPair,
          value: this.properties.translatedTitle
        }),
        PropertyPaneTextField('translatedMessage', {
          label: strings.TranslatedMessageFieldLabel,
          multiline: true,
          onGetErrorMessage: this._validateTranslatedPair,
          rows: 4,
          value: this.properties.translatedMessage
        }),
        PropertyPaneTextField('translatedActionText', {
          label: strings.TranslatedActionFieldLabel,
          value: this.properties.translatedActionText
        })
      ]
      : [];

    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.ContentGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  onGetErrorMessage: requiredMessage,
                  value: this.properties.title
                }),
                PropertyPaneTextField('message', {
                  label: strings.MessageFieldLabel,
                  multiline: true,
                  onGetErrorMessage: requiredMessage,
                  rows: 4,
                  value: this.properties.message
                }),
                PropertyPaneDropdown('priority', {
                  label: strings.PriorityFieldLabel,
                  options: [
                    { key: PriorityLevel.Information, text: strings.PriorityInformation },
                    { key: PriorityLevel.Important, text: strings.PriorityImportant },
                    { key: PriorityLevel.Urgent, text: strings.PriorityUrgent },
                    { key: PriorityLevel.Critical, text: strings.PriorityCritical }
                  ]
                })
              ]
            },
            {
              groupName: strings.ExpirationGroupName,
              groupFields: [this._expirationPropertyField()]
            },
            {
              groupName: strings.ActionGroupName,
              groupFields: [
                PropertyPaneTextField('actionUrl', {
                  label: strings.ActionUrlFieldLabel,
                  onGetErrorMessage: validateActionUrl,
                  value: this.properties.actionUrl
                }),
                PropertyPaneTextField('actionText', {
                  label: strings.ActionTextFieldLabel,
                  value: this.properties.actionText
                }),
                PropertyPaneToggle('allowDismiss', {
                  label: strings.AllowDismissFieldLabel,
                  offText: strings.NoLabel,
                  onText: strings.YesLabel
                })
              ]
            },
            {
              groupName: `${strings.TranslationGroupName} — ${translationLanguageLabel}`,
              groupFields: [
                PropertyPaneToggle('translationEnabled', {
                  label: strings.EnableTranslationFieldLabel,
                  offText: strings.NoLabel,
                  onText: strings.YesLabel
                }),
                ...translationFields
              ]
            },
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

  private get _useFrench(): boolean {
    return this.context.pageContext.cultureInfo.currentUICultureName.toLowerCase().startsWith('fr');
  }

  private readonly _validateTranslatedPair = (): string => {
    const titleIsPresent: boolean = Boolean(this.properties.translatedTitle?.trim());
    const messageIsPresent: boolean = Boolean(this.properties.translatedMessage?.trim());
    return titleIsPresent === messageIsPresent ? '' : strings.TranslationPairError;
  };

  private _expirationPropertyField(): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    return {
      properties: {
        key: 'priorityBannerExpiration',
        onDispose: (domElement: HTMLElement): void => {
          domElement.replaceChildren();
        },
        onRender: (
          domElement: HTMLElement,
          _context?: unknown,
          changeCallback?: (targetProperty?: string, newValue?: unknown, isValidEntry?: boolean) => void
        ): void => this._renderExpirationInput(domElement, changeCallback)
      },
      targetProperty: 'expirationDateTime',
      type: PropertyPaneFieldType.Custom
    };
  }

  private _renderExpirationInput(
    domElement: HTMLElement,
    changeCallback?: (targetProperty?: string, newValue?: unknown, isValidEntry?: boolean) => void
  ): void {
    domElement.replaceChildren();

    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = strings.ExpirationFieldLabel;
    label.style.display = 'block';
    label.style.fontWeight = '600';
    label.style.marginBottom = '6px';

    const input: HTMLInputElement = document.createElement('input');
    input.type = 'datetime-local';
    input.value = toLocalInputValue(this.properties.expirationDateTime);
    input.min = toLocalInputValue(new Date(Date.now() + 60000).toISOString());
    input.style.boxSizing = 'border-box';
    input.style.minHeight = '32px';
    input.style.padding = '0 8px';
    input.style.width = '100%';

    const description: HTMLDivElement = document.createElement('div');
    description.textContent = strings.ExpirationFieldDescription;
    description.style.color = '#605e5c';
    description.style.fontSize = '12px';
    description.style.marginTop = '5px';

    const error: HTMLDivElement = document.createElement('div');
    error.setAttribute('role', 'alert');
    error.style.color = '#a4262c';
    error.style.fontSize = '12px';
    error.style.marginTop = '5px';

    input.addEventListener('change', (): void => {
      if (!input.value) {
        this.properties.expirationDateTime = undefined;
        error.textContent = '';
        changeCallback?.('expirationDateTime', undefined, true);
        this.render();
        return;
      }

      const selectedDate: Date = new Date(input.value);
      if (Number.isNaN(selectedDate.getTime()) || !isFutureExpiration(selectedDate.toISOString())) {
        error.textContent = strings.ExpirationPastError;
        changeCallback?.('expirationDateTime', this.properties.expirationDateTime, false);
        return;
      }

      const isoValue: string = selectedDate.toISOString();
      this.properties.expirationDateTime = isoValue;
      error.textContent = '';
      changeCallback?.('expirationDateTime', isoValue, true);
      this.render();
    });

    domElement.append(label, input, description, error);
  }

  private _scheduleExpiration(expiration: Date | undefined): void {
    if (!expiration) {
      return;
    }

    const remainingMilliseconds: number = expiration.getTime() - Date.now();
    if (remainingMilliseconds <= 0) {
      return;
    }

    this._expirationTimer = window.setTimeout(
      () => this.render(),
      Math.min(remainingMilliseconds, 2147483647)
    );
  }

  private _clearExpirationTimer(): void {
    if (this._expirationTimer !== undefined) {
      window.clearTimeout(this._expirationTimer);
      this._expirationTimer = undefined;
    }
  }
}

function priorityLabel(priority: PriorityLevel): string {
  const labels: Record<PriorityLevel, string> = {
    [PriorityLevel.Information]: strings.PriorityInformation,
    [PriorityLevel.Important]: strings.PriorityImportant,
    [PriorityLevel.Urgent]: strings.PriorityUrgent,
    [PriorityLevel.Critical]: strings.PriorityCritical
  };
  return labels[priority];
}

function requiredMessage(value: string = ''): string {
  return value.trim() ? '' : strings.RequiredFieldError;
}

function validateActionUrl(value: string = ''): string {
  const trimmedValue: string = value.trim();
  return !trimmedValue || trimmedValue.startsWith('/') || trimmedValue.startsWith('#') || /^https?:\/\//i.test(trimmedValue)
    ? ''
    : strings.InvalidUrlError;
}

function toLocalInputValue(value: string | undefined): string {
  const date: Date = value ? new Date(value) : new Date(NaN);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const localDate: Date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}
