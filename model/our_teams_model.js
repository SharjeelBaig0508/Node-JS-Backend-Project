/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */


const our_teams_model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
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
    social_media_links: {
        type: Object,
        required: true,
    },
    email_address: {
        type: String,
        required: true,
        lowercase: true
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

var our_teams = mongoose.model("our_teams", our_teams_model);
module.exports = our_teams;
