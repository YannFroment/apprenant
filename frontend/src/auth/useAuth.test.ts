import { act, renderHook } from '@testing-library/react';

import { createWrapper, inMemoryBackend } from '../../tests/utils';
import { Backend } from '../domain/Backend';
import { createUseAuthStore } from '../store/useAuthStore';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  describe('isLoggedIn', () => {
    it('should not be logged in by default', () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoggedIn).toBe(false);
    });

    it('should be logged in when access token is set', () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper(),
      });

      act(() => result.current.setAccessToken('token'));

      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  describe('signIn', () => {
    it('should call auth endpoint with email and password', async () => {
      const spyOnSignIn = jest.spyOn(inMemoryBackend, 'signIn');

      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({ backend: inMemoryBackend }),
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

    it('should save the access token', async () => {
      const signIn = async () => ({
        access_token: 'access_token',
        refresh_token: '',
      });

      const backend: Backend = { ...inMemoryBackend, signIn };
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({ backend }),
      });

      await act(() =>
        result.current.signIn({
          email: 'email@email.com',
          password: 'password',
        }),
      );

      expect(result.current.accessToken).toBe('access_token');
    });

    // TODO
    /**
     * persist refresh_token -> should be done within useAuth hook
     */
  });

  describe('logOut', () => {
    it('should logout', () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({
          useAuthStore: createUseAuthStore({ accessToken: 'access_token' }),
        }),
      });

      act(() => result.current.logOut());

      expect(result.current.accessToken).toBeNull();
    });
  });

  // TODO
  /**
   * create logOut method
   * should call backend logout method
   * should erase access token and refresh token
   *
   */
});
