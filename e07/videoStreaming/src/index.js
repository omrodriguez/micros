const express = require('express');

const http = require("http");
const mongodb =require("mongodb");

const app = express();

if(!process.env.PORT) {
    throw new Error('Por favor especifique el número de puerto');
}

const PORT = process.env.PORT;

const SERVIDOR_VIDEO_STORAGE = process.env.SERVIDOR_VIDEO_STORAGE;
const PUERTO_VIDEO_STORAGE = parseInt(process.env.PUERTO_VIDEO_STORAGE);
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

function main() {
    return mongodb.MongoClient.connect(DBHOST).then(client => {
        const db = client.db(DBNAME);
        const videosCollection = db.collection("videos");
        app.get('/video', (req, res) => {
            const videoId = new mongodb.ObjectId(req.query.id);
            videosCollection.findOne({_id: videoId}).then(videoRecord => {
                if(!videoRecord) {
                    res.sendStatus(404);
                    return;
                }
                const forwardRequest = http.request({
                    host: SERVIDOR_VIDEO_STORAGE,
                    port: PUERTO_VIDEO_STORAGE,
                    path: `/video?path=${videoRecord.videoPath}`,
                    method: 'GET',
                    headers: req.headers
                },
                forwardResponse =>  {
                    res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                    forwardResponse.pipe(res);
                });
                req.pipe(forwardRequest);
            }).catch(err => {
                console.error("Falló la consulta a la base de datos");
                console.error(err && err.stack || err);
                res.sendStatus(500);
            });
        });
        
        app.listen(PORT, () => {
            console.log(`Microservicio video-streaming en línea en puerto ${PORT}`);
        });
    });
    
}

main()
    .then(() => console.log(`Microservicio video-streaming en línea en puerto ${PORT}`))
    .catch(err => {
        console.error("No se pudo iniciar el microservicio video-streaming");
        console.error(err && err.stak || err);
    });