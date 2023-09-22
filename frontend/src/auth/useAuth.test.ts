import { act, renderHook } from '@testing-library/react';

import { createWrapper, inMemoryBackend } from '../../tests/utils';
import { Backend } from '../domain/Backend';
import { Storage } from '../domain/Storage';
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

    it('should save the refresh token', async () => {
      const signIn = async () => ({
        access_token: '',
        refresh_token: 'refresh_token',
      });

      const backend: Backend = { ...inMemoryBackend, signIn };
      const inMemoryStorage: Storage = {
        saveRefreshToken: () => {},
        deleteRefreshToken: () => {},
      };
      const spyOnSaveRefreshToken = jest.spyOn(
        inMemoryStorage,
        'saveRefreshToken',
      );
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({ backend, storage: inMemoryStorage }),
      });

      await act(() =>
        result.current.signIn({
          email: 'email@email.com',
          password: 'password',
        }),
      );

      expect(spyOnSaveRefreshToken).toHaveBeenCalledWith('refresh_token');
    });
  });

  describe('logOut', () => {
    it('should delete access token', async () => {
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({
          useAuthStore: createUseAuthStore({ accessToken: 'access_token' }),
        }),
      });

      await act(() => result.current.logOut());

      expect(result.current.accessToken).toBeNull();
    });

    it('should delete refresh token', async () => {
      const inMemoryStorage = {
        saveRefreshToken: () => {},
        deleteRefreshToken: () => {},
      };
      const spyOnDeleteRefreshToken = jest.spyOn(
        inMemoryStorage,
        'deleteRefreshToken',
      );
      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({ storage: inMemoryStorage }),
      });

      await act(() => result.current.logOut());

      expect(spyOnDeleteRefreshToken).toHaveBeenCalled();
    });

    it('should call logOut endpoint', async () => {
      const spyOnLogOut = jest.spyOn(inMemoryBackend, 'logOut');

      const { result } = renderHook(useAuth, {
        wrapper: createWrapper({
          backend: inMemoryBackend,
          useAuthStore: createUseAuthStore({ accessToken: 'access_token' }),
        }),
      });

      await act(() => result.current.logOut());

      expect(spyOnLogOut).toHaveBeenCalledWith('access_token');
    });
  });
});
