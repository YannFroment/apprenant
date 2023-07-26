import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import {
  AppContext,
  ServiceContainer,
} from '../src/service-container/ServiceContainerContext';
import { useTrainingsStore } from '../src/store';
import { theme } from '../src/theme';

const defaultContainer: ServiceContainer = {
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
  backend: {
    getTextReorders: async () => {
      return [];
    },
    getWordRecognitions: async () => {
      return [];
    },
  },
  useTrainingsStore,
};

const createContainer = (
  overrideContainer: Partial<ServiceContainer>,
): ServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

const TestContainer = ({
  children,
  overrideServices,
}: {
  children: ReactNode;
  overrideServices?: Partial<ServiceContainer>;
}) => {
  const container = createContainer(overrideServices ?? {});
  return (
    <AppContext.Provider value={container}>{children}</AppContext.Provider>
  );
};

export const renderWithinProviders = ({
  children,
  overrideServices,
  wrapInRouter = true,
}: {
  children: ReactNode;
  overrideServices?: Partial<ServiceContainer>;
  wrapInRouter?: boolean;
}) => {
  render(
    <ThemeProvider theme={theme}>
      <TestContainer overrideServices={overrideServices}>
        {wrapInRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </TestContainer>
    </ThemeProvider>,
  );
};
