
const express  = require('express');
const path = require('path');
const software = require('./src/software');

const HTML_FILE = path.resolve('./index.html');

const app = express();

app.get('/software', (req, res) => {
   res.jsonp(software.getAvailableSoftware());
});
app.post('/software/:dockerUrl', async (req, res) => {
   const dockerUrl = decodeURIComponent(req.params.dockerUrl);
   try {
       setTimeout(async () => {
           await software.setSoftwareAsActive(dockerUrl);
           res.send('ok');
       }, 2000);

   }catch(e){
       res.status(500).jsonp({ error: 'internal server error' })
   }
});

app.get('/software/installed', (req, res) => {
   const response = software.getActiveSoftware();
   res.status(200).jsonp(response);
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.resolve('./style.css'));
});

const PORT = 9000;
app.listen(PORT, () => {
   console.log('listening on port: ', PORT);
});