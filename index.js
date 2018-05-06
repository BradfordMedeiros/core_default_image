
const path = require('path');
const proc = require('process');
const getSoftware = require('./src/getSoftware');
const getChangeImage = require('./src/getChangeImage');
const getBringDown = require('./src/getBringDown');
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
const bringDown = getBringDown(IS_PRODUCTION);
const dogpack = getDogpack(path.resolve(PACKAGE_FOLDER, 'packages'), path.resolve(PACKAGE_FOLDER, 'data'), path.resolve(PACKAGE_FOLDER, 'packs'), BIN_FOLDER);
const software = getSoftware(PACKAGE_FOLDER, changeImage, bringDown, dogpack);

const createRoutes = require('./src/http/createRoutes');

const PORT = 9999;
createRoutes({ software, HTML_FILE }).listen(PORT, () => {
   console.log('listening on port: ', PORT);
});




