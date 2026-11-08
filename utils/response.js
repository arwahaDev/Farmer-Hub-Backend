const ok = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const fail = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = { ok, fail };