
exports.get_register = function(req, res, next) {
  res.render('register', { title: 'Create your account' });
}

exports.submit_registration = function(req, res, next) {
  console.log("email:", req.body.login);
  console.log("password:", req.body.passwd);
  console.log("passwd_confirm:", req.body.passwd_confirm);
  console.log("firstname:", req.body.firstname);
  console.log("lastname:", req.body.lastname);
  console.log("birthday:", req.body.birthday);
  console.log("sexe:", req.body.sexe);
  console.log("orientation:", req.body.orientation);
  console.log("email:", req.body.email);
  res.redirect('/register');
}
