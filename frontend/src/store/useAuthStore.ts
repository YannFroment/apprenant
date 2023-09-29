import { create, StoreApi, UseBoundStore } from 'zustand';

type AuthStoreState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

type UseStore = UseBoundStore<StoreApi<AuthStoreState>>;

export const createUseAuthStore = (
  args: Partial<AuthStoreState> = {},
): UseStore => {
  return create<AuthStoreState>((set) => ({
    isLoggedIn: !!args.isLoggedIn,
    setIsLoggedIn: (isLoggedIn: boolean) =>
      set(() => ({
        isLoggedIn,
      })),
  }));
};

export type UseAuthStore = () => AuthStoreState;

const useStore = createUseAuthStore();
export const useAuthStore: UseAuthStore = () => {
  const { isLoggedIn, setIsLoggedIn } = useStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn,
  }));

  return {
    isLoggedIn,
    setIsLoggedIn,
  };
};
