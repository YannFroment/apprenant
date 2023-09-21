import { create, StoreApi, UseBoundStore } from 'zustand';

type AuthStoreState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

type UseStore = UseBoundStore<StoreApi<AuthStoreState>>;

export const createUseAuthStore = (
  args: Partial<AuthStoreState> = {},
): UseStore => {
  return create<AuthStoreState>((set) => ({
    accessToken: args.accessToken ?? null,
    setAccessToken: (accessToken: string | null) =>
      set(() => ({
        accessToken,
      })),
  }));
};

export type UseAuthStore = () => AuthStoreState;

const useStore = createUseAuthStore();
export const useAuthStore: UseAuthStore = () => {
  const { accessToken, setAccessToken } = useStore((state) => ({
    accessToken: state.accessToken,
    setAccessToken: state.setAccessToken,
  }));

  return {
    accessToken,
    setAccessToken,
  };
};
