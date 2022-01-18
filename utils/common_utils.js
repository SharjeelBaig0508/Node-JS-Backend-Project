/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */
var response_codes = require("../utils/response_codes");


const api_error_handler = async (req, res, next, call_back) => {
  try{
    return await call_back(req, res, next);
  }
  catch (err) {
    console.error(err);
    return res.status(response_codes.CODE_INTERNAL_SERVER_ERROR).json({
      response_code: response_codes.CODE_INTERNAL_SERVER_ERROR,
      response_message: response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR
    });
  }
}


const response_generator = (response_code, response_message, response_data = null) => {
  if (!response_data)
    return { response_code, response_message };
  
  return { response_code, response_message, response_data };
};


const object_is_empty = (object) => {
  return Object.keys(object).length < 1;
}


const validate_id = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
}


const validate_required_parameters = async (input_object, required_parameters) => {
  return required_parameters.filter(x => !Object.keys(input_object).includes(x));
}

module.exports = {
  api_error_handler,
  response_generator,
  object_is_empty,
  validate_id,
  validate_required_parameters
};
