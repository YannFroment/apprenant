import { act, renderHook } from '@testing-library/react';

import { createWrapper, inMemoryBackend } from '../../tests/utils';
import { Backend } from '../domain/Backend';
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
      const signIn = async () => ({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
      const backend: Backend = { ...inMemoryBackend, signIn };
      const spyOnSignIn = jest.spyOn(backend, 'signIn');

      const { result } = renderHook(useAuth, {
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

    it('should save the access token', async () => {
      const signIn = async () => ({
        access_token: 'received_access_token',
        refresh_token: 'received_refresh_token',
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

      expect(result.current.accessToken).toBe('received_access_token');
    });

    // TODO
    /**
     * save access_token -> should be done within useAuth hook
     * persist refresh_token -> should be done within useAuth hook
     */
  });

  // TODO
  /**
   * create logOut method
   * should call backend logout method
   * should erase access token and refresh token
   *
   */
});
