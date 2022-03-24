const express = require("express");
const ibmcos = require("ibm-cos-sdk");

const app = express();

const PORT = process.env.PORT;

var config = {
    endpoint: process.env.COS_ENDPOINT,
    apiKeyId: process.env.COS_API_KEY,
    serviceInstanceId: process.env.COS_RESOURCE_INSTANCE_ID,
    signatureVersion: 'iam',
};

app.get("/video", (req, res) => {
    const videoPath = req.query.path;
    const cos = new ibmcos.S3(config);
    const deposito = "microapp-videos";

    video = cos.getObject({
        Bucket: deposito,
        Key: videoPath
    }).promise()
    .then((data) => {
        if(data != null) {
            res.set("Content-Length", data.ContentLength)
               .set("Content-Type", data.ContentType);
            
            res.send(data.Body);
        }
    })
    .catch((e) => {
        console.error(`Error: ${e.code} - ${e.message}\n`);
    });
});

app.listen(PORT, () => {
    console.log(`Microservicio video-storage en línea en puerto ${PORT}`);
});