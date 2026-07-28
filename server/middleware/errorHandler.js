function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

function globalErrorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = { notFoundHandler, globalErrorHandler };