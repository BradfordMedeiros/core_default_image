const fs = require('fs');
const path = require('path');

const getSoftware = (packageFolder, changeImage) => {

    const PACKAGES_PACKAGE_FOLDER = path.resolve(packageFolder, 'packages');
    const getPackageFolder = packageName => path.resolve(PACKAGES_PACKAGE_FOLDER, packageName);
    const getManifestInfo = automatePackageFolder => new Promise((resolve, reject) => {
        fs.readFile(path.resolve(automatePackageFolder, 'manifest.json'), (err, result) => {
           if (err){
               reject(err);
           }else{
               const parsedResult = JSON.parse(result.toString());
               resolve(parsedResult);
           }
        });

    });
    const getAvailableSoftware = () =>  new Promise((resolve, reject) => {
        fs.readdir(PACKAGES_PACKAGE_FOLDER, async (err, results) => {
            if (err){
                reject(err);
                return;
            }
            Promise.all(results.map(result => getManifestInfo(getPackageFolder(result)))).then(resolve).catch(reject);
        });
    });



    const PACKAGES_CONTROL_ACTIVE_PACKAGE_FILEPAATH = path.resolve(packageFolder, 'control', 'active_package');
    const setSoftwareAsActive = packageName => new Promise((resolve,  reject) => {
        const fileJSONContent = {
            active: true,
            active_package: packageName,
        };
        changeImage(getPackageFolder(packageName)).then(() => {
            fs.writeFile(PACKAGES_CONTROL_ACTIVE_PACKAGE_FILEPAATH, JSON.stringify(fileJSONContent), (err) => {
                if (err){
                    reject(err);
                    return;
                }
                resolve();
            });
        }).catch(reject);
    });
    const getActiveSoftware = () => new Promise((resolve, reject) => {
       fs.readFile(PACKAGES_CONTROL_ACTIVE_PACKAGE_FILEPAATH, (err,result) => {
           if (err){
               reject(err);
               return;
           }
           const parsedResult = JSON.parse(result.toString());
           if (parsedResult.active !== true){
               resolve(null);
           }else{
               const activePackage = parsedResult.active_package;
               resolve(getManifestInfo(getPackageFolder(activePackage)));
           }
       })
    });

    const software = {
        getAvailableSoftware,
        setSoftwareAsActive,
        getActiveSoftware,
    };

    return software;
};


module.exports = getSoftware;
