// Error handling utility function
exports.handleError = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };
  