const express = require("express");
const ibmcos = require("ibm-cos-sdk");

const app = express();

const PORT = process.env.PORT;

var config = {
    endpoint: process.env.COS_ENDPOINT,
    apiKeyId: process.env.COS_API_KEY,
    serviceInstanceId: process.env.COS_RESOURCE_INSTANCE_ID,
    sognatureVersion: 'iam',
};

app.get("/video", (req, res) => {

    const videoPath = req.query.path;
    const cos = new ibmcos.S3(config);
    const deposito = "microapp-videos";

    cos.headObject({
        Bucket: deposito,
        Key: videoPath
    }, (err, data) => {
        if(!err) {
            res.set('Content-Length', data.ContentLength);
            res.set('Content-Type', data.ContentType);
        } else {
            console.log(err, err.stack);
            res.send(500);
        }
    });
    
    video = cos.getObject({
        Bucket: deposito,
        Key: videoPath
    })
    .createReadStream()
    .pipe(res);
});

app.listen(PORT, () => {
    console.log(`Microservicio video-storage en línea en puero ${PORT}`);
});