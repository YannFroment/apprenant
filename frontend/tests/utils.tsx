import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/theme';
import {
  VoiceRecognitionContext,
  VoiceRecognitionServiceContainer,
} from '../src/voice-recognition/service-container/ServiceContainerContext';

const defaultContainer: VoiceRecognitionServiceContainer = {
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
  overrideContainer: Partial<VoiceRecognitionServiceContainer>,
): VoiceRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

export const TestContainer = ({
  children,
  overrideServices,
}: {
  children: ReactNode;
  overrideServices?: Partial<VoiceRecognitionServiceContainer>;
}) => {
  const container = createContainer(overrideServices ?? {});
  return (
    <VoiceRecognitionContext.Provider value={container}>
      {children}
    </VoiceRecognitionContext.Provider>
  );
};

export const renderWithinTheme = (children: ReactNode) => {
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
