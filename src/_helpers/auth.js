const authToken = {
  isAuthenticated: false,
  token: null,
};

export function logout() {
  // TODO: should clear session cashe
  authToken.isAuthenticated = false;
  authToken.token = null;
}

export default authToken;
