export class TextReorder {
  id: number;
  title: string;
  orderedSentences: string[];
  randomizedSentences: string[];
}

export type CreateTextReorderDTO = {
  title: string;
  orderedSentences: string[];
  randomizedSentences: string[];
};
