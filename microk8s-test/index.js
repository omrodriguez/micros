const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    var http_code=  "<html>"+
                    "<head><title>Prueba microk8s</title></head>"+
                    "<body><h1>Hola mundo de kubernetes</h1>" +
                    "<h2>Probando microk8s</h2></body>"+
                    "</html>";
    res.send(http_code);
});

app.listen(port, () => {
    console.log(`Contenedor microk8s en puerto ${port}`);
});