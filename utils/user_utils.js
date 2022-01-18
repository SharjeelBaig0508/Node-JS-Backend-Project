/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */
const common_utils = require("./common_utils");
const constants = require('./constants');


filter_multiple_user_object = (users) => {
    let user_array = [];
    users.forEach(user => {
        user_array.push({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        })
    });
    return user_array;
}


filter_user_object = (user) => {
    if (!user){
        return {}
    }
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at
    }
}


/* Our users Validation */
user_validation = async (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().default(constants.USER).valid(...constants.ROLES)
    });
    return schema.validate(data);
}


user_update_validation = async (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3),
        password: Joi.string().min(6),
        role: Joi.string().valid(...constants.ROLES)
    });
    return schema.validate(data);
}

user_login_validation = async (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}


module.exports = {
    filter_multiple_user_object,
    filter_user_object,
    user_validation,
    user_update_validation,
    user_login_validation
}
