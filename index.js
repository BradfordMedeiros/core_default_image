
const express  = require('express');
const path = require('path');
const proc = require('process');
const getSoftware = require('./src/getSoftware');
const getChangeImage = require('./src/getChangeImage');
const getDogpack = require('./src/getDogpack');

const IS_PRODUCTION = proc.env.DEBUG != 'true';

const HTML_FILE = path.resolve('./index.html');
const NAMED_PIPE_LOCATION =  proc.env.AUTOMATE_DOCKER_PIPE || '/opt/automated/pipe';
const PACKAGE_FOLDER = proc.env.AUTOMATE_PACKAGE_PATH || '/opt/automated/packages';
const BIN_FOLDER = path.resolve('./bin');

console.log('production: ', IS_PRODUCTION);
console.log('named Pipe: ', NAMED_PIPE_LOCATION);
console.log('package folder: ', PACKAGE_FOLDER);

const changeImage = getChangeImage(IS_PRODUCTION, NAMED_PIPE_LOCATION);
const software = getSoftware(PACKAGE_FOLDER, changeImage);
dogpack = getDogpack(path.resolve(PACKAGE_FOLDER, 'packages'), path.resolve(PACKAGE_FOLDER, 'data'), BIN_FOLDER);

dogpack.saveDogpack('automate_0.6');


const app = express();

app.get('/software', async (req, res) => {
   res.jsonp(await software.getAvailableSoftware());
});

app.post('/software/:packageName', async (req, res) => {
   const packageName = decodeURIComponent(req.params.packageName);
   try {
       await software.setSoftwareAsActive(packageName);
       res.send('ok');
   }catch(e){
       console.log(e.toString());
       res.status(500).jsonp({ error: 'internal server error' });
   }
});

app.get('/software/installed', async (req, res) => {
   const response = await software.getActiveSoftware();
   res.status(200).jsonp(response);
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.resolve('./style.css'));
});

const PORT = 9999;
app.listen(PORT, () => {
   console.log('listening on port: ', PORT);
});
