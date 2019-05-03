

exports.get_all_user = async function(req, res) {
  const Factory = require("../core.class/Class.Factory");
  var tab_user = await new Factory("user")
  let result = await tab_user.get_all()
  res.json(result);
}
