/* Node Imports */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/* Framework Imports */
const bcrypt = require('bcryptjs');

/* Local Imports */
const user_model = require('../model/user_model');
const user_utils = require('../utils/user_utils');
const common_utils = require('../utils/common_utils');
const constants = require('../utils/constants');
const response_codes = require('../utils/response_codes');

/* CRUD Operations */
/* Create Operations */
signup_user_controller = async (signup_data) => {
  signup_data.password = await bcrypt.hash(signup_data.password, 11);
  signup_data.role = constants.USER;

  // User Creation
  const user = new user_model(signup_data);
  return await user.save().then(() => {
    return [ user_utils.filter_user_object(user),
             response_codes.CODE_RESPONSE_CREATION_SUCCESS,
             response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
  })
};

create_user_controller = async (user_data) => {
  user_data.password = await bcrypt.hash(user_data.password, 11);

  // User Creation
  const user = new user_model(user_data);
  return await user.save().then(() => {
    return [ user_utils.filter_user_object(user),
             response_codes.CODE_RESPONSE_CREATION_SUCCESS,
             response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
  })
};

/* Read Operations */
login_user_controller = async (login_data) => {
  // Login User
  return user_model.findOne({ email: login_data.email }).then(async (user) => {
      if (!user) {
        return [ null, null,
                 response_codes.CODE_NOT_FOUND, 
                 response_codes.MESSAGE_NOT_FOUND.replace("API", "User") ];
      }

      var password_is_valid = await bcrypt.compare( login_data.password, user.password );

      if (!password_is_valid) {
        return [ null, null,
                 response_codes.CODE_UNAUTHORIZED,
                 response_codes.MESSAGE_INVALID + 'password' ];
      }

      var token = jwt.sign({
        id: user._id,
        role: user.role
      }, 
      process.env.SESSION_SECRET, {
        expiresIn: 86400 // 24 hours
      });
      
      return [ user_utils.filter_user_object(user), 
               token, 
               response_codes.CODE_RESPONSE_SUCCESS, 
               response_codes.MESSAGE_RESPONSE_SUCCESS ];
    })
}

read_users_controller = async (filter_data) => {
  if (!filter_data) {
    const users = await user_model.find({ status: true });
    return [ user_utils.filter_multiple_user_object( users ),
             response_codes.CODE_RESPONSE_SUCCESS,
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
  }
  if (!common_utils.validate_id(filter_data.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

  const user = await user_model.find({ _id: filter_data.id, 
                                       status: true });
  return [ user_utils.filter_user_object( user ), 
           response_codes.CODE_RESPONSE_SUCCESS,
           response_codes.MESSAGE_RESPONSE_SUCCESS ];
};

/* Update Operations */
update_user_controller = async (filter_params, filter_body) => {
  if (!common_utils.validate_id(filter_params.id)) 
      return [ null, 
               response_codes.CODE_BAD_REQUEST, 
               response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];
  
  if (filter_body.password) filter_body.password = await bcrypt.hash(filter_body.password, 11);

  if (!common_utils.validate_id(filter_params.id)) 
  return [ null, 
           response_codes.CODE_BAD_REQUEST, 
           response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

  const user = await user_model.findOneAndUpdate(
      { _id: filter_params.id, }, filter_body, { returnDocument: "after" });

  return [ user_utils.filter_user_object(user), 
           response_codes.CODE_RESPONSE_SUCCESS, 
           response_codes.MESSAGE_RESPONSE_SUCCESS ];
};

/* Delete Operations */
remove_user_controller = async (filter_body) => {
  if (!common_utils.validate_id(filter_body.id)) 
      return [ null, 
               response_codes.CODE_BAD_REQUEST, 
               response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

  if (!common_utils.validate_id(filter_body.id)) 
    return [ null, 
            response_codes.CODE_BAD_REQUEST, 
            response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

  const user = await user_model.findOneAndUpdate(
      { _id: filter_body.id }, { status: false }, { returnDocument: "after" });

  return [ user_utils.filter_user_object(user), 
           response_codes.CODE_RESPONSE_SUCCESS, 
           response_codes.MESSAGE_RESPONSE_SUCCESS ];
}

module.exports = {
  read_users_controller,
  signup_user_controller,
  login_user_controller,
  remove_user_controller,
  update_user_controller,
  create_user_controller,
};
