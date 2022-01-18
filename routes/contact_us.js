/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var email_controller = require('../controller/email_controller');
var email_utils = require('../utils/email_utils');
var response_codes = require('../utils/response_codes');

/* Middleware Imports */
var request_validation = require('../middleware/request_validation');


/* POST: Send an email. */
const generate_email = async (req, res, next) => {
    const [ info, response_code, response_message ] = await email_controller.email_generator(req.body);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={ info }
            ));
}

router.post('/', 
    [ request_validation.request_validator(email_utils.email_validation) ], 
    async (req, res, next) => {
    // Generate an Email
    await common_utils.api_error_handler(req, res, next, generate_email);
});


module.exports = router;
