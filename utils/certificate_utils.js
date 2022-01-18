/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */
const common_utils = require("./common_utils");


filter_multiple_certificate_object = (certificates) => {
    let certificate_array = [];
    certificates.forEach(certificate => {
        certificate_array.push({
            id: certificate._id,
            certificate_image: certificate.certificate_image,
        })
    });
    return certificate_array;
}


filter_certificate_object = (certificate) => {
    if (!certificate){
        return {}
    }
    return {
        id: certificate._id,
        certificate_image: certificate.certificate_image,
    }
}


/* Our certificates Validation */
certificate_validation = async (data) => {
    const schema = Joi.object({
        certificate_image: Joi.string().uri(),
    });
    return schema.validate(data);
}


certificate_update_validation = async (data) => {
    const schema = Joi.object({
        certificate_image: Joi.string().uri(),
    });
    return schema.validate(data);
}


module.exports = {
    filter_multiple_certificate_object,
    filter_certificate_object,
    certificate_validation,
    certificate_update_validation
}
