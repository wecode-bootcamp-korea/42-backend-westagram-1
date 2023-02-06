const globalErrorHandler = async (err, req, res) => {
  res.status(err.code || 500).json({ message: err.message });
};

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

module.exports = {
  globalErrorHandler,
  catchAsync,
};
