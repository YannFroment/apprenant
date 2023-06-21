import { render, screen, waitFor, within } from '@testing-library/react';
import { TextReorder } from '.';
import { ColumnsData } from './ColumnsData';

describe('TextReorder', () => {
  it('should display sentences in the initial columns and positions', async () => {
    const sentenceA = 'A';
    const sentenceB = 'B';
    const sentenceAId = 'sentence-1';
    const sentenceBId = 'sentence-2';
    render(
      <TextReorder
        orderedSentences={[sentenceA, sentenceB]}
        randomizedSentences={[sentenceA, sentenceB]}
      />,
    );

    await waitFor(() => {
      const workZone = screen.queryByTestId('column-work-zone');
      expect(workZone).toBeInTheDocument();
      const workZoneTaskList = within(workZone!).queryByTestId(
        'tasklist-work-zone',
      );
      expect(workZoneTaskList).toBeInTheDocument();
      expect(workZoneTaskList?.children.length).toBe(0);

      const pickingZone = screen.queryByTestId('column-picking-zone');
      expect(pickingZone).toBeInTheDocument();
      const pickingZoneTaskList = within(pickingZone!).queryByTestId(
        'tasklist-picking-zone',
      );
      expect(pickingZoneTaskList).toBeInTheDocument();

      expect(
        within(pickingZone!).queryByTestId(`task-${sentenceAId}`),
      ).toBeInTheDocument();
      expect(
        within(pickingZone!).queryByTestId(`task-${sentenceBId}`),
      ).toBeInTheDocument();
      expect(pickingZoneTaskList?.textContent).toBe(`${sentenceA}${sentenceB}`);
    });
  });
});

describe('text ordered', () => {
  it('it should show check if text is completely ordered', () => {
    const sentenceA = 'A';
    const sentenceB = 'B';
    const columnsData: ColumnsData = {
      tasks: {
        'sentence-1': { id: 'sentence-1', content: 'A' },
        'sentence-2': { id: 'sentence-2', content: 'B' },
      },
      columns: {
        'work-zone': {
          id: 'work-zone',
          title: 'work-zone',
          taskIds: ['sentence-1', 'sentence-2'],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: [],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };
    render(
      <TextReorder
        orderedSentences={[sentenceA, sentenceB]}
        randomizedSentences={[sentenceA, sentenceB]}
        defaultColumnsData={columnsData}
      />,
    );

    expect(screen.queryByTestId('text-success')).toBeInTheDocument();
  });

  it('it should not show check if text is not completely ordered', () => {
    const sentenceA = 'A';
    const sentenceB = 'B';
    const columnsData: ColumnsData = {
      tasks: {
        'sentence-1': { id: 'sentence-1', content: 'A' },
        'sentence-2': { id: 'sentence-2', content: 'B' },
      },
      columns: {
        'work-zone': {
          id: 'work-zone',
          title: 'work-zone',
          taskIds: ['sentence-2', 'sentence-1'],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: [],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };
    render(
      <TextReorder
        orderedSentences={[sentenceA, sentenceB]}
        randomizedSentences={[sentenceB, sentenceA]}
        defaultColumnsData={columnsData}
      />,
    );

    expect(screen.queryByTestId('text-success')).not.toBeInTheDocument();
  });
});
