export const AUTH_COOKIE_NAME = 'Authorization';
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  // one day
  maxAge: 60 * 60 * 24,
  secure: true,
};
