class SequelizeDatabaseConnectionError extends Error {
  constructor(msg, error) {
    super(msg);
    this.error = error
  }
}

export {
  SequelizeDatabaseConnectionError
};