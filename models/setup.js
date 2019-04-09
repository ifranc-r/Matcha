

//array_sql of table mysql
function Array_sql_table_() {
  var array_sql = []

  // Create table user
  let sql1 = {
    sql : 'CREATE TABLE IF NOT EXISTS matcha.user(id int AUTO_INCREMENT,\
     login VARCHAR(255) NOT NULL, \
     passwd VARCHAR(255) NOT NULL, \
     mail VARCHAR(255) NOT NULL, \
     online BIT(1) NOT NULL DEFAULT 0, \
     last_connection DATETIME NOT NULL, \
     isVerified BIT(1) NOT NULL DEFAULT 0, \
     PRIMARY KEY(id))',
    name_tab : "user"
  }
  array_sql.push(sql1)

  // Create table photo
  let sql2 ={
    sql : 'CREATE TABLE IF NOT EXISTS matcha.photo(\
    id int AUTO_INCREMENT, \
    login VARCHAR(255), \
    img_path VARCHAR(255), \
    PRIMARY KEY(id))',
    name_tab : "photo"
  }
  array_sql.push(sql2)

  // Create table comment
  let sql3 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.comment(id int AUTO_INCREMENT, \
    id_img VARCHAR(255), \
    comment VARCHAR(255), \
    PRIMARY KEY(id))',
    name_tab : "comment"
  }
  array_sql.push(sql3)

  // Create table verification
  let sql4 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.verification(id int AUTO_INCREMENT, \
    token VARCHAR(255) NOT NULL, \
    reinitToken VARCHAR(255) NOT NULL, \
    mail VARCHAR(255), \
    expiryDate DATETIME NOT NULL, \
    PRIMARY KEY(id))',
    name_tab : "verification"
  }
  array_sql.push(sql4)

  // Create table profile
  let sql5 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.profile(id int AUTO_INCREMENT, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL, \
    sexe BIT(1) NOT NULL, \
    orientation BIT(1) NOT NULL, \
    birthday DATE NOT NULL, \
    description VARCHAR(2500), \
    photo_profile VARCHAR(255), \
    age INT NOT NULL, \
    creation_date DATETIME NOT NULL, \
    mail VARCHAR(255), \
    PRIMARY KEY(id))',
    name_tab : "profile"
  }
  array_sql.push(sql5)

  // Create table like
  let sql6 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.like(id int AUTO_INCREMENT, \
    login VARCHAR(255) NOT NULL, \
    liked VARCHAR(255), \
    `match` BIT(1) NOT NULL, \
    PRIMARY KEY(id))',
    name_tab : "like"
  }
  array_sql.push(sql6)

  // Create table message
  let sql7 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.message(id int AUTO_INCREMENT, \
    sender VARCHAR(255) NOT NULL, \
    reciever VARCHAR(255), \
    message VARCHAR(2500), \
    send_date DATETIME NOT NULL, \
    PRIMARY KEY(id))',
    name_tab : "message"
  }
  array_sql.push(sql7)

  // Create table view
  let sql8 = {
    sql :'CREATE TABLE IF NOT EXISTS matcha.view(id int AUTO_INCREMENT, \
    login VARCHAR(255) NOT NULL, \
    viewedBy VARCHAR(255), \
    view_date DATETIME NOT NULL, \
    PRIMARY KEY(id))',
    name_tab : "view"
  }
  array_sql.push(sql8);
  return array_sql;
}

function setup_database(){
  // Start connection to DATABASE
  var con = require('./db_connection').connection_mysql(false)

  // Create DB
  let sql = 'CREATE DATABASE IF NOT EXISTS matcha';
  con.query(sql, (err, result) => {
    if (err){
      console.log('error', err.message, err.stack)
      return;
    }
    console.log("database created");
  });

  //CREATE ALL Tables in database
  array_sql = Array_sql_table_()
  array_sql.forEach(function(elements){
    con.query(elements.sql, (err, result) => {
      if (err){
        console.log('error', err.message, err.stack)
        return;
      }
      console.log("table", elements.name_tab ,"as been created");
    });
  });

  //End of connection
  con.end((err) => {
    console.log('End Connection')
  });
}
setup_database();
