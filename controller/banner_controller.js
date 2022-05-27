/* Node Imports */

/* Framework Imports */

/* Local Imports */
var banner_model = require('../model/banner_model');
var banner_utils = require('../utils/banner_utils');
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");


const read_banner_controller = async (filter_body) => {
    if (common_utils.object_is_empty(filter_body)) {
        const banner = await banner_model.find({ status: true });

        return [ banner_utils.filter_multiple_banner_object(banner), 
                 response_codes.CODE_RESPONSE_SUCCESS, 
                 response_codes.MESSAGE_RESPONSE_SUCCESS ];
    }
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const banner = await banner_model.findOne({ _id: filter_body.id,
                                                     status: true });

    return [ banner_utils.filter_banner_object(banner), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}

const featured_banner_controller = async (filter_body) => {
    const banner = await banner_model.find({ status: true }).sort({ rating: -1 }).limit(3);

    return [ banner_utils.filter_multiple_banner_object(banner), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const create_banner_controller = async (filter_body) => {
    const banner = new banner_model(filter_body);

    return await banner.save().then(() => { 
            return [ banner_utils.filter_banner_object(banner), 
                     response_codes.CODE_RESPONSE_CREATION_SUCCESS, 
                     response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
        }).catch(() => {
            return [ null,
                     response_codes.CODE_INTERNAL_SERVER_ERROR,
                     response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR ];
        });
}


const edit_banner_controller = async (filter_params, filter_body) => {
    if (!filter_params.id)
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_MISSING_PARAMETERS + "id" ];

    
    if (!common_utils.validate_id(filter_params.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const banner = await banner_model.findOneAndUpdate(
        { _id: filter_params.id, }, filter_body, { returnDocument: "after" });

    return [ banner_utils.filter_banner_object(banner), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const remove_banner_controller = async (filter_body) => {
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const banner = await banner_model.findOneAndUpdate(
        { _id: filter_body.id }, { status: false }, { returnDocument: "after" });

    return [ banner_utils.filter_banner_object(banner), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


module.exports = {
    read_banner_controller,
    featured_banner_controller,
    create_banner_controller,
    edit_banner_controller,
    remove_banner_controller
}
