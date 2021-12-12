const express = require('express');

function  setupHandlers(app) {

}

function startHttpServer(){
    return new Promise(resolve => {
        const app = express();
        setupHandlers(app);

        const port = process.env.PORT &&
            parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            resolve();
        });
    });
}

function main() {
    console.log('Iniciando micro servicio history');

    return (startHttpServer());
}

main()
    .then(() => {
        console.log("Microservicios History en línea"); })
    .catch(err => {
        console.error("Falló el inicio del microservicio History");
        console.error(err &&  err.stack || err);
    });