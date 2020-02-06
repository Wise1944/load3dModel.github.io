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
       console.log("Connected!");
       var mysql="CREATE TABLE customers(name VARCHAR(255)),password VARCHAR(255)"
     }

     database.query(sql, function(queryError, queryResult){
       if(queryError){
         throw queryError;
         console.log("create table")
       }
     });
   });