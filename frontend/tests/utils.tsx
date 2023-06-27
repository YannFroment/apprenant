import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/theme';
import {
  WordRecognitionContext,
  WordRecognitionServiceContainer,
} from '../src/word-recognition/service-container/ServiceContainerContext';

const defaultContainer: WordRecognitionServiceContainer = {
  speechSynth: { speak: () => {} },
  speechRecorderFactory: () => {
    return {
      start: () => {},
      stop: () => {},
    };
  },
  pictures: {
    get: async (searchKey) => {
      return searchKey;
    },
  },
};

const createContainer = (
  overrideContainer: Partial<WordRecognitionServiceContainer>,
): WordRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

export const TestContainer = ({
  children,
  overrideServices,
}: {
  children: ReactNode;
  overrideServices?: Partial<WordRecognitionServiceContainer>;
}) => {
  const container = createContainer(overrideServices ?? {});
  return (
    <WordRecognitionContext.Provider value={container}>
      {children}
    </WordRecognitionContext.Provider>
  );
};

export const renderWithinTheme = (children: ReactNode) => {
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>,
  );
};
