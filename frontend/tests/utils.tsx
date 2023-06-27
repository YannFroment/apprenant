import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import {
  AppContext,
  ServiceContainer,
} from '../src/service-container/ServiceContainerContext';
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
};

const createContainer = (
  overrideContainer: Partial<ServiceContainer>,
): ServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

export const TestContainer = ({
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

export const renderWithinTheme = (children: ReactNode) => {
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>,
  );
};
