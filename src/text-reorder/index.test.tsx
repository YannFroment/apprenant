import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { TextReorderTraining } from '.';

describe('TextReorderTraining', () => {
  it('should display sentences in the initial columns and positions', async () => {
    const sentenceA = 'A';
    const sentenceB = 'B';
    const sentenceAId = 'sentence-1';
    const sentenceBId = 'sentence-2';
    render(<TextReorderTraining sentences={[sentenceA, sentenceB]} />);

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

    // const sentenceAElement = screen.queryByTestId(`task-${sentenceA}`);
    // console.info('sentenceAElement', sentenceAElement);
    // await act(() => {
    //   fireEvent.dragStart(sentenceAElement!);
    // });
  });
});
