import {
  analyzePriorityListSchema,
  priorityFieldDefinitions,
  priorityFormConfiguration
} from '../domain/PriorityListSchema';

describe('PriorityListSchema', () => {
  it('marks every required field as missing for a new generic list', () => {
    const analysis = analyzePriorityListSchema([
      { InternalName: 'Title', TypeAsString: 'Text' }
    ]);

    expect(analysis.incompatibleFields).toEqual([]);
    expect(analysis.missingFields).toHaveLength(priorityFieldDefinitions.length);
    expect(analysis.missingFields).toContain('TitleFr');
    expect(analysis.missingFields).toContain('AllowDismiss');
  });

  it('detects an existing field whose type cannot be repaired safely', () => {
    const analysis = analyzePriorityListSchema([
      { InternalName: 'Priority', TypeAsString: 'Text' }
    ]);

    expect(analysis.incompatibleFields).toEqual(['Priority: Text → Choice']);
    expect(analysis.missingFields).not.toContain('Priority');
  });

  it('accepts a complete compatible schema', () => {
    const fields = priorityFormConfiguration.map((configuration) => {
      const definition = priorityFieldDefinitions.find(
        (field) => field.internalName === configuration.internalName
      );

      return {
        InternalName: configuration.internalName,
        Required: configuration.required,
        ShowInEditForm: configuration.showInForms,
        ShowInNewForm: configuration.showInForms,
        Title: configuration.title || configuration.internalName,
        TypeAsString: definition?.typeAsString || 'Text'
      };
    });

    expect(analyzePriorityListSchema(fields)).toEqual({
      formConfigurationNeedsUpdate: false,
      incompatibleFields: [],
      missingFields: []
    });
  });

  it('does not consume SharePoint list index slots during provisioning', () => {
    for (const definition of priorityFieldDefinitions) {
      expect(definition.schemaXml).not.toContain('Indexed="TRUE"');
    }
  });

  it('hides advanced fields from the standard SharePoint form', () => {
    const hiddenFields = ['ActionLabelFr', 'ActionLabelEn', 'StartDateTime', 'IsEnabled', 'AllowDismiss'];

    for (const internalName of hiddenFields) {
      const definition = priorityFieldDefinitions.find((field) => field.internalName === internalName);
      expect(definition?.schemaXml).toContain('ShowInNewForm="FALSE"');
      expect(definition?.schemaXml).toContain('ShowInEditForm="FALSE"');
    }
  });

  it('detects an existing list that still uses the long technical form', () => {
    const fields = priorityFieldDefinitions.map((definition) => ({
      InternalName: definition.internalName,
      Required: false,
      ShowInEditForm: true,
      ShowInNewForm: true,
      Title: definition.internalName,
      TypeAsString: definition.typeAsString
    }));

    expect(analyzePriorityListSchema(fields).formConfigurationNeedsUpdate).toBe(true);
  });
});
