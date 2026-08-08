export interface IPriorityFieldDefinition {
  internalName: string;
  schemaXml: string;
  typeAsString: string;
}

export interface ISharePointFieldInfo {
  InternalName: string;
  TypeAsString: string;
}

export interface IPriorityListSchemaAnalysis {
  incompatibleFields: string[];
  missingFields: string[];
}

export const priorityFieldDefinitions: readonly IPriorityFieldDefinition[] = [
  {
    internalName: 'TitleFr',
    schemaXml: '<Field Type="Text" Name="TitleFr" StaticName="TitleFr" DisplayName="Titre français" MaxLength="255" AddToDefaultView="TRUE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'TitleEn',
    schemaXml: '<Field Type="Text" Name="TitleEn" StaticName="TitleEn" DisplayName="English title" MaxLength="255" AddToDefaultView="TRUE" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'MessageFr',
    schemaXml: '<Field Type="Note" Name="MessageFr" StaticName="MessageFr" DisplayName="Message français" NumLines="6" RichText="FALSE" AddToDefaultView="TRUE" />',
    typeAsString: 'Note'
  },
  {
    internalName: 'MessageEn',
    schemaXml: '<Field Type="Note" Name="MessageEn" StaticName="MessageEn" DisplayName="English message" NumLines="6" RichText="FALSE" AddToDefaultView="TRUE" />',
    typeAsString: 'Note'
  },
  {
    internalName: 'ActionLabelFr',
    schemaXml: '<Field Type="Text" Name="ActionLabelFr" StaticName="ActionLabelFr" DisplayName="Action française" MaxLength="120" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'ActionLabelEn',
    schemaXml: '<Field Type="Text" Name="ActionLabelEn" StaticName="ActionLabelEn" DisplayName="English action" MaxLength="120" />',
    typeAsString: 'Text'
  },
  {
    internalName: 'ActionUrl',
    schemaXml: '<Field Type="URL" Name="ActionUrl" StaticName="ActionUrl" DisplayName="Action URL" Format="Hyperlink" />',
    typeAsString: 'URL'
  },
  {
    internalName: 'Priority',
    schemaXml: '<Field Type="Choice" Name="Priority" StaticName="Priority" DisplayName="Priority" Required="TRUE" AddToDefaultView="TRUE"><CHOICES><CHOICE>Information</CHOICE><CHOICE>Important</CHOICE><CHOICE>Urgent</CHOICE><CHOICE>Critical</CHOICE></CHOICES><Default>Information</Default></Field>',
    typeAsString: 'Choice'
  },
  {
    internalName: 'StartDateTime',
    schemaXml: '<Field Type="DateTime" Name="StartDateTime" StaticName="StartDateTime" DisplayName="Start date and time" Required="TRUE" Format="DateTime" StorageTZ="UTC" AddToDefaultView="TRUE" />',
    typeAsString: 'DateTime'
  },
  {
    internalName: 'EndDateTime',
    schemaXml: '<Field Type="DateTime" Name="EndDateTime" StaticName="EndDateTime" DisplayName="End date and time" Required="TRUE" Format="DateTime" StorageTZ="UTC" AddToDefaultView="TRUE" />',
    typeAsString: 'DateTime'
  },
  {
    internalName: 'IsEnabled',
    schemaXml: '<Field Type="Boolean" Name="IsEnabled" StaticName="IsEnabled" DisplayName="Enabled" Required="TRUE" AddToDefaultView="TRUE"><Default>1</Default></Field>',
    typeAsString: 'Boolean'
  },
  {
    internalName: 'AllowDismiss',
    schemaXml: '<Field Type="Boolean" Name="AllowDismiss" StaticName="AllowDismiss" DisplayName="Allow dismissal" Required="TRUE" AddToDefaultView="TRUE"><Default>1</Default></Field>',
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

  return { incompatibleFields, missingFields };
}
