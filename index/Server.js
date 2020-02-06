var mysql = require('mysql');
var database = mysql.createConnection({
  host: 'host',
  user: 'user',
  password: 'password',
  database: 'database'
});
database.connect(function(connectionError){
  if(connectionError){
    throw connectionError;
  }
  var sql = "INSERT INTO table(column) VALUES ('" + jsonData + "')";
  database.query(sql, function(queryError, queryResult){
    if(queryError){
      throw queryError;
    }
  });
});