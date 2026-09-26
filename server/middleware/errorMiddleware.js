exports.notFound = (req, res, next) => { res.status(404); next(new Error(`Not found: ${req.originalUrl}`)); };
exports.errorHandler = (err, req, res, _next) => {
  let status = res.statusCode >= 400 ? res.statusCode : 500, message = err.message;
  if (err.name === 'ValidationError') { status = 400; message = Object.values(err.errors).map(e => e.message).join(', '); }
  if (err.name === 'CastError') { status = 400; message = 'Invalid id'; }
  if (err.code === 11000) { status = 409; message = 'Duplicate value: ' + Object.keys(err.keyValue).join(', '); }
  res.status(status).json({ message, stack: process.env.NODE_ENV === 'production' ? undefined : err.stack });
};
