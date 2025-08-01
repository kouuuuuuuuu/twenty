import { COMMAND_MENU_DEFAULT_ICON } from '@/workflow/workflow-trigger/constants/CommandMenuDefaultIcon';
import { DatabaseTriggerDefaultLabel } from '@/workflow/workflow-trigger/constants/DatabaseTriggerDefaultLabel';
import { generatedMockObjectMetadataItems } from '~/testing/mock-data/generatedMockObjectMetadataItems';
import { getTriggerDefaultDefinition } from '../getTriggerDefaultDefinition';

describe('getTriggerDefaultDefinition', () => {
  it('throws if the activeNonSystemObjectMetadataItems list is empty', () => {
    expect(() => {
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_CREATED,
        type: 'DATABASE_EVENT',
        activeNonSystemObjectMetadataItems: [],
      });
    }).toThrow();
  });

  it('returns a valid configuration for DATABASE_EVENT trigger type creation', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_CREATED,
        type: 'DATABASE_EVENT',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'DATABASE_EVENT',
      name: 'Record is created',
      settings: {
        eventName: `${generatedMockObjectMetadataItems[0].nameSingular}.created`,
        outputSchema: {},
      },
    });
  });

  it('returns a valid configuration for DATABASE_EVENT trigger type update', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_UPDATED,
        type: 'DATABASE_EVENT',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'DATABASE_EVENT',
      name: 'Record is updated',
      settings: {
        eventName: `${generatedMockObjectMetadataItems[0].nameSingular}.updated`,
        outputSchema: {},
      },
    });
  });

  it('returns a valid configuration for DATABASE_EVENT trigger type deletion', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_DELETED,
        type: 'DATABASE_EVENT',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'DATABASE_EVENT',
      name: 'Record is deleted',
      settings: {
        eventName: `${generatedMockObjectMetadataItems[0].nameSingular}.deleted`,
        outputSchema: {},
      },
    });
  });

  it('returns a valid configuration for DATABASE_EVENT trigger type creation', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_CREATED,
        type: 'DATABASE_EVENT',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'DATABASE_EVENT',
      name: 'Record is created',
      settings: {
        eventName: `${generatedMockObjectMetadataItems[0].nameSingular}.created`,
        outputSchema: {},
      },
    });
  });

  it('returns a valid configuration for MANUAL trigger type', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: 'Launch manually',
        type: 'MANUAL',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'MANUAL',
      name: 'Launch manually',
      settings: {
        objectType: generatedMockObjectMetadataItems[0].nameSingular,
        outputSchema: {},
        icon: COMMAND_MENU_DEFAULT_ICON,
      },
    });
  });

  it('returns a valid configuration for CRON trigger type', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: 'On a schedule',
        type: 'CRON',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'CRON',
      name: 'On a schedule',
      settings: {
        type: 'DAYS',
        schedule: { day: 1, hour: 0, minute: 0 },
        outputSchema: {},
      },
    });
  });

  it('returns a valid configuration for WEBHOOK trigger type', () => {
    expect(
      getTriggerDefaultDefinition({
        defaultLabel: 'Webhook',
        type: 'WEBHOOK',
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      }),
    ).toStrictEqual({
      type: 'WEBHOOK',
      name: 'Webhook',
      settings: {
        outputSchema: {},
        httpMethod: 'GET',
        authentication: null,
      },
    });
  });

  it('throws when providing an unknown trigger type', () => {
    expect(() => {
      getTriggerDefaultDefinition({
        defaultLabel: DatabaseTriggerDefaultLabel.RECORD_IS_CREATED,
        type: 'unknown' as any,
        activeNonSystemObjectMetadataItems: generatedMockObjectMetadataItems,
      });
    }).toThrow('Unknown type: unknown');
  });
});
