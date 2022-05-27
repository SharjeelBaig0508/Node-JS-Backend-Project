/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */


const banner_model = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

var banner = mongoose.model("banner", banner_model);
module.exports = banner;
