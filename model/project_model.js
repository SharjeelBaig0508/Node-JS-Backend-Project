/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */


const project_model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    full_description: {
        type: String,
        required: true,
    },
    titled_image: {
        type: String,
        required: true,
    },
    gallery: {
        type: Array,
        required: true,
    },
    banner_video: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    }
});

var project = mongoose.model("project", project_model);
module.exports = project;
