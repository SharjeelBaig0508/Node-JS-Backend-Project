/* Node Imports */
const dotenv = require('dotenv');
dotenv.config();

/* Framework Imports */
var express = require("express");
var router = express.Router();

/* Local Imports */
const user_model = require("../model/user_model");
const user_controller = require("../controller/user_controller");
const constants = require('../utils/constants');
const common_utils = require('../utils/common_utils');
const response_codes = require('../utils/response_codes');
const user_utils = require('../utils/user_utils');

/* Middleware Imports */
const verify_signup = require("../middleware/verify_signup");
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require('../middleware/request_validation');


// GET self User
const fetch_self_user = async (req, res, next) => {
  return res.status(response_codes.CODE_RESPONSE_SUCCESS).send(common_utils.response_generator(
          response_codes.CODE_RESPONSE_SUCCESS, 
          response_codes.MESSAGE_RESPONSE_SUCCESS, 
          response_data={ user: user_utils.filter_user_object( req.user ) }
          ));
};

router.get('/self', 
  [ jwt_authentication.verify_token ],
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, fetch_self_user);
});

// GET all User
const fetch_all_users = async (req, res, next) => {
  const [ users, response_code, response_message ] = await user_controller.read_users_controller();
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ users }
          ));
};

router.get('/', 
  [ jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([ constants.ADMIN ]) ], 
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, fetch_all_users);
});

// GET single User
const fetch_single_user = async (req, res, next) => {
  const [ user, response_code, response_message ] = await user_controller.read_users_controller(req.params);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user }
          ));
};

router.get('/:id', 
  [ jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([ constants.ADMIN ]) ], 
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, fetch_single_user);
});


// Register User
const signup_user = async (req, res, next) => {
  const [ user, response_code, response_message ] = await user_controller.signup_user_controller(req.body);
  if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user }
          ));
};

router.post('/signup', 
  [ request_validation.request_validator(user_utils.user_validation),
    verify_signup.validate_username_and_email ], 
  async (req, res, next) => {
    // Only Simple Users can signup this way!!!
    await common_utils.api_error_handler(req, res, next, signup_user);
});

const create_user = async (req, res, next) => {
  const [ user, response_code, response_message ] = await user_controller.create_user_controller(req.body);
  if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user }
          ));
};

router.post('/', 
  [ jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([ constants.ADMIN ]),
    request_validation.request_validator(user_utils.user_validation),
    verify_signup.validate_username_and_email ], 
  async (req, res, next) => {
    // Only Admin Users can use this method!!!
    await common_utils.api_error_handler(req, res, next, create_user);
});

// Login User
const login_user = async (req, res, next) => {
  const [ user, token, response_code, response_message ] = await user_controller.login_user_controller(req.body);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user, token }
          ));
};

router.post('/login', 
  [ request_validation.request_validator(user_utils.user_login_validation) ],
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, login_user);
});

// Update User
const update_user = async (req, res, next) => {
  const [ user, response_code, response_message ] = await user_controller.update_user_controller(req.params, req.body);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user }
      ));
};

router.put('/:id', 
  [ jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([ constants.ADMIN ]),
    request_validation.request_validator(user_utils.user_update_validation),
    verify_signup.validate_username_and_email ], 
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, update_user);
});


// Delete User
const remove_user = async (req, res, next) => {
  const [ user, response_code, response_message ] = await user_controller.remove_user_controller(req.params);
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message
      ));
  }
  return res.status(response_code).send(common_utils.response_generator(
          response_code, 
          response_message, 
          response_data={ user }
          ));
};

router.delete('/:id', 
  [ jwt_authentication.verify_token,
    jwt_authentication.is_authentic_role([ constants.ADMIN ]) ], 
  async (req, res, next) => {
    await common_utils.api_error_handler(req, res, next, remove_user);
});

module.exports = router;
