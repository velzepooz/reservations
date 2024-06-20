export const AUTH_CONSTRAINTS = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REGEX:
      // allow only alphanumeric characters, symbols, and special characters
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    // allow only alphanumeric characters
    REGEX: /^[a-zA-Z0-9_]{3,32}$/,
  },
};
