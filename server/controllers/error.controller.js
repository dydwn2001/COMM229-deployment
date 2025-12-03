function handleError(err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
function getErrorMessage(errMsg) {
  console.log(errMsg);
} 
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
