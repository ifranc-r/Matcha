
class Factory {
  constructor(tab_name) {
    let connection = require("../database/db_connection");
    this.con =  connection.connection_mysql(true);
    this.tab_name = tab_name;
  }

  create(dic){
    let attributes = "("+Object.keys(dic).join()+")";
    let values = "(\'"+Object.values(dic).join("\',\'")+"\')";
    let sql = "INSERT INTO "+ this.tab_name + " " + attributes+
          " VALUES "+ values;
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
        settings_string = settings_string +","+ key+"=\'"+settings[key]+"\'";
      else
        settings_string = key+"=\'"+settings[key]+"\'";
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
    let sql = "DELETE FROM " +this.tab_name +" WHERE " +where;
    this.con.query(sql, function(err, result){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  search(where){
    let sql = "SELECT * FROM "+this.tab_name+" WHERE "+ where;
    return new Promise(function(resolve, reject){
      this.con.query(sql, function(err, result, fields){
        // console.log(result);
        if(result === undefined){
          reject(new Error("Error rows is undefined"));
        }
        else{
          resolve(result);
        }
      })
    }.bind(this));
  }
  
  exist(where){
    let sql = "SELECT * FROM "+this.tab_name+" WHERE "+ where;
    return new Promise(function(resolve, reject){
      this.con.query(sql, function(err, result, fields){
        if(result === undefined){
          reject();
        }
        else{
          resolve();
        }
      })
    }.bind(this));
  }

  last_id(){
    let sql = "SELECT * FROM "+this.tab_name+" ORDER BY id DESC LIMIT 1";
    this.con.query(sql, function(err, result, fields){
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log(result);
    });
  }

  end(){
     this.con.end()
     console.log("Deconnected !");
  }
}
// var fact_test = new Factory("user")
// let dic = {
//         login:'login122',
//           passwd:'passwd2',
//           mail:'inti@max.frrew',
//           last_connection: '0000-00-00 00:00:10'
//           }
// fact_test.create(dic)

module.exports = Factory
