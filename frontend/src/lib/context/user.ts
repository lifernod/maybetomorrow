import { getContext, setContext } from "svelte";

const USER_CONTEXT_KEY = Symbol("user");

export type UserContext = {
  username: string;
  userId: string;
  isAuthenticated: boolean;
};

export const setUserContext = (user: UserContext) => {
  setContext(USER_CONTEXT_KEY, user);
};

export const getUserContext = (): UserContext | null => {
  try {
    return getContext(USER_CONTEXT_KEY);
  } catch {
    return null;
  }
};

// Хелпер для получения имени пользователя
export const getCurrentUsername = (): string | null => {
  const user = getUserContext();
  return user?.username || null;
};