/* Node Imports */

/* Framework Imports */
const Joi = require('joi');

/* Local Imports */
const common_utils = require("./common_utils");


filter_multiple_project_object = (projects) => {
    let project_array = [];
    projects.forEach(project => {
        project_array.push({
            id: project._id,
            name: project.name,
            short_description: project.short_description,
            titled_image: project.titled_image,
        })
    });
    return project_array;
}


filter_project_object = (project) => {
    if (!project){
        return {}
    }
    return {
        id: project._id,
        name: project.name,
        short_description: project.short_description,
        full_description: project.full_description,
        titled_image: project.titled_image,
        gallery: project.gallery,
        banner_video: project.banner_video,
    }
}


/* Our projects Validation */
project_validation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        short_description: Joi.string().max(100).required(),
        full_description: Joi.string().required(),
        titled_image: Joi.string().uri().required(),
        gallery: Joi.array().items( Joi.string().uri() ).min(1).required(),
        banner_video: Joi.string().uri(),
        rating: Joi.number().min(0).default(0)
    });
    return schema.validate(data);
}


project_update_validation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        short_description: Joi.string().max(100),
        full_description: Joi.string(),
        titled_image: Joi.string().uri(),
        gallery: Joi.array().items( Joi.string().uri() ).min(1),
        banner_video: Joi.string().uri(),
        rating: Joi.number().min(0).default(0)
    });
    return schema.validate(data);
}


module.exports = {
    filter_multiple_project_object,
    filter_project_object,
    project_validation,
    project_update_validation
}
