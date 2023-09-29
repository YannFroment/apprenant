import { act, renderHook } from '@testing-library/react';

import { createWrapper, inMemoryBackend } from '../../tests/utils';
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

    it('should log in', async () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper(),
      });

      await act(() =>
        result.current.signIn({
          email: 'email@email.com',
          password: 'password',
        }),
      );

      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  describe('logOut', () => {
    it('should delete access token', async () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({
          useAuthStore: createUseAuthStore({ isLoggedIn: true }),
        }),
      });

      await act(() => result.current.logOut());

      expect(result.current.isLoggedIn).toBe(false);
    });

    it('should call logOut endpoint', async () => {
      const spyOnLogOut = jest.spyOn(inMemoryBackend, 'logOut');

      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({
          backend: inMemoryBackend,
        }),
      });

      await act(() => result.current.logOut());

      expect(spyOnLogOut).toHaveBeenCalled();
    });
  });
});
