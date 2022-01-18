/* Node Imports */

/* Framework Imports */

/* Local Imports */
const user_model = require('../model/user_model');
const common_utils = require('../utils/common_utils');
const constants = require('../utils/constants');
const response_codes = require('../utils/response_codes');


validate_username_and_email = async (req, res, next) => {
    // Validation - Email Address
    user_model.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(response_codes.CODE_BAD_REQUEST).send(
                common_utils.response_generator(
                    response_codes.CODE_BAD_REQUEST, 
                    response_codes.MESSAGE_USER_ALREADY_EXISTS + "email")
            );
        }

        // Validation - Username
        user_model.findOne({ username: req.body.username }).then(user => {
            if (user) {
                return res.status(response_codes.CODE_BAD_REQUEST).send(
                    common_utils.response_generator(
                        response_codes.CODE_BAD_REQUEST, 
                        response_codes.MESSAGE_USER_ALREADY_EXISTS + "username")
                );
            }
            next();
        });
    })
};

validate_user_role = async (req, res, next) => {
    if (req.body.role) {
        if (!constants.ROLES.includes(req.body.role)) {
            return res.status(response_codes.CODE_BAD_REQUEST).send(
                common_utils.response_generator(
                    response_codes.CODE_BAD_REQUEST, 
                    response_codes.MESSAGE_INVALID_ROLE)
            );
        }
    }
    next();
};

module.exports = {
    validate_username_and_email,
    validate_user_role
}
