import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
  describe('setAccessToken', () => {
    it('should update accessToken', () => {
      const { result } = renderHook(useAuthStore);
      const accessToken = 'access_token';

      act(() => result.current.setAccessToken(accessToken));

      expect(result.current.accessToken).toEqual(accessToken);
    });
  });
});
