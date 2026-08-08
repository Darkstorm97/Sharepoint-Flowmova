import {
  analyzePriorityListSchema,
  priorityFieldDefinitions
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
    const fields = priorityFieldDefinitions.map((definition) => ({
      InternalName: definition.internalName,
      TypeAsString: definition.typeAsString
    }));

    expect(analyzePriorityListSchema(fields)).toEqual({
      incompatibleFields: [],
      missingFields: []
    });
  });

  it('does not consume SharePoint list index slots during provisioning', () => {
    for (const definition of priorityFieldDefinitions) {
      expect(definition.schemaXml).not.toContain('Indexed="TRUE"');
    }
  });
});
