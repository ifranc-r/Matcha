const Factory = require("../core.class/Class.Factory");


exports.get_register = function(req, res, next) {
  res.render('register', { title: 'Create your account', success: req.session.success, errors: req.session.errors });
}

exports.submit_registration = function(req, res, next) {
  console.log("login:", req.body.login);
  console.log("password:", req.body.passwd);
  console.log("passwd_confirm:", req.body.passwd_confirm);
  console.log("firstname:", req.body.firstname);
  console.log("lastname:", req.body.lastname);
  console.log("email:", req.body.email);
  // Check Validation
  req.check('email', 'Invalid email address').isEmail();

  req.check('passwd', 'Password needs at least: 4 characters, 1 number, 1 Upper case;')
  .isLength({min :4})
  .matches(/\d/)
  .equals(req.body.passwd_confirm).withMessage('Password not same');

  var errors = req.validationErrors();
  if (errors){
    console.log(session.errors);
    req.session.errors = errors;
    req.session.success = false
  }
  else {
    req.session.success = true
    let register_dic = {
      login : req.body.login,
      passwd : req.body.passwd,
      mail : req.body.email,
      last_connection: '0000-00-00 00:00:00'
    }
    console.log(register_dic);
    var tab_user = new Factory("user")
    tab_user.create(register_dic);
    console.log("Success you have been register");
    tab_user.end();
  }
  res.redirect('/register');
}

exports.registration_validation = function() {
  return [
       body('userName', 'userName doesn\'t exists').exists(),
       body('email', 'Invalid email').exists().isEmail(),
       body('phone').optional().isInt(),
       body('status').optional().isIn(['enabled', 'disabled'])
      ]
}
