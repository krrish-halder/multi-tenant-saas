class ApiResponse {
  static success(res, message = "Success", data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      status: 1,
      message,
      data,
    });
  }

  static error(res, message = "Error", data = {}, statusCode = 400) {
    return res.status(statusCode).json({
      status: 0,
      message,
      data,
    });
  }
}

module.exports = ApiResponse;
