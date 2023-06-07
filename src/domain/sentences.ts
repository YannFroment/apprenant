export const cutTextIntoSentences = (text: string): string[] => {
  let textResult = text;
  const lastCharacter = text.charAt(text.length - 1);
  if (lastCharacter !== '.' && lastCharacter !== '!' && lastCharacter !== '?') {
    textResult = text + '.';
  }
  return textResult.match(/[A-Z][^.!?]*[.!?]/g) ?? [];
};
