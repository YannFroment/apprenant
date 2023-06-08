const FINAL_PUNCTUATIONS = ['.', '?', '!'];

export const addMissingFinalPunctuation = (rawText: string): string => {
  let text = rawText;

  const lastCharacter = rawText.charAt(rawText.length - 1);
  if (!FINAL_PUNCTUATIONS.includes(lastCharacter)) {
    text = rawText + '.';
  }
  return text;
};

export const cutTextIntoSentences = (text: string): string[] => {
  return addMissingFinalPunctuation(text).match(/[A-Z][^.!?]*[.!?]/g) ?? [];
};

export const checkSentencePosition = (
  sentences: string[],
  index: number,
  sentence: string,
) => {
  return sentences[index] === sentence;
};
