/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */
const common_utils = require("./common_utils");


filter_multiple_our_teams_object = (our_teams) => {
    let our_teams_array = [];
    our_teams.forEach(our_team => {
        our_teams_array.push({
            id: our_team._id,
            name: our_team.name,
            designation: our_team.designation,
            short_description: our_team.short_description,
            social_media_links: our_team.social_media_links
        })
    });
    return our_teams_array;
}


filter_our_teams_object = (our_team) => {
    if (!our_team){
        return {}
    }
    return {
        id: our_team._id,
        name: our_team.name,
        designation: our_team.designation,
        short_description: our_team.short_description,
        full_description: our_team.full_description,
        social_media_links: our_team.social_media_links,
        email_address: our_team.email_address
    }
}


/* Our Teams Validation */
our_teams_validation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email_address: Joi.string().email().required(),
        full_description: Joi.string().required(),
        designation: Joi.string().min(3).max(50).required(),
        social_media_links: Joi.object().keys({ facebook: Joi.string().uri(),
                                                instagram: Joi.string().uri(),
                                                twitter: Joi.string().uri(),
                                                dreamfinder: Joi.string().uri() }).required(),
        short_description: Joi.string().max(100).required(),
        rating: Joi.number().min(0).default(0)
    });
    return schema.validate(data);
}


our_teams_update_validation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        email_address: Joi.string().email(),
        full_description: Joi.string(),
        designation: Joi.string().min(3).max(50),
        social_media_links: Joi.object().keys({ facebook: Joi.string().uri(),
                                                instagram: Joi.string().uri(),
                                                twitter: Joi.string().uri(),
                                                dreamfinder: Joi.string().uri() }),
        short_description: Joi.string().max(100),
        rating: Joi.number().min(0).default(0)
    });
    return schema.validate(data);
}


module.exports = {
    filter_multiple_our_teams_object,
    filter_our_teams_object,
    our_teams_validation,
    our_teams_update_validation
}
