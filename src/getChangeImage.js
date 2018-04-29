const child_process = require('child_process');
const path = require('path');

const getChangeImage = (IS_PRODUCTION, NAMED_PIPE_LOCATION) => {
    if (IS_PRODUCTION) {
        return imageName => new Promise((resolve, reject) => {
            const command = `echo "/opt/automated/use_image.sh '${imageName}'" > ${NAMED_PIPE_LOCATION}`;
            console.log('command is: ', command);
            child_process.exec(command, err => {       // @todo call real binary
                if (err) {
                    console.log('error installing');
                    reject(err);
                } else {
                    console.log('success installing');
                    resolve();
                }
            });
        });

    }else {
        return packageFolder => new Promise((resolve, reject) => {
            const useImageMockPath = path.resolve('./mock_packages/mock_bin/use_image.sh');
            const command = `${useImageMockPath} ${packageFolder}`;
            console.log('command is: ', command);
            child_process.exec(command, { cwd: path.resolve('./mock_packages/mock_bin') }, err => {       // @todo call real binary
                if (err) {
                    console.log(err.toString());
                    console.log('error installing');
                    reject(err);
                } else {
                    console.log('success installing');
                    resolve();
                }
            });
        });
    }
};

module.exports = getChangeImage;