import { nanoid } from "nanoid";

const users = {
  login: "password",
};
const tokens = {};

function fillTokens(login) {
  if (tokens[login] && tokens[login].clearAccessToken) {
    clearTimeout(tokens[login].clearAccessToken);
  }

  tokens[login] = {
    accessToken: nanoid(),
    refreshToken: nanoid(),
    clearAccessToken: setTimeout(() => {
      if (tokens[login]) {
        tokens[login].accessToken = undefined;
      }
    }, 1000 * 60 * 60),
  };

  return {
    accessToken: tokens[login].accessToken,
    refreshToken: tokens[login].refreshToken,
  };
}

export const authService = {
  register(login, password) {
    if (users[login]) {
      return { success: false, error: "User already exists" };
    }

    users[login] = password;

    return { success: true };
  },
  login(login, password) {
    if (!users[login] || users[login] !== password) {
      return { success: false, error: "Credentials are wrong" };
    }

    return { success: true, data: fillTokens(login) };
  },
  logout(login) {
    tokens[login] = {};

    return { success: true };
  },
  refresh(refreshToken) {
    const user = Object.entries(tokens).find(
      ([, tokens]) => refreshToken === tokens.refreshToken
    );
    if (!user) {
      return { success: false, error: "Credentials are wrong" };
    }

    return { success: true, data: fillTokens(user[0]) };
  },
  checkAuth(accessToken) {
    const user = Object.entries(tokens).find(
      ([, tokens]) => tokens.accessToken === accessToken
    );

    if (!user) {
      return { success: false };
    }

    return { success: true, data: user[0] };
  },
};
