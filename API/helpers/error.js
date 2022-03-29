class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  return res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
};
module.exports = {
  ErrorHandler,
  handleError,
};
