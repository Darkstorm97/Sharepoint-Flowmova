export interface IPriorityFieldDefinition {
  internalName: string;
  schemaXml: string;
  typeAsString: string;
}

export interface ISharePointFieldInfo {
  InternalName: string;
  Required?: boolean;
  ShowInEditForm?: boolean;
  ShowInNewForm?: boolean;
  Title?: string;
  TypeAsString: string;
}

export interface IPriorityListSchemaAnalysis {
  formConfigurationNeedsUpdate: boolean;
  incompatibleFields: string[];
  missingFields: string[];
}

export interface IPriorityFieldFormConfiguration {
  internalName: string;
  required: boolean;
  showInForms: boolean;
  title?: string;
}

export const priorityFormConfiguration: readonly IPriorityFieldFormConfiguration[] = [
  { internalName: 'Title', required: false, showInForms: false },
  { internalName: 'TitleFr', required: true, showInForms: true, title: 'Titre / Title' },
  { internalName: 'MessageFr', required: true, showInForms: true, title: 'Message' },
  { internalName: 'Priority', required: true, showInForms: true, title: 'Priorité / Priority' },
  {
    internalName: 'EndDateTime',
    required: false,
    showInForms: true,
    title: 'Date de fin / End date (facultative / optional)'
  },
  {
    internalName: 'ActionUrl',
    required: false,
    showInForms: true,
    title: 'Lien / Link (facultatif / optional)'
  },
  {
    internalName: 'TitleEn',
    required: false,
    showInForms: true,
    title: 'Titre anglais (facultatif) / English title (optional)'
  },
  {
    internalName: 'MessageEn',
    required: false,
    showInForms: true,
    title: 'Message anglais (facultatif) / English message (optional)'
  },
  { internalName: 'ActionLabelFr', required: false, showInForms: false },
  { internalName: 'ActionLabelEn', required: false, showInForms: false },
  { internalName: 'StartDateTime', required: false, showInForms: false },
  { internalName: 'IsEnabled', required: true, showInForms: false },
  { internalName: 'AllowDismiss', required: true, showInForms: false }
];

export const priorityFieldDefinitions: readonly IPriorityFieldDefinition[] = [
  {
    internalName: 'TitleFr',
    schemaXml: '<Field Type="Text" Name="TitleFr" StaticName="TitleFr" DisplayName="Titre / Title" MaxLength="255" Required="TRUE" AddToDefaultView="TRUE" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'MessageFr',
    schemaXml: '<Field Type="Note" Name="MessageFr" StaticName="MessageFr" DisplayName="Message" NumLines="6" RichText="FALSE" Required="TRUE" AddToDefaultView="TRUE" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'Note'
  },
  {
    internalName: 'Priority',
    schemaXml: '<Field Type="Choice" Name="Priority" StaticName="Priority" DisplayName="Priorité / Priority" Required="TRUE" AddToDefaultView="TRUE" ShowInNewForm="TRUE" ShowInEditForm="TRUE"><CHOICES><CHOICE>Information</CHOICE><CHOICE>Important</CHOICE><CHOICE>Urgent</CHOICE><CHOICE>Critical</CHOICE></CHOICES><Default>Information</Default></Field>',
    typeAsString: 'Choice'
  },
  {
    internalName: 'EndDateTime',
    schemaXml: '<Field Type="DateTime" Name="EndDateTime" StaticName="EndDateTime" DisplayName="Date de fin / End date (facultative / optional)" Format="DateTime" StorageTZ="UTC" AddToDefaultView="TRUE" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'DateTime'
  },
  {
    internalName: 'ActionUrl',
    schemaXml: '<Field Type="URL" Name="ActionUrl" StaticName="ActionUrl" DisplayName="Lien / Link (facultatif / optional)" Format="Hyperlink" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'URL'
  },
  {
    internalName: 'TitleEn',
    schemaXml: '<Field Type="Text" Name="TitleEn" StaticName="TitleEn" DisplayName="Titre anglais (facultatif) / English title (optional)" MaxLength="255" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'MessageEn',
    schemaXml: '<Field Type="Note" Name="MessageEn" StaticName="MessageEn" DisplayName="Message anglais (facultatif) / English message (optional)" NumLines="6" RichText="FALSE" ShowInNewForm="TRUE" ShowInEditForm="TRUE" />',
    typeAsString: 'Note'
  },
  {
    internalName: 'ActionLabelFr',
    schemaXml: '<Field Type="Text" Name="ActionLabelFr" StaticName="ActionLabelFr" DisplayName="Action française" MaxLength="120" ShowInNewForm="FALSE" ShowInEditForm="FALSE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'ActionLabelEn',
    schemaXml: '<Field Type="Text" Name="ActionLabelEn" StaticName="ActionLabelEn" DisplayName="English action" MaxLength="120" ShowInNewForm="FALSE" ShowInEditForm="FALSE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'StartDateTime',
    schemaXml: '<Field Type="DateTime" Name="StartDateTime" StaticName="StartDateTime" DisplayName="Start date and time" Format="DateTime" StorageTZ="UTC" ShowInNewForm="FALSE" ShowInEditForm="FALSE" />',
    typeAsString: 'DateTime'
  },
  {
    internalName: 'IsEnabled',
    schemaXml: '<Field Type="Boolean" Name="IsEnabled" StaticName="IsEnabled" DisplayName="Enabled" Required="TRUE" ShowInNewForm="FALSE" ShowInEditForm="FALSE"><Default>1</Default></Field>',
    typeAsString: 'Boolean'
  },
  {
    internalName: 'AllowDismiss',
    schemaXml: '<Field Type="Boolean" Name="AllowDismiss" StaticName="AllowDismiss" DisplayName="Allow dismissal" Required="TRUE" ShowInNewForm="FALSE" ShowInEditForm="FALSE"><Default>1</Default></Field>',
    typeAsString: 'Boolean'
  }
];

export function analyzePriorityListSchema(
  fields: readonly ISharePointFieldInfo[]
): IPriorityListSchemaAnalysis {
  const fieldsByName: Map<string, ISharePointFieldInfo> = new Map<string, ISharePointFieldInfo>(
    fields.map((field: ISharePointFieldInfo) => [field.InternalName, field])
  );
  const missingFields: string[] = [];
  const incompatibleFields: string[] = [];
  let formConfigurationNeedsUpdate: boolean = false;

  for (const definition of priorityFieldDefinitions) {
    const field: ISharePointFieldInfo | undefined = fieldsByName.get(definition.internalName);
    if (!field) {
      missingFields.push(definition.internalName);
    } else if (field.TypeAsString.toLowerCase() !== definition.typeAsString.toLowerCase()) {
      incompatibleFields.push(
        `${definition.internalName}: ${field.TypeAsString} → ${definition.typeAsString}`
      );
    }
  }

  for (const configuration of priorityFormConfiguration) {
    const field: ISharePointFieldInfo | undefined = fieldsByName.get(configuration.internalName);
    if (!field) {
      continue;
    }

    if (
      field.Required !== configuration.required ||
      (configuration.title !== undefined && field.Title !== configuration.title)
    ) {
      formConfigurationNeedsUpdate = true;
      break;
    }
  }

  return { formConfigurationNeedsUpdate, incompatibleFields, missingFields };
}
