export const cutTextIntoSentences = (text: string): string[] => {
  return text.match(/[A-Z][^.!?]*[.!?]/g) ?? [];
};
