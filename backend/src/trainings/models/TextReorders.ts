import { TextReorder } from './TextReorder';

export const TextReorders = 'TextReorders';

export interface TextReorders {
  getAll: () => Promise<TextReorder[]>;
}
