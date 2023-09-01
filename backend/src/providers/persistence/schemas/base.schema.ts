import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseColumnSchemaPart = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'datetime',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'datetime',
    updateDate: true,
  } as EntitySchemaColumnOptions,
};
