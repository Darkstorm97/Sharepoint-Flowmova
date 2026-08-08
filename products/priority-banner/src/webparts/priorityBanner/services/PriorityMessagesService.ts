import {
  SPHttpClient,
  type SPHttpClientResponse
} from '@microsoft/sp-http';
import { mapPriorityMessage } from '../domain/PriorityMessageMapper';
import type { IPriorityMessage } from '../models/IPriorityMessage';
import type { ISharePointPriorityMessageItem } from '../models/ISharePointPriorityMessageItem';
import type { IPriorityListConfiguration } from '../models/PriorityListStatus';
import type { IPriorityMessagesService } from './IPriorityMessagesService';
import { PriorityMessagesServiceError } from './PriorityMessagesServiceError';

interface IODataCollection<T> {
  value: T[];
}

interface ISharePointFieldInfo {
  InternalName: string;
}

const listInternalName: string = 'PriorityMessages';
const requiredFieldNames: readonly string[] = [
  'TitleFr',
  'TitleEn',
  'MessageFr',
  'MessageEn',
  'ActionLabelFr',
  'ActionLabelEn',
  'ActionUrl',
  'Priority',
  'StartDateTime',
  'EndDateTime',
  'IsEnabled',
  'AllowDismiss'
];

const fieldSchemas: readonly string[] = [
  '<Field Type="Text" Name="TitleFr" StaticName="TitleFr" DisplayName="Titre français" MaxLength="255" AddToDefaultView="TRUE" />',
  '<Field Type="Text" Name="TitleEn" StaticName="TitleEn" DisplayName="English title" MaxLength="255" AddToDefaultView="TRUE" />',
  '<Field Type="Note" Name="MessageFr" StaticName="MessageFr" DisplayName="Message français" NumLines="6" RichText="FALSE" AddToDefaultView="TRUE" />',
  '<Field Type="Note" Name="MessageEn" StaticName="MessageEn" DisplayName="English message" NumLines="6" RichText="FALSE" AddToDefaultView="TRUE" />',
  '<Field Type="Text" Name="ActionLabelFr" StaticName="ActionLabelFr" DisplayName="Action française" MaxLength="120" />',
  '<Field Type="Text" Name="ActionLabelEn" StaticName="ActionLabelEn" DisplayName="English action" MaxLength="120" />',
  '<Field Type="URL" Name="ActionUrl" StaticName="ActionUrl" DisplayName="Action URL" Format="Hyperlink" />',
  '<Field Type="Choice" Name="Priority" StaticName="Priority" DisplayName="Priority" Required="TRUE" Indexed="TRUE" AddToDefaultView="TRUE"><CHOICES><CHOICE>Information</CHOICE><CHOICE>Important</CHOICE><CHOICE>Urgent</CHOICE><CHOICE>Critical</CHOICE></CHOICES><Default>Information</Default></Field>',
  '<Field Type="DateTime" Name="StartDateTime" StaticName="StartDateTime" DisplayName="Start date and time" Required="TRUE" Indexed="TRUE" Format="DateTime" StorageTZ="UTC" AddToDefaultView="TRUE" />',
  '<Field Type="DateTime" Name="EndDateTime" StaticName="EndDateTime" DisplayName="End date and time" Required="TRUE" Indexed="TRUE" Format="DateTime" StorageTZ="UTC" AddToDefaultView="TRUE" />',
  '<Field Type="Boolean" Name="IsEnabled" StaticName="IsEnabled" DisplayName="Enabled" Required="TRUE" Indexed="TRUE" AddToDefaultView="TRUE"><Default>1</Default></Field>',
  '<Field Type="Boolean" Name="AllowDismiss" StaticName="AllowDismiss" DisplayName="Allow dismissal" Required="TRUE" AddToDefaultView="TRUE"><Default>1</Default></Field>'
];

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
      return { listUrl: this.listUrl, missingFields: [], status: 'missing' };
    }

    await ensureSuccess(listResponse, 'Unable to inspect the Priority Messages list.');

    const fieldsResponse: SPHttpClientResponse = await this._spHttpClient.get(
      `${this._listEndpoint}/fields?$select=InternalName`,
      SPHttpClient.configurations.v1,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );
    await ensureSuccess(fieldsResponse, 'Unable to inspect the Priority Messages fields.');

    const payload: IODataCollection<ISharePointFieldInfo> = await fieldsResponse.json();
    const availableFields: Set<string> = new Set<string>(
      payload.value.map((field: ISharePointFieldInfo) => field.InternalName)
    );
    const missingFields: string[] = requiredFieldNames.filter(
      (fieldName: string) => !availableFields.has(fieldName)
    );

    return {
      listUrl: this.listUrl,
      missingFields,
      status: missingFields.length > 0 ? 'incompatible' : 'ready'
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

    for (const schemaXml of fieldSchemas) {
      const fieldResponse: SPHttpClientResponse = await this._spHttpClient.post(
        `${this._listEndpoint}/fields/createfieldasxml`,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify({
            parameters: {
              __metadata: { type: 'SP.XmlSchemaFieldCreationInformation' },
              Options: 0,
              SchemaXml: schemaXml
            }
          }),
          headers: verboseJsonHeaders()
        }
      );
      await ensureSuccess(fieldResponse, 'Unable to create a Priority Messages field.');
    }

    const renameResponse: SPHttpClientResponse = await this._spHttpClient.post(
      this._listEndpoint,
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
    await ensureSuccess(renameResponse, 'Unable to localize the Priority Messages list title.');
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
}

function escapeOData(value: string): string {
  return value.replace(/'/g, "''");
}

function jsonHeaders(): Record<string, string> {
  return {
    Accept: 'application/json;odata=nometadata',
    'Content-Type': 'application/json;odata=nometadata'
  };
}

function verboseJsonHeaders(): Record<string, string> {
  return {
    Accept: 'application/json;odata=verbose',
    'Content-Type': 'application/json;odata=verbose'
  };
}

async function ensureSuccess(response: SPHttpClientResponse, message: string): Promise<void> {
  if (response.ok) {
    return;
  }

  throw new PriorityMessagesServiceError(message, response.status);
}
