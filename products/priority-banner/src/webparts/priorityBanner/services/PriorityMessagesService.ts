import {
  SPHttpClient,
  type SPHttpClientResponse
} from '@microsoft/sp-http';
import {
  analyzePriorityListSchema,
  type IPriorityFieldDefinition,
  type IPriorityListSchemaAnalysis,
  type ISharePointFieldInfo,
  priorityFieldDefinitions,
  priorityFormConfiguration
} from '../domain/PriorityListSchema';
import { mapPriorityMessage } from '../domain/PriorityMessageMapper';
import type { IPriorityMessage } from '../models/IPriorityMessage';
import type { ISharePointPriorityMessageItem } from '../models/ISharePointPriorityMessageItem';
import type { IPriorityListConfiguration } from '../models/PriorityListStatus';
import type { IPriorityMessagesService } from './IPriorityMessagesService';
import { PriorityMessagesServiceError } from './PriorityMessagesServiceError';

interface IODataCollection<T> {
  value: T[];
}

interface ICreatedListPayload {
  Id?: string;
  d?: { Id?: string };
}

const listInternalName: string = 'PriorityMessages';
// SP.AddFieldOptions.AddFieldInternalNameHint. Without it, SharePoint derives
// internal names from DisplayName and every repair attempt creates duplicates.
const addFieldInternalNameHint: number = 8;

export class PriorityMessagesService implements IPriorityMessagesService {
  public readonly listUrl: string;
  private readonly _listEndpoint: string;

  public constructor(
    private readonly _spHttpClient: SPHttpClient,
    private readonly _webAbsoluteUrl: string,
    webServerRelativeUrl: string
  ) {
    const normalizedWebUrl: string = webServerRelativeUrl === '/'
      ? ''
      : webServerRelativeUrl.replace(/\/$/, '');
    this.listUrl = `${normalizedWebUrl}/Lists/${listInternalName}`;
    this._listEndpoint = `${this._webAbsoluteUrl}/_api/web/GetList('${escapeOData(this.listUrl)}')`;
  }

  public async getConfiguration(): Promise<IPriorityListConfiguration> {
    const listResponse: SPHttpClientResponse = await this._spHttpClient.get(
      `${this._listEndpoint}?$select=Id`,
      SPHttpClient.configurations.v1,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );

    if (listResponse.status === 404) {
      return {
        incompatibleFields: [],
        listUrl: this.listUrl,
        missingFields: [],
        status: 'missing'
      };
    }

    await ensureSuccess(listResponse, 'Unable to inspect the Priority Messages list.');

    const fieldsResponse: SPHttpClientResponse = await this._spHttpClient.get(
      `${this._listEndpoint}/fields?$select=InternalName,TypeAsString,Required,ShowInEditForm,ShowInNewForm,Title`,
      SPHttpClient.configurations.v1,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    await ensureSuccess(fieldsResponse, 'Unable to inspect the Priority Messages fields.');

    const payload: IODataCollection<ISharePointFieldInfo> = await fieldsResponse.json();
    const analysis: IPriorityListSchemaAnalysis = analyzePriorityListSchema(payload.value);

    return {
      incompatibleFields: analysis.incompatibleFields,
      listUrl: this.listUrl,
      missingFields: analysis.missingFields,
      status: analysis.incompatibleFields.length > 0
        ? 'incompatible'
        : analysis.missingFields.length > 0 || analysis.formConfigurationNeedsUpdate
          ? 'repairable'
          : 'ready'
    };
  }

  public async createStandardList(displayTitle: string, description: string): Promise<void> {
    const createResponse: SPHttpClientResponse = await this._spHttpClient.post(
      `${this._webAbsoluteUrl}/_api/web/lists`,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify({
          BaseTemplate: 100,
          Description: description,
          Title: listInternalName
        }),
        headers: jsonHeaders()
      }
    );
    await ensureSuccess(createResponse, 'Unable to create the Priority Messages list.');

    const createdList: ICreatedListPayload = await createResponse.json();
    const listId: string | undefined = createdList.Id || createdList.d?.Id;
    const createdListEndpoint: string = listId && isGuid(listId)
      ? `${this._webAbsoluteUrl}/_api/web/lists(guid'${listId}')`
      : this._listEndpoint;

    await this._createFields(createdListEndpoint, priorityFieldDefinitions);
    await this._configureSimplifiedForm(createdListEndpoint);
    await this._updateList(createdListEndpoint, displayTitle, description);
  }

  public async repairStandardList(displayTitle: string, description: string): Promise<void> {
    const configuration: IPriorityListConfiguration = await this.getConfiguration();

    if (configuration.status === 'missing') {
      await this.createStandardList(displayTitle, description);
      return;
    }

    if (configuration.incompatibleFields.length > 0) {
      throw new PriorityMessagesServiceError(
        'Existing fields have incompatible types and cannot be replaced automatically.',
        409
      );
    }

    const missingDefinitions: IPriorityFieldDefinition[] = priorityFieldDefinitions.filter(
      (definition: IPriorityFieldDefinition) => configuration.missingFields.indexOf(definition.internalName) >= 0
    );

    await this._createFields(this._listEndpoint, missingDefinitions);
    await this._configureSimplifiedForm(this._listEndpoint);
    await this._updateList(this._listEndpoint, displayTitle, description);
  }

