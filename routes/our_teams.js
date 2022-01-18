/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var our_teams_controller = require('../controller/our_teams_controller');
var response_codes = require('../utils/response_codes');
const our_teams_utils = require('../utils/our_teams_utils');

/* Middleware Imports */
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require('../middleware/request_validation');


/* GET: all teams. */
const get_all_teams = async (req, res, next) => {
    const [ our_team, response_code, response_message ] = await our_teams_controller.read_teams_controller({});
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={our_team}
            ));
}

router.get('/', 
    async (req, res, next) => {
        // Send all teams from database with limited fields
        await common_utils.api_error_handler(req, res, next, get_all_teams);
});


/* GET: single team in detail. */
const get_single_team = async (req, res, next) => {
    const [ our_team, response_code, response_message ] = await our_teams_controller.read_teams_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={our_team}
            ));
}

router.get('/:id', async (req, res, next) => {
    // Send team from database with all required fields
    await common_utils.api_error_handler(req, res, next, get_single_team);
});


/* POST: Create a team member. */
const create_team_member = async (req, res, next) => {
    const [ our_team, response_code, response_message ] = await our_teams_controller.create_teams_controller(req.body);
    if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={our_team}
            ));
}

router.post('/',
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(our_teams_utils.our_teams_validation) ], 
    async (req, res, next) => {
        // Create a team member
        await common_utils.api_error_handler(req, res, next, create_team_member);
});


/* PUT: Update a team member. */
const edit_team_member = async (req, res, next) => {
    const [ our_team, response_code, response_message ] = await our_teams_controller.edit_teams_controller(req.params, req.body);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={our_team}
            ));
}

router.put('/:id', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]), 
      request_validation.request_validator(our_teams_utils.our_teams_update_validation) ], 
    async (req, res, next) => {
        // Update a team in database
        await common_utils.api_error_handler(req, res, next, edit_team_member);
});


/* DELETE: Delete a team member. */
const remove_team_member = async (req, res, next) => {
    const [ our_team, response_code, response_message ] = await our_teams_controller.remove_teams_controller(req.params);
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
        // Remove a team in database
        await common_utils.api_error_handler(req, res, next, remove_team_member);
});


module.exports = router;
