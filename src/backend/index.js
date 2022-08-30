//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
const connection = require('./mysql-connector');
var app = express();
var utils = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

var devices = [
    {
        'id': 1,
        'name': 'Lampara 1',
        'description': 'Luz living',
        'state': 1,
        'type': 1,
    },
    {
        'id': 2,
        'name': 'Ventilador 1',
        'description': 'Ventilador Habitacion',
        'state': 1,
        'type': 2,
    },
];

//=======[ Main module code ]==================================================
app.post("/actualizar", function (req, res) { //Debería ser PUT
    console.log("Llegue al servidor")
    console.log(Object.keys(req.body).length)
    if (req.body.id != undefined && req.body.state != undefined) {
        console.log(req.body);
        res.send("actualizo");
    } else {
        res.send("ERROR");
    }

});

app.post('/new/', function (req, res) {
    console.log("Agregue device");
    connection.query("INSERT INTO Devices (id, name, description, state, type) VALUES (9, 'Velador 2','Velador huespedes',0,2)", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.send("agregado velador");
});


app.get('/delete/', function (req, res) {
    connection.query("DELETE FROM Devices WHERE name = 'Persiana 1'", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    console.log("Elimino device");

});


app.get('/devices/', function (req, res) {
    connection.query("SELECT * FROM Devices", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result)).status(200);
    });
    console.log("Alguien pidió divices!");
    /* setTimeout(function(){
        res.send(JSON.stringify(devices)).status(200);
    }, 5000); */


});

app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});



//=======[ End of file ]=======================================================
