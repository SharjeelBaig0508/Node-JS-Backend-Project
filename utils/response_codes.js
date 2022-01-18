/* This file will be used to store all the Response Messages of API */

module.exports = {
  // CODES BLOCK
  // - SUCCES BLOCK - 200
  CODE_RESPONSE_SUCCESS: 200,
  CODE_RESPONSE_CREATION_SUCCESS: 201,
  

  // - REDIRECTION BLOCK - 300

  // - CLIENT ERRORS BLOCK - 400
  CODE_BAD_REQUEST: 400,
  CODE_UNAUTHORIZED: 401,
  CODE_PAYMENT_REQUIRED: 402,
  CODE_FORBIDDEN: 403,
  CODE_NOT_FOUND: 404,

  // - SERVER ERRORS BLOCK - 500
  CODE_INTERNAL_SERVER_ERROR: 500,

  // MESSAGES BLOCK
  // - SUCCESS BLOCK
  MESSAGE_RESPONSE_SUCCESS: "Successful Response",
  MESSAGE_RESPONSE_CREATION_SUCCESS: "Record successfully inserted",

  // - CLIENT ERRORS BLOCK
  MESSAGE_RESPONSE_BAD_REQUEST: "Bad Request",
  MESSAGE_NOT_FOUND: "API not found",
  MESSAGE_TOKEN_REQUIRED: "Authorization Token is required",
  MESSAGE_BEARER_TOKEN_IS_REQUIRED: "Authorization must be a Bearer Token",
  MESSAGE_TOKEN_INVALID: "Unauthorized Access - Token Invalid",
  MESSAGE_ROLE_NOT_ALLOWED: "Role not allowed",

  // - SERVER ERRORS BLOCK
  MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR: "Something Went Wrong",

  // - PARAMS BLOCK
  MESSAGE_MISSING_PARAMETERS: "Some Paramters are missing: ", // When using it please concat missing parameters names :3
  MESSAGE_INVALID_PARAMETERS: "Invalid Parameter: ", // When using it please concat which param is wrong ;b
  MESSAGE_ERROR_WHILE_UPLOADING_IMAGE: "Error while uploading image",
  
  // - USER BLOCK
  MESSAGE_USER_ALREADY_EXISTS: "User already exists with: ",
  MESSAGE_INVALID_ROLE: "Invalid Role",
  MESSAGE_INVALID: "Invalid: ",

  // - EMAIL BLOCK
  MESSAGE_ERROR_WHILE_SENDING_EMAIL: "Failed sending email, please try again.",
};
