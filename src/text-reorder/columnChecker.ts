import { ColumnsFormat } from './columnMapper';

export const columnChecker = (
  orderedSentences: string[],
  columnsFormat: ColumnsFormat,
) => {
  const orderedText = orderedSentences.join('');
  const proposedText = columnsFormat.columns['work-zone'].taskIds.reduce(
    (text: string, taskId) => {
      const sentence = columnsFormat.tasks[taskId].content;

      return text + sentence;
    },
    '',
  );

  return orderedText === proposedText;
};
