const express = require("express");
const fs = require("fs");
const app = express();

if (!process.env.PORT) {
    throw new Error("Por favor especifique el número de puerto");
}

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
    console.log(`Aplicación ejemplo escuchando en el puerto ${PORT}`);
});