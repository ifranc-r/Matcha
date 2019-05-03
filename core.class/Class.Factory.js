
class Factory {
  constructor(tab_name) {
    const connection = require("../database/db_connection");
    this.con = connection.connection_mysql(true);
    this.tab_name = tab_name;
  }

  create(dic){
    let attributes = "(" + Object.keys(dic).join() + ")";
    let values = "(\'" + Object.values(dic).join("\',\'") + "\')";
    let sql = "INSERT INTO " + this.tab_name + " " + attributes +
          " VALUES " + values;
    console.log(sql);
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log("1 record inserted");
    });
  }

  modif(settings, where){
    var settings_string = "";
    Object.keys(settings).forEach(function(key){
      if (settings_string != "")
        settings_string = settings_string + "," + key + "=\'" + settings[key] + "\'";
      else
        settings_string = key + "=\'" + settings[key] + "\'";
    });
    let sql = "UPDATE " + this.tab_name + " SET " + settings_string + " WHERE " + where;
    console.log(sql);
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  del(where){
    let sql = "DELETE FROM " + this.tab_name + " WHERE " + where;
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  async get_all(){
    let sql = "SELECT * FROM " + this.tab_name;
    const [rows, fields] = await this.con.promise().execute(sql)
    return (rows);
  }

  async search(where){
    let sql = "SELECT * FROM " + this.tab_name + " WHERE " + where;
    const [rows, fields] = await this.con.promise().execute(sql)
    return (rows);
  }

  async exist(where){
    let sql = "SELECT * FROM " + this.tab_name + " WHERE " + where;
    const [rows, fields] = await this.con.promise().execute(sql)
    if (rows > 0)
      return (true);
    else
      return (false);
  }

  async last_id(){
    let sql = "SELECT * FROM " + this.tab_name + " ORDER BY id DESC LIMIT 1";
    const [rows, fields] = await this.con.promise().execute(sql)
    return (rows);
  }

  end(){
     this.con.end()
     console.log("Deconnected !");
  }
}
// async function test_mysql2(){
//   const mysql = require('mysql2');
//   const mysql_info = require("../config/db_config");
//   const conf = mysql_info.database
//   conf["database"] = mysql_info.name_db
//   console.log(conf);
//   const con = mysql.createConnection(conf);
//   const [rows, fields] = await con.promise().execute('SELECT * FROM user')
//   console.log(rows);
//   con.end()
// }
// test_mysql2()
// var fact_test = new Factory("user")
// let dic = {
//         login:'login122',
//           passwd:'passwd2',
//           mail:'inti@max.frrew',
//           last_connection: '0000-00-00 00:00:10'
//           }
// fact_test.create(dic)
// async function test(){
//   var fact_test = await new Factory("user")
//   const result = await fact_test.search("id = 1")
//   fact_test.end()
//   console.log(result[0]['id'])
// }
// test()
module.exports = Factory
