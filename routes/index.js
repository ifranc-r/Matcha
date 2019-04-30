var express = require('express');
var router = express.Router();
let landing = require("../controllers/landing")
let register = require("../controllers/register")
let login = require("../controllers/login")
let users = require("../controllers/users")
/* GET home page. */
router.get('/', landing.get_landing);
/* GET register page*/
router.post('/', landing.submit_lead);

router.get('/login', login.get_login);
router.get('/users', users.get_all);

router.get('/register', register.get_register);

router.post('/register', register.submit_registration);
module.exports = router;
