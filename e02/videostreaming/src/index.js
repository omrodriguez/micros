const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("<h1>Hola mundo</h1>");
});
app.get("/video", (req, res) => {
    const path="./videos/sample-mp4-file-small.mp4";
    fs.stat(path, (err, stats) => {
        if(err) {
            console.error("Ocurrión un error al abrir el video");
            res.sendStatus(500);
            return;
        }
        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video:mp4"
        });

        fs.createReadStream(path).pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Aplicación ejemplo escuchando en el puerto ${port}`);
});