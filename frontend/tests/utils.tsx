import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { createUseAuth } from '../src/auth/useAuth';
import { Backend } from '../src/domain/Backend';
import {
  AppContext,
  ServiceContainer,
} from '../src/service-container/ServiceContainerContext';
import { useTrainingsStore } from '../src/store';
import { theme } from '../src/theme';

export const inMemoryBackend: Backend = {
  getTrainings: async () => {
    return { textReorders: [], wordRecognitions: [] };
  },
};

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
  backend: inMemoryBackend,
  useTrainingsStore,
  useAuth: createUseAuth(),
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
