/* Node Imports */

/* Framework Imports */

/* Local Imports */
var our_teams_model = require('../model/our_teams_model');
var our_teams_utils = require('../utils/our_teams_utils');
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");


const read_teams_controller = async (filter_body) => {
    if (common_utils.object_is_empty(filter_body)) {
        const our_team = await our_teams_model.find({ status: true });

        return [ our_teams_utils.filter_multiple_our_teams_object(our_team), 
                 response_codes.CODE_RESPONSE_SUCCESS, 
                 response_codes.MESSAGE_RESPONSE_SUCCESS ];
    }
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const our_team = await our_teams_model.findOne({ _id: filter_body.id,
                                                     status: true });

    return [ our_teams_utils.filter_our_teams_object(our_team), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const featured_teams_controller = async (filter_body) => {
    const our_team = await our_teams_model.find({ status: true }).sort({ rating: -1 }).limit(3);

    return [ our_teams_utils.filter_multiple_our_teams_object(our_team), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const create_teams_controller = async (filter_body) => {
    const our_team = new our_teams_model(filter_body);

    return await our_team.save().then(() => { 
            return [ our_teams_utils.filter_our_teams_object(our_team), 
                     response_codes.CODE_RESPONSE_CREATION_SUCCESS, 
                     response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
        }).catch(() => {
            return [ null,
                     response_codes.CODE_INTERNAL_SERVER_ERROR,
                     response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR ];
        });
}


const edit_teams_controller = async (filter_params, filter_body) => {
    if (!filter_params.id)
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_MISSING_PARAMETERS + "id" ];

    
    if (!common_utils.validate_id(filter_params.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];
                 
    const our_team = await our_teams_model.findOneAndUpdate(
        { _id: filter_params.id, }, filter_body, { returnDocument: "after" });

    return [ our_teams_utils.filter_our_teams_object(our_team), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const remove_teams_controller = async (filter_body) => {
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const our_team = await our_teams_model.findOneAndUpdate(
        { _id: filter_body.id }, { status: false }, { returnDocument: "after" });

    return [ our_teams_utils.filter_our_teams_object(our_team), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


module.exports = {
    read_teams_controller,
    featured_teams_controller,
    create_teams_controller,
    edit_teams_controller,
    remove_teams_controller
}
