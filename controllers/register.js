const Factory = require("../core.class/Class.Factory");
exports.get_register = function(req, res, next) {
  res.render('register', { title: 'Create your account' });
}

exports.submit_registration = function(req, res, next) {
  console.log("login:", req.body.login);
  console.log("password:", req.body.passwd);
  console.log("passwd_confirm:", req.body.passwd_confirm);
  console.log("firstname:", req.body.firstname);
  console.log("lastname:", req.body.lastname);
  console.log("email:", req.body.email);

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
  res.redirect('/register');
}
