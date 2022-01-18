/* Node Imports */


/* Framework Imports */
var express = require('express');
var router = express.Router();

/* Local Imports */
var common_utils = require("../utils/common_utils");
var constants = require("../utils/constants");
var our_teams_controller = require('../controller/our_teams_controller');
var project_controller = require('../controller/project_controller');
const response_codes = require('../utils/response_codes');


/* GET Server Running. */
router.get('/', (req, res, next) => {
  res.send("Server is running!");
});

/* Home API */
const home_featured = async (req, res, next) => {
  var [ our_team, response_code, response_message ] = await our_teams_controller.featured_teams_controller({});
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res.status(response_code).send(common_utils.response_generator(
      response_code, 
      response_message
    ));
  }

  var [ project, response_code, response_message ] = await project_controller.featured_project_controller({});
  if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
    return res.status(response_code).send(common_utils.response_generator(
      response_code, 
      response_message
    ));
  }

  return res.status(response_code).send(common_utils.response_generator(
    response_code, 
    response_message, 
    response_data={our_team, project}
  ));
}

router.get('/home', async (req, res, next) => {
  await common_utils.api_error_handler(req, res, next, home_featured);
});


module.exports = router;
