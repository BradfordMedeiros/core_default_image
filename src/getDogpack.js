const path = require('path');
const child_process = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');

const getDogpack = (packagesFolder, dataFolder, packsFolder, binLocation) => {

    const SAVE_DOGPACK_SCRIPT = path.resolve(binLocation, 'save-pack.sh');
    const INSTALL_PACK_SCRIPT = path.resolve(binLocation, 'install-pack.sh');

    const getPackageFullPath = packageName => path.resolve(packagesFolder,  packageName);
    const getDataFullPath = packageNmae => path.resolve(dataFolder, packageNmae);

    const getDogpacks = () => new Promise((resolve, reject) => {
        fs.readdir(packsFolder, (err, dogpackFolders) => {
            if (err) {
                reject(err);
                return;
            }

            const files = {};
            Promise.all(dogpackFolders.map(async dogpakFolder => {
                const dogpackDataPromise = getPakDataForFolder(path.resolve(packsFolder, dogpakFolder));
                files[dogpakFolder] = await dogpackDataPromise;
                return dogpackDataPromise;
            })).then(() => resolve(files)).catch(reject);
        });
    });
    const getPakDataForFolder = productFolder => new Promise((resolve, reject) => {
        fs.readdir(productFolder, (err, packFiles) => {
            resolve(packFiles);
        });
    });

    const saveDogpack = packageName => new Promise((resolve, reject) => {
        const command = `${SAVE_DOGPACK_SCRIPT} ${getPackageFullPath(packageName)}`;
        child_process.exec(command, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    });

    const mountDogpack = dogpackName => new Promise((resolve, reject) => {
        const command = `${INSTALL_PACK_SCRIPT} ${getPackageFullPath(dogpackName)}`;
        child_process.exec(command, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    });


    const unmountDogpack = dogpackName => new Promise((resolve, reject) => {
        const folderPath = getDataFullPath(dogpackName);
        rimraf(folderPath, err => {
            if (err){
                reject(err);
                return;
            }
            resolve();
        })
    });

    const mountEmptyPack =  dogpackName => new Promise((resolve, reject) => {
       const folderPath = getDataFullPath(dogpackName);
       fs.mkdir(folderPath, err => {
           if(err){
               reject(err);
               return;
           }
           resolve();
       })
    });

    return ({
        getDogpacks,
        saveDogpack,
        mountDogpack,
        unmountDogpack,
        mountEmptyPack,
    })
};

module.exports = getDogpack;