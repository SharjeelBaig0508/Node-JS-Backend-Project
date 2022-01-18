/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */


/* Email Validation */
email_validation = async (data) => {
    const schema = Joi.object({
        from: Joi.string().email(),
        to: Joi.string().email(),
        subject: Joi.string().required(),
        text: Joi.string().required(),
        html: Joi.string().required()
    });
    return schema.validate(data);
}


module.exports = {
    email_validation
}
