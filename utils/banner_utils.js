/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */
const common_utils = require("./common_utils");


filter_multiple_banner_object = (banners) => {
    let banner_array = [];
    banners.forEach(banner => {
        banner_array.push({
            id: banner._id,
            heading: banner.heading,
            paragraph: banner.paragraph,
            image: banner.image,
        })
    });
    return banner_array;
}


filter_banner_object = (banner) => {
    if (!banner){
        return {}
    }
    return {
        id: banner._id,
        heading: banner.heading,
        paragraph: banner.paragraph,
        image: banner.image,
    }
}


/* Our banners Validation */
banner_validation = async (data) => {
    const schema = Joi.object({
        heading: Joi.string().min(3).max(50).required(),
        paragraph: Joi.string().required(),
        image: Joi.string().uri().required(),
    });
    return schema.validate(data);
}


banner_update_validation = async (data) => {
    const schema = Joi.object({
        heading: Joi.string().min(3).max(50),
        paragraph: Joi.string(),
        image: Joi.string().uri(),
    });
    return schema.validate(data);
}


module.exports = {
    filter_multiple_banner_object,
    filter_banner_object,
    banner_validation,
    banner_update_validation
}
