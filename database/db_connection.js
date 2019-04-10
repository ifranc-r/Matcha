exports.connection_mysql = function(db_exist){
  // Import lib MYSQL
  var mysql = require('mysql');

  // Import information for the database
  var mysql_info = require("../config/db_config");

  // Connection to database
  if (db_exist){
    var conf = mysql_info.database
    conf["database"] = mysql_info.name_db
    var con = mysql.createConnection(conf);
  }
  else {
    var con = mysql.createConnection(mysql_info.database);
  }
  //
  // //Error gestion
  con.connect(function(err) {
    if (err){
      console.log('error', err.message, err.stack)
      return;
    }
    console.log("Connected!");
  });
  return con;
}
