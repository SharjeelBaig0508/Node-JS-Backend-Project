/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var certificate_controller = require('../controller/certificate_controller');
const response_codes = require('../utils/response_codes');
var certificate_utils = require('../utils/certificate_utils');

/* Middleware Imports */
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require("../middleware/request_validation");


/* GET: all Certificates. */
const get_all_certificates = async (req, res, next) => {
    const [ certificate, response_code, response_message ] = await certificate_controller.read_certificate_controller({});
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={certificate}
            ));
}

router.get('/', async (req, res, next) => {
    // Send all certificates from database with limited fields
    await common_utils.api_error_handler(req, res, next, get_all_certificates);
});


/* GET: single certificate in detail. */
const get_single_certificate = async (req, res, next) => {
    const [ certificate, response_code, response_message ] = await certificate_controller.read_certificate_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={certificate}
            ));
}

router.get('/:id', async (req, res, next) => {
    // Send certificate from database with all required fields
    await common_utils.api_error_handler(req, res, next, get_single_certificate);
});


/* POST: Create a Certificate. */
const create_certificate = async (req, res, next) => {
    const [ certificate, response_code, response_message ] = await certificate_controller.create_certificate_controller(req.body);
    if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={certificate}
            ));
}

router.post('/', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(certificate_utils.certificate_validation) ], 
    async (req, res, next) => {
        // Create a Certificate
        await common_utils.api_error_handler(req, res, next, create_certificate);
});


/* PUT: Update a Certificate. */
const edit_certificate = async (req, res, next) => {
    const [ certificate, response_code, response_message ] = await certificate_controller.edit_certificate_controller(req.params, req.body);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={certificate}
            ));
}

router.put('/:id', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(certificate_utils.certificate_update_validation) ], 
    async (req, res, next) => {
        // Update a certificate in database
        await common_utils.api_error_handler(req, res, next, edit_certificate);
});


/* DELETE: Delete a certificate. */
const remove_certificate = async (req, res, next) => {
    const [ certificate, response_code, response_message ] = await certificate_controller.remove_certificate_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
            ));
}

router.delete('/:id', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]) ], 
    async (req, res, next) => {
        // Remove a certificate in database
        await common_utils.api_error_handler(req, res, next, remove_certificate);
});


module.exports = router;
