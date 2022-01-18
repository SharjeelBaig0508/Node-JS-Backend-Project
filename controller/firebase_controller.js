/* Node Imports */

/* Framework Imports */

/* Local Imports */
var firebase_utils = require('../utils/firebase_utils');
var response_codes = require("../utils/response_codes");
var common_utils = require("../utils/common_utils");
var constants = require('../utils/constants');


const upload_image_controller = async (upload_images) => {
    if (!upload_images) 
        return [ null, 
                 response_codes.CODE_BAD_REQUEST, 
                 response_codes.MESSAGE_MISSING_PARAMETERS + constants.IMAGES ];
    if (typeof(upload_images) != 'object')
        return [ null,
                 response_codes.CODE_BAD_REQUEST,
                 response_codes.MESSAGE_INVALID_PARAMETERS + constants.IMAGES ];

    image_urls = await firebase_utils.uploadImage(upload_images);
    if (!image_urls) 
        return [ null,
                 response_codes.CODE_INTERNAL_SERVER_ERROR,
                 response_codes.MESSAGE_ERROR_WHILE_UPLOADING_IMAGE ];

    return [ image_urls, 
             response_codes.CODE_RESPONSE_CREATION_SUCCESS, 
             response_codes.MESSAGE_RESPONSE_CREATION_SUCCESS ];
}


module.exports = {
    upload_image_controller
}
