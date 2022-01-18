/* Node Imports */

/* Framework Imports */

/* Local Imports */
const response_codes = require("../utils/response_codes");
const common_utils = require("../utils/common_utils");

request_validator = (validator_function) => {
    return async (req, res, next) => {
        const { value, error } = await validator_function(req.body);
        if (error) 
            return res.status(response_codes.CODE_BAD_REQUEST).send(common_utils.response_generator(
                response_codes.CODE_BAD_REQUEST, 
                error.details[0].message
            ));
        req.body = value;
        next();
    };
}


module.exports = {
    request_validator
}
