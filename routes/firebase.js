/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();
var multer = require('multer');

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var firebase_controller = require('../controller/firebase_controller');
var response_codes = require('../utils/response_codes');
const jwt_authentication = require("../middleware/jwt_authentication");

// Upload Strage Configuration
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb) => {
        // Reject a file
        if (req.url.includes(constants.IMAGE)){
            if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png') || (file.mimetype === 'image/jpg')){
                cb(null, true);
            } 
            else{
                cb(null, false);
            }
        }
    }
});

/* POST: Upload Image to Firebase. */
const upload_image = async (req, res, next) => {
    const [ image_urls, response_code, response_message ] = await firebase_controller.upload_image_controller(req.files);
    if (response_code != response_codes.CODE_RESPONSE_CREATION_SUCCESS) {
        return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message
        ));
    }
    
    return res.status(response_code).send(common_utils.response_generator(
            response_code, 
            response_message, 
            response_data={ image_urls }
            ));
}

router.post('/image/upload', 
    [ jwt_authentication.verify_token,
      jwt_authentication.is_authentic_role([ constants.ADMIN ]),
      upload.array(constants.IMAGES, 5) ], 
    async (req, res, next) => {
    // Upload Image to Firebase
    await common_utils.api_error_handler(req, res, next, upload_image);
});


module.exports = router;
