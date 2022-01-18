/* Node Imports */

/* Framework Imports */

/* Local Imports */
var certificate_model = require('../model/certificate_model');
var certificate_utils = require('../utils/certificate_utils');
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");


const read_certificate_controller = async (filter_body) => {
    if (common_utils.object_is_empty(filter_body)) {
        const certificate = await certificate_model.find({ status: true });

        return [ certificate_utils.filter_multiple_certificate_object(certificate), 
                 response_codes.CODE_RESPONSE_SUCCESS, 
                 response_codes.MESSAGE_RESPONSE_SUCCESS ];
    }
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const certificate = await certificate_model.findOne({ _id: filter_body.id, 
                                                          status: true });

    return [ certificate_utils.filter_certificate_object(certificate), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}

const featured_certificate_controller = async (filter_body) => {
    const certificate = await certificate_model.find({ status: true }).sort({ rating: -1 }).limit(3);

    return [ certificate_utils.filter_multiple_certificate_object(certificate), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const create_certificate_controller = async (filter_body) => {
    const certificate = new certificate_model(filter_body);

    return await certificate.save().then(() => { 
            return [ certificate_utils.filter_certificate_object(certificate), 
                     response_codes.CODE_RESPONSE_CREATION_SUCCESS, 
                     response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
        }).catch(() => {
            return [ null,
                     response_codes.CODE_INTERNAL_SERVER_ERROR,
                     response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR ];
        });
}


const edit_certificate_controller = async (filter_params, filter_body) => {
    if (!filter_params.id)
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_MISSING_PARAMETERS + "id" ];

    
    if (!common_utils.validate_id(filter_params.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];
                 
    const certificate = await certificate_model.findOneAndUpdate(
        { _id: filter_params.id, }, filter_body, { returnDocument: "after" });

    return [ certificate_utils.filter_certificate_object(certificate), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


const remove_certificate_controller = async (filter_body) => {
    if (!common_utils.validate_id(filter_body.id)) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_INVALID_PARAMETERS + "id" ];

    const certificate = await certificate_model.findOneAndUpdate(
        { _id: filter_body.id }, { status: false }, { returnDocument: "after" });

    return [ certificate_utils.filter_certificate_object(certificate), 
             response_codes.CODE_RESPONSE_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}


module.exports = {
    read_certificate_controller,
    featured_certificate_controller,
    create_certificate_controller,
    edit_certificate_controller,
    remove_certificate_controller
}
