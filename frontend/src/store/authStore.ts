import { makeAutoObservable } from "mobx";
import { api } from "../api";
import { isSuccessResponse, Response } from "../types/response";
interface AuthStore {
  error: string | undefined;
  authenticated: boolean | undefined;
  login(body: { login: string; password: string }): void;
  refresh(): Generator<Promise<unknown>, boolean, Response<never>>;
  logout(): void;
  checkAuth(): void;
}

export const authStore = makeAutoObservable<AuthStore>({
  error: undefined,
  authenticated: undefined,
  *login(body) {
    const result: Response = yield api.login(body);
    if (isSuccessResponse(result)) {
      authStore.authenticated = true;
      authStore.error = undefined;
    } else {
      authStore.authenticated = false;
      authStore.error = result.error;
    }
  },
  *refresh() {
    const result: Response = yield api.refresh();
    return result.success;
  },
  *checkAuth() {
    const result: boolean = yield api.checkAuth();
    if (result) {
      authStore.authenticated = true;
      authStore.error = undefined;
    } else {
      authStore.authenticated = false;
    }
  },
  *logout() {
    yield api.logout();
    authStore.authenticated = false;
    authStore.error = undefined;
  },
});
