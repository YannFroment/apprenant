import { act, renderHook } from '@testing-library/react';

import { createWrapper, inMemoryBackend } from '../../tests/utils';
import { Backend } from '../domain/Backend';
import { createUseAuth } from './useAuth';

describe('useAuth', () => {
  it('should set accessToken', () => {
    const { result } = renderHook(createUseAuth(), {
      wrapper: createWrapper(),
    });

    act(() => result.current.setAccessToken('token'));

    expect(result.current.accessToken).toBe('token');
  });

  describe('signIn', () => {
    it('should call auth endpoint with email and password', async () => {
      const signIn = async () => {};
      const backend: Backend = { ...inMemoryBackend, signIn };
      const spyOnSignIn = jest.spyOn(backend, 'signIn');

      const { result } = renderHook(createUseAuth(), {
        wrapper: createWrapper({ backend }),
      });

      await act(() =>
        result.current.signIn({
          email: 'email@email.com',
          password: 'password',
        }),
      );

      expect(spyOnSignIn).toHaveBeenCalledWith({
        email: 'email@email.com',
        password: 'password',
      });
    });
  });
});
