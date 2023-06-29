export type TextReorder = {
  id: number;
  title: string;
  orderedSentences: string[];
  randomizedSentences: string[];
};

export type Backend = {
  get: (url: string) => Promise<string>;
  getTextReorders: () => Promise<TextReorder[]>;
};
