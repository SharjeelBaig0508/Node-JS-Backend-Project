/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var banner_controller = require('../controller/banner_controller');
const response_codes = require('../utils/response_codes');
const banner_utils = require('../utils/banner_utils');

/* Middleware Imports */
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require("../middleware/request_validation");


/* GET: all banners. */
const get_all_banners = async (req, res, next) => {
    const [ banner, response_code, response_message ] = await banner_controller.read_banner_controller({});
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={banner}
            ));
}

router.get('/', async (req, res, next) => {
    // Send all banners from database with limited fields
    await common_utils.api_error_handler(req, res, next, get_all_banners);
});


/* GET: single banner in detail. */
const get_single_banner = async (req, res, next) => {
    const [ banner, response_code, response_message ] = await banner_controller.read_banner_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={banner}
            ));
}

router.get('/:id', async (req, res, next) => {
    // Send banner from database with all required fields
    await common_utils.api_error_handler(req, res, next, get_single_banner);
});


/* POST: Create a banner. */
const create_banner = async (req, res, next) => {
    const [ banner, response_code, response_message ] = await banner_controller.create_banner_controller(req.body);
    if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={banner}
            ));
}

router.post('/', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(banner_utils.banner_validation) ], 
    async (req, res, next) => {
        // Create a banner
        await common_utils.api_error_handler(req, res, next, create_banner);
});


/* PUT: Update a banner. */
const edit_banner = async (req, res, next) => {
    const [ banner, response_code, response_message ] = await banner_controller.edit_banner_controller(req.params, req.body);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={banner}
            ));
}

router.put('/:id', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(banner_utils.banner_update_validation) ],
    async (req, res, next) => {
        // Update a banner in database
        await common_utils.api_error_handler(req, res, next, edit_banner);
});


/* DELETE: Delete a banner member. */
const remove_banner = async (req, res, next) => {
    const [ banner, response_code, response_message ] = await banner_controller.remove_banner_controller(req.params);
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
        // Remove a banner in database
        await common_utils.api_error_handler(req, res, next, remove_banner);
});


module.exports = router;
