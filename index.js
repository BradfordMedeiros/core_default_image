
const express  = require('express');
const path = require('path');

const HTML_FILE = path.resolve('./index.html');

const app = express();

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
});

const PORT = 9000;
app.listen(PORT, () => {
   console.log('listening on port: ', PORT);
});