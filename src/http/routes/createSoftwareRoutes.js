const express = require('express');

const createSoftwareRoutes = ({ software }) => {
    if (software === undefined) {
        throw (new Error('createSoftwareRoutes: software is not defined'));
    }

    const app = express();

    app.get('/', async (req, res) => {
        try {
            res.jsonp(await software.getAvailableSoftware());
        }catch(e){
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });

    app.post('/set_active/:packageName', async (req, res) => {
        const packageName = decodeURIComponent(req.params.packageName);
        try {
            await software.setSoftwareAsActive(packageName);
            res.send('ok');
        } catch (e) {
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });
    app.post('/software_null', async (req, res) => {
        try {
            await software.setSoftwareAsInactive();
            res.send('ok');
        } catch (e) {
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });

    app.get('/installed', async (req, res) => {
        try {
            const response = await software.getActiveSoftware();
            res.status(200).jsonp(response);
        }catch(e){
            console.error(e.toString());
            res.status(500).jsonp({error: 'internal server error'});
        }
    });

    return app;
};

module.exports = createSoftwareRoutes;