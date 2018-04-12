
const express  = require('express');
const path = require('path');
const software = require('./src/software');

const HTML_FILE = path.resolve('./index.html');

const app = express();

app.get('/software', (req, res) => {
   res.jsonp(software.getAvailableSoftware());
});
app.post('/software/:dockerUrl', async (req, res) => {
   const dockerUrl = req.params.dockerUrl;
   try {
       await software.setSoftwareAsActive(dockerUrl);
       res.send('ok');
   }catch(e){
       res.status(500).jsonp({ error: 'internal server error' })
   }
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