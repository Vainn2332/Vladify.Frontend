export class TokenGetterNotSetError extends Error {
  constructor() {
    super("Token getter is not set. Please call AuthTokenBridge first.");
  }
}
