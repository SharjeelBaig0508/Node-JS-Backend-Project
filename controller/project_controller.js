/* Node Imports */

/* Framework Imports */

/* Local Imports */
var project_model = require('../model/project_model');
var project_utils = require('../utils/project_utils');
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");


const read_project_controller = async (filter_body) => {
    if (common_utils.object_is_empty(filter_body)) {
        const project = await project_model.find({ status: true });

        return [ project_utils.filter_multiple_project_object(project), 
                 response_codes.CODE_RESPONSE_SUCCESS, 
                 response_codes.MESSAGE_RESPONSE_SUCCESS ];
    }
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const project = await project_model.findOne({ _id: filter_body.id,
                                                     status: true });

    return [ project_utils.filter_project_object(project), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}

const featured_project_controller = async (filter_body) => {
    const project = await project_model.find({ status: true }).sort({ rating: -1 }).limit(3);

    return [ project_utils.filter_multiple_project_object(project), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const create_project_controller = async (filter_body) => {
    const project = new project_model(filter_body);

    return await project.save().then(() => { 
            return [ project_utils.filter_project_object(project), 
                     response_codes.CODE_RESPONSE_CREATION_SUCCESS, 
                     response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
        }).catch(() => {
            return [ null,
                     response_codes.CODE_INTERNAL_SERVER_ERROR,
                     response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR ];
        });
}


const edit_project_controller = async (filter_params, filter_body) => {
    if (!filter_params.id)
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_MISSING_PARAMETERS + "id" ];

    
    if (!common_utils.validate_id(filter_params.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const project = await project_model.findOneAndUpdate(
        { _id: filter_params.id, }, filter_body, { returnDocument: "after" });

    return [ project_utils.filter_project_object(project), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const remove_project_controller = async (filter_body) => {
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const project = await project_model.findOneAndUpdate(
        { _id: filter_body.id }, { status: false }, { returnDocument: "after" });

    return [ project_utils.filter_project_object(project), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


module.exports = {
    read_project_controller,
    featured_project_controller,
    create_project_controller,
    edit_project_controller,
    remove_project_controller
}
