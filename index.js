
const express  = require('express');
const path = require('path');
const process = require('process');
const child_process = require('child_process');
const getSoftware = require('./src/getSoftware');
const getChangeImage = require('./src/getChangeImage');

const IS_PRODUCTION = process.env.DEBUG != 'true';

const HTML_FILE = path.resolve('./index.html');
const NAMED_PIPE_LOCATION =  process.env.AUTOMATE_DOCKER_PIPE || '/opt/automated/pipe';
const PACKAGE_FOLDER = process.env.AUTOMATE_PACKAGE_PATH || '/opt/automated/packages';

console.log('production: ', IS_PRODUCTION);
console.log('named Pipe: ', NAMED_PIPE_LOCATION);
console.log('package folder: ', PACKAGE_FOLDER);

const changeImage = getChangeImage(IS_PRODUCTION, NAMED_PIPE_LOCATION);
const software = getSoftware(PACKAGE_FOLDER, changeImage);

const app = express();

app.get('/software', async (req, res) => {
   res.jsonp(await software.getAvailableSoftware());
});

app.post('/software/:dockerUrl', async (req, res) => {
   const dockerUrl = decodeURIComponent(req.params.dockerUrl);
   try {
       await software.setSoftwareAsActive(dockerUrl);
       res.send('ok');
   }catch(e){
       console.log(e.toString());
       res.status(500).jsonp({ error: 'internal server error' })
   }
});

app.get('/software/installed', async (req, res) => {
   const response = await software.getActiveSoftware();
   res.status(200).jsonp(response);
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.resolve('./style.css'));
});

const PORT = 9999;
app.listen(PORT, () => {
   console.log('listening on port: ', PORT);
});
