/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var project_controller = require('../controller/project_controller');
const response_codes = require('../utils/response_codes');
const project_utils = require('../utils/project_utils');

/* Middleware Imports */
const jwt_authentication = require("../middleware/jwt_authentication");
const request_validation = require("../middleware/request_validation");


/* GET: all Projects. */
const get_all_projects = async (req, res, next) => {
    const [ project, response_code, response_message ] = await project_controller.read_project_controller({});
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={project}
            ));
}

router.get('/', async (req, res, next) => {
    // Send all projects from database with limited fields
    await common_utils.api_error_handler(req, res, next, get_all_projects);
});


/* GET: single project in detail. */
const get_single_project = async (req, res, next) => {
    const [ project, response_code, response_message ] = await project_controller.read_project_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={project}
            ));
}

router.get('/:id', async (req, res, next) => {
    // Send project from database with all required fields
    await common_utils.api_error_handler(req, res, next, get_single_project);
});


/* POST: Create a Project. */
const create_project = async (req, res, next) => {
    const [ project, response_code, response_message ] = await project_controller.create_project_controller(req.body);
    if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={project}
            ));
}

router.post('/', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(project_utils.project_validation) ], 
    async (req, res, next) => {
        // Create a Project
        await common_utils.api_error_handler(req, res, next, create_project);
});


/* PUT: Update a Project. */
const edit_project = async (req, res, next) => {
    const [ project, response_code, response_message ] = await project_controller.edit_project_controller(req.params, req.body);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={project}
            ));
}

router.put('/:id', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      request_validation.request_validator(project_utils.project_update_validation) ],
    async (req, res, next) => {
        // Update a project in database
        await common_utils.api_error_handler(req, res, next, edit_project);
});


/* DELETE: Delete a project member. */
const remove_project = async (req, res, next) => {
    const [ project, response_code, response_message ] = await project_controller.remove_project_controller(req.params);
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
        // Remove a project in database
        await common_utils.api_error_handler(req, res, next, remove_project);
});


module.exports = router;
