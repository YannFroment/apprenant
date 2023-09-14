import { act, renderHook } from '@testing-library/react';

import { createUseAuth } from './useAuth';

describe('useAuth', () => {
  it('should set accessToken', () => {
    const { result } = renderHook(createUseAuth());

    act(() => result.current.setAccessToken('token'));

    expect(result.current.accessToken).toBe('token');
  });
});
