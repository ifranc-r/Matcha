
class Factory {
  constructor(tab_name) {
    let connection = require("../database/db_connection");
    this.con =  connection.connection_mysql(true);
    this.tab_name = tab_name;
  }

  create(attributes, values){
    let sql = "INSERT INTO ${this.tab_name} ${attributes}\
          VALUES ${values}";
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log("1 record inserted");
    });
  }

  modif(settings, where){
    let sql = "UPDATE $this->_tab_name SET $settings WHERE $where";
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  del(where){
    let sql = "DELETE FROM ${this.tab_name} WHERE ${where}";
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  search(where){
    let sql = "SELECT * FROM ${this.tab_name} WHERE ${where}";
    this.con.query(sql, function(err, result, fields){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result);
    });
  }

  last_id(){
    let sql = "SELECT * FROM ${this.tab_name} ORDER BY id DESC LIMIT 1";
    this.con.query(sql, function(err, result, fields){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result);
    });
  }
}
var fact_test = new Factory("user")
fact_test.create("(login,passwd,mail,last_connection)","('login','passwd','inti@max.fr','0000-00-00 00:00:00')")
exports.users = Factory