  public async getMessages(): Promise<IPriorityMessage[]> {
    const fields: string = [
      'ID', 'TitleFr', 'TitleEn', 'MessageFr', 'MessageEn', 'ActionLabelFr',
      'ActionLabelEn', 'ActionUrl', 'Priority', 'StartDateTime', 'EndDateTime',
      'IsEnabled', 'AllowDismiss', 'Modified'
    ].join(',');
    const response: SPHttpClientResponse = await this._spHttpClient.get(
      `${this._listEndpoint}/items?$select=${fields}&$orderby=Modified desc&$top=100`,
      SPHttpClient.configurations.v1,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    await ensureSuccess(response, 'Unable to read Priority Messages.');

    const payload: IODataCollection<ISharePointPriorityMessageItem> = await response.json();
    return payload.value
      .map(mapPriorityMessage)
      .filter((message: IPriorityMessage | undefined): message is IPriorityMessage => Boolean(message));
  }

  private async _createFields(
    listEndpoint: string,
    definitions: readonly IPriorityFieldDefinition[]
  ): Promise<void> {
    for (const definition of definitions) {
      const fieldResponse: SPHttpClientResponse = await this._spHttpClient.post(
        `${listEndpoint}/fields/createFieldAsXml`,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify({
            parameters: {
              Options: addFieldInternalNameHint,
              SchemaXml: definition.schemaXml
            }
          }),
          headers: jsonHeaders()
        }
      );
      await ensureSuccess(
        fieldResponse,
        `Unable to create the ${definition.internalName} field.`
      );
    }
  }

  private async _updateList(
    listEndpoint: string,
    displayTitle: string,
    description: string
  ): Promise<void> {
    const response: SPHttpClientResponse = await this._spHttpClient.post(
      listEndpoint,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify({ Description: description, Title: displayTitle }),
        headers: {
          ...jsonHeaders(),
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE'
        }
      }
    );
    await ensureSuccess(response, 'Unable to update the Priority Messages list.');
  }

  private async _configureSimplifiedForm(listEndpoint: string): Promise<void> {
    for (const configuration of priorityFormConfiguration) {
      const fieldEndpoint: string = `${listEndpoint}/fields/getByInternalNameOrTitle('${escapeOData(configuration.internalName)}')`;
      const body: Record<string, boolean | string> = {
        Required: configuration.required
      };

      if (configuration.title) {
        body.Title = configuration.title;
      }

      const response: SPHttpClientResponse = await this._spHttpClient.post(
        fieldEndpoint,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify(body),
          headers: {
            ...jsonHeaders(),
            'IF-MATCH': '*',
            'X-HTTP-Method': 'MERGE'
          }
        }
      );
      await ensureSuccess(
        response,
        `Unable to simplify the ${configuration.internalName} field.`
      );

      const newFormResponse: SPHttpClientResponse = await this._spHttpClient.post(
        `${fieldEndpoint}/setShowInNewForm(${configuration.showInForms})`,
        SPHttpClient.configurations.v1,
        { headers: jsonHeaders() }
      );
      await ensureSuccess(
        newFormResponse,
        `Unable to configure the ${configuration.internalName} field for the new form.`
      );

      const editFormResponse: SPHttpClientResponse = await this._spHttpClient.post(
        `${fieldEndpoint}/setShowInEditForm(${configuration.showInForms})`,
        SPHttpClient.configurations.v1,
        { headers: jsonHeaders() }
      );
      await ensureSuccess(
        editFormResponse,
        `Unable to configure the ${configuration.internalName} field for the edit form.`
      );
    }
  }
}

function escapeOData(value: string): string {
  return value.replace(/'/g, "''");
}

function isGuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function jsonHeaders(): Record<string, string> {
  return {
    Accept: 'application/json;odata=nometadata',
    'Content-Type': 'application/json;odata=nometadata'
  };
}

async function ensureSuccess(response: SPHttpClientResponse, message: string): Promise<void> {
  if (response.ok) {
    return;
  }

  const responseText: string = await response.text();
  const responseDetails: string = extractSharePointError(responseText);
  const details: string = responseDetails ? ` ${responseDetails.slice(0, 350)}` : '';
  throw new PriorityMessagesServiceError(
    `${message} HTTP ${response.status}.${details}`,
    response.status
  );
}

function extractSharePointError(responseText: string): string {
  if (!responseText) {
    return '';
  }

  try {
    const payload: {
      error?: { message?: string | { value?: string } };
      'odata.error'?: { message?: { value?: string } };
    } = JSON.parse(responseText);
    const modernMessage: string | { value?: string } | undefined = payload.error?.message;

    if (typeof modernMessage === 'string') {
      return modernMessage;
    }

    return modernMessage?.value || payload['odata.error']?.message?.value || responseText;
  } catch {
    return responseText;
  }
}
