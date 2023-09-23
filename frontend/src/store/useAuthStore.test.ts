import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
  describe('setIsLoggedIn', () => {
    it('should update accessToken', () => {
      const { result } = renderHook(useAuthStore);
      const isLoggedIn = true;

      act(() => result.current.setIsLoggedIn(isLoggedIn));

      expect(result.current.isLoggedIn).toEqual(isLoggedIn);
    });
  });
});
