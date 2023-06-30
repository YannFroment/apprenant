import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
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
  backend: {
    get: async (url) => {
      return url;
    },
    getTextReorders: async () => {
      return [];
    },
  },
  useTrainingsStore: () => ({
    textReorders: [],
    setTextReorders: () => {},
    useCurrentTextReorder: () => undefined,
  }),
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

export const renderWithinProviders = (
  children: ReactNode,
  overrideServices?: Partial<ServiceContainer>,
) => {
  render(
    <ThemeProvider theme={theme}>
      <TestContainer overrideServices={overrideServices}>
        <BrowserRouter>{children}</BrowserRouter>
      </TestContainer>
    </ThemeProvider>,
  );
};

export const renderWithinRoutes = ({
  routes,
  initialEntries,
  overrideServices,
}: {
  routes: { path: string; element: ReactNode }[];
  initialEntries: string[];
  overrideServices?: Partial<ServiceContainer>;
}) => {
  render(
    <ThemeProvider theme={theme}>
      <TestContainer overrideServices={overrideServices}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            {routes.map(({ path, element }) => {
              return <Route path={path} element={element} />;
            })}
          </Routes>
        </MemoryRouter>
      </TestContainer>
    </ThemeProvider>,
  );
};
