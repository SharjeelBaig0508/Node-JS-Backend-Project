/* Node Imports */

/* Framework Imports */
var mongoose = require("mongoose");

/* Local Imports */


const certificate_model = new mongoose.Schema({
    certificate_image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

var certificate = mongoose.model("certificate", certificate_model);
module.exports = certificate;
