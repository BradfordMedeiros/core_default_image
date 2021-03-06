const express = require('express');

const createStorageRoutes = ({ storage }) => {
    if (storage === undefined){
        throw (new Error('createStorageRoutes: storage is not defined'));
    }

    const app = express();

    app.get('/', async (req, res) => {
        try {
            res.jsonp(await storage.getStorage());
        }catch(e){
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });
    app.delete('/:name', async (req, res) => {
        try {
            await (storage.deleteStorage(req.params.name));
            res.send('ok');
        }catch(e){
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });

    return app;
};

module.exports = createStorageRoutes;