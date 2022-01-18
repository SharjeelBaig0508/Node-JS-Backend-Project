/* Node Imports */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/* Framework Imports */

/* Local Imports */
const user_model = require('../model/user_model');
const common_utils = require('../utils/common_utils');
const constants = require('../utils/constants');
const response_codes = require('../utils/response_codes');


verify_token = async (req, res, next) => {
    let bearer_token = req.headers["authorization"];

    if (!bearer_token) {
        return res.status(response_codes.CODE_FORBIDDEN).send(
            common_utils.response_generator(
                response_codes.CODE_FORBIDDEN,
                response_codes.MESSAGE_TOKEN_REQUIRED
            )
        );
    }
    
    if (!(bearer_token.split(" ").length > 1)) {
        return res.status(response_codes.CODE_UNAUTHORIZED).send(
            common_utils.response_generator(
                response_codes.CODE_UNAUTHORIZED,
                response_codes.MESSAGE_BEARER_TOKEN_IS_REQUIRED
            )
        );
    }

    if (bearer_token.split(" ")[0] !== "Bearer") {
        return res.status(response_codes.CODE_UNAUTHORIZED).send(
            common_utils.response_generator(
                response_codes.CODE_UNAUTHORIZED,
                response_codes.MESSAGE_BEARER_TOKEN_IS_REQUIRED
            )
        );
    }

    let token = bearer_token.split(" ")[1];
    
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(response_codes.CODE_UNAUTHORIZED).send(
                common_utils.response_generator(
                    response_codes.CODE_UNAUTHORIZED,
                    response_codes.MESSAGE_TOKEN_INVALID
                )
            );
        }
        var user = await user_model.findOne({ _id: decoded.id });
        if (!user | !user?.status) {
            return res.status(response_codes.CODE_UNAUTHORIZED).send(
                common_utils.response_generator(
                    response_codes.CODE_UNAUTHORIZED,
                    response_codes.MESSAGE_TOKEN_INVALID
                )
            );
        } 
        req.user = user;
        next();
    });
};


is_authentic_role = (roles_allowed) => {
    return async (req, res, next) => {
        if (!roles_allowed.includes(req.user.role)) {
            return res.status(response_codes.CODE_FORBIDDEN).send(
                common_utils.response_generator( 
                    response_codes.CODE_FORBIDDEN,
                    response_codes.MESSAGE_ROLE_NOT_ALLOWED ));
        }
        next();
    };
}


module.exports = {
    verify_token,
    is_authentic_role
}
