//Inicializando modulos node
var express = require('express');
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();


app.use(bodyParser.urlencoded({ extended: true }))

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});



//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "Retoangular18",
    server: "CPX-HQKYIJMGBEL\\SQLEXPRESS",
    database: "angular"
   };


var ejecutarSentencia = function (respond,query){

  var connection1 = new sql.Connection(dbConfig);
  var request = new sql.Request(connection1);

  connection1.connect(function(err){
      if(err){
        respond.json(err);
        return;
      }
      request.query(query, function(err, recordset) {
          if(err){
            respond.json(err);
            return;
          }else{
            console.log(recordset);
            respond.json(recordset);
          }
          connection1.close();
      });
  });

}


//Function to connect to database and execute query
var  executeQuery = function(respond,query){
     sql.connect(dbConfig, function (err) {
         if (err) {
                     console.log("Error while connecting database :- " + err);
                     respond.send(err);
                  }
                  else{
                    // create Request object
                    var request = new sql.Request();
                    // query to the database
                    request.query(query, function (err, res) {
                      if (err) {
                                 console.log("Error while querying database :- " + err);
                                 console.log(err);
                                 respond.send(err);
                                }
                                else {
                                  console.log(res);
                                  respond.json(res);
                                 }
                          });

                  }
      });
}




app.get('/cliente/cedula/:cedula',function(req,res){
      console.log("buscando cliente por cedula:"+req.params.cedula);
      var consulta = "select * from [Cliente] where Cedula='"+req.params.cedula+"'";
      ejecutarSentencia(res,consulta);
});



app.get('/cliente', function (req, res) {
  console.log("realizando peticion get");
        var query = "select * from [Cliente]";
                 ejecutarSentencia(res, query);
});


//POST API
 app.post("/cliente/create", function(req , res){
                console.log("peticion post!!");

                console.log(req.body);

                var query = "INSERT INTO [Cliente] (Nombre,Apellido,Cedula,fecha_Nacimiento) VALUES ('" + req.body.Nombre + "','" + req.body.Apellido + "','" + req.body.Cedula +  "','" + req.body.fecha_Nacimiento + "')";
                ejecutarSentencia (res, query);

});

app.get('/solicitud', function (req, res) {
  console.log("realizando peticion get solicitudes!!");
        var query = "select * from [Solicitud]";
                 ejecutarSentencia (res, query);
});

/*
app.get('/solicitud/fecha_Creacion/:fecha_Creacion', function (req, res) {
  console.log("realizando peticion get solicitudes!!");
        var query = "select * from [Solicitud] where fecha_Creacion='"+req.params.fecha_Creacion+"'";
                 ejecutarSentencia (res, query);
});*/

app.post("/solicitud/create", function(req , res){
               console.log("peticion post solicitudes!!");

               console.log(req.body);

               var query = "INSERT INTO [Solicitud] (Cedula,Empresa,nit_Empresa,fecha_Ingreso,Salario,fecha_Creacion) VALUES ('" + req.body.Cedula + "','" + req.body.Empresa + "','" + req.body.nit_Empresa + "','" + req.body.fecha_Ingreso  +  "','" + req.body.Salario + "','" + req.body.fecha_Creacion + "')";
               ejecutarSentencia (res, query);
});


app.post("/credito/create", function(req , res){
  console.log("peticion post creditos!!");

  console.log(req.body);

  var query = "INSERT INTO [Credito] (id_Solicitud,Cedula,Cantidad,fecha_Creacion) VALUES ('" + req.body.id_Solicitud+ "','" + req.body.Cedula + "','" + req.body.Cantidad  + "','" + req.body.fecha_Creacion +"')";
  ejecutarSentencia (res, query);
});

app.get('/credito', function (req, res) {
  console.log("realizando peticion get");
        var query = "select * from [Credito]";
                 ejecutarSentencia (res, query);
});
