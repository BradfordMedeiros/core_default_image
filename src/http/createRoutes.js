const express = require('express');
const path = require('path');
const createSoftwareRoutes = require('./routes/createSoftwareRoutes');
const createStorageRoutes = require('./routes/createStorageRoutes');

const createRoutes = ({ software, HTML_FILE }) => {
    if (software === undefined){
        throw (new Error('createRoutes: software is not defined'));
    }
    if (HTML_FILE === undefined){
        throw (new Error('create Routes: HTML_FILE is not defined'));
    }

    const app = express();

    app.use('/software', createSoftwareRoutes({ software }));
    app.use('/storage', createStorageRoutes({ storage: {
        getStorage: () => {
            const storage = [
                {title: 'automate 0.6', size: '12MB', modified: '1/19/18'},
                {title: 'another thing', size: '2GB', modified: '2/21/18'}
            ];
            return storage;
        }
    }}));


    app.get('/', (req, res) => {
        res.sendFile(HTML_FILE);
    });
    app.get('/style.css', (req, res) => {
        res.sendFile(path.resolve('./style.css'));
    });

    return app;
};

module.exports = createRoutes;