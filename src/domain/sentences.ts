const PUNCTUATIONS = ['.', '?', '!'];

export const addMissingPunctuation = (rawText: string): string => {
  let text = rawText;

  const lastCharacter = rawText.charAt(rawText.length - 1);
  if (!PUNCTUATIONS.includes(lastCharacter)) {
    text = rawText + '.';
  }
  return text;
};

export const cutTextIntoSentences = (text: string): string[] => {
  return addMissingPunctuation(text).match(/[A-Z][^.!?]*[.!?]/g) ?? [];
};
