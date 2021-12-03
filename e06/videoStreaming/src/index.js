const express = require('express');

const http = require("http");

const app = express();

if(!process.env.PORT) {
    throw new Error('Por favor especifique el número de puerto');
}

const PORT = process.env.PORT;

const SERVIDOR_VIDEO_STORAGE = process.env.SERVIDOR_VIDEO_STORAGE;
const PUERTO_VIDEO_STORAGE = parseInt(process.env.PUERTO_VIDEO_STORAGE);

app.get('/video', (req, res) => {

    const forwardRequest = http.request({
        host: SERVIDOR_VIDEO_STORAGE,
        port: PUERTO_VIDEO_STORAGE,
        path: '/video?path=SampleVideo_720x480_5mb.mp4',
        method: 'GET',
        headers: req.headers
    },
    forwardResponse =>  {
        res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
    });
    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
    console.log(`Microservicio video-streaming en línea en puerto ${PORT}`);
});