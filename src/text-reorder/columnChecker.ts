import { ColumnsData } from './columnMapper';

export const columnChecker = (
  orderedSentences: string[],
  columnsData: ColumnsData,
) => {
  const orderedText = orderedSentences.join('');
  const proposedText = columnsData.columns['work-zone'].taskIds.reduce(
    (text: string, taskId) => {
      const sentence = columnsData.tasks[taskId].content;

      return text + sentence;
    },
    '',
  );

  return orderedText === proposedText;
};
