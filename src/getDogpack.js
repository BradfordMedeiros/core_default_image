const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const tar = require('tar');

const getDogpack = (packagesFolder, dataFolder, packsFolder) => {
    const getPackagePackPathFolder = packageName => path.resolve(packsFolder, packageName);
    const getDefaultPackagePak = packageName => path.resolve(getPackagePackPathFolder(packageName), `${packageName}.dogpak`);

    const getDogpacks = () => new Promise((resolve, reject) => {
        fs.readdir(packsFolder, (err, dogpackFolders) => {
            if (err) {
                reject(err);
                return;
            }

            const files = {};
            Promise.all(dogpackFolders.map(async dogpakFolder => {
                const dogpackDataPromise = getPakDataForFolder(getPackagePackPathFolder(dogpakFolder));
                files[dogpakFolder] = await dogpackDataPromise;
                return dogpackDataPromise;
            })).then(() => resolve(files)).catch(reject);
        });
    });
    const getPakDataForFolder = productFolder => new Promise((resolve, reject) => {
        fs.readdir(productFolder, (err, packFiles) => {
            if (err){
                reject(err);
                return;
            }
            resolve(packFiles);
        });
    });

    const dogpackExists = packageName => new Promise(resolve => {
        const dogpackPath = getDefaultPackagePak(packageName);
        fs.exists(dogpackPath, resolve);
    });


    const saveDogpack = packageName => new Promise((resolve, reject) => {
        fs.mkdir(getPackagePackPathFolder(packageName), () => {  // intentionally ignore error since it doesn't matter (always?)
            const dogpackName = getDefaultPackagePak(packageName);
            tar.c({
                cwd: dataFolder,
                file: dogpackName,
            }, ['.']).then(resolve).catch(reject);
        });
    });

    const loadDogpack = packageName => new Promise((resolve, reject) => {
        const dogpackName = getDefaultPackagePak(packageName);
        tar.x({
            file: dogpackName,
            cwd: dataFolder,
        }).then(resolve).catch(reject);
    });

    const unloadDogpack = () => new Promise((resolve, reject) => {
        rimraf(path.resolve(dataFolder,'*'), err => {
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });


    const deleteStorage = packageName => new Promise((resolve, reject) => {
        rimraf(getPackagePackPathFolder(packageName), err => {
            if (err){
                reject(err);
                return;
            }
            resolve();
        })
    });

    return ({
        getDogpacks,
        dogpackExists,
        saveDogpack,
        loadDogpack,
        unloadDogpack,
        deleteStorage,
    });
};

module.exports = getDogpack;