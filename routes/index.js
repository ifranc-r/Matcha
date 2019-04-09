var express = require('express');
var router = express.Router();
let landing = require("../controllers/landing")
let register = require("../controllers/register")
/* GET home page. */
router.get('/', landing.get_landing);
/* GET register page*/
router.get('/', landing.get_register);

router.post('/', landing.submit_lead)
module.exports = router;
