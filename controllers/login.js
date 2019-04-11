
exports.get_login = function(req, res, next) {
  res.render('login', { title: 'Log to Matcha' });
}
