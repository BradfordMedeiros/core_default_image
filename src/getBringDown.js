const child_process = require('child_process');
const path = require('path');

const getBringDown = (IS_PRODUCTION) => {
    if (IS_PRODUCTION) {
        throw (new Error('not yet implemented'));
    }else {
        return () => new Promise((resolve, reject) => {
            const useImageMockPath = path.resolve('./mock_packages/mock_bin/bring_down.sh');
            const command = useImageMockPath;
            console.log('command is: ', command);
            child_process.exec(command, { cwd: path.resolve('./mock_packages/mock_bin') }, err => {       // @todo call real binary
                if (err) {
                    console.log(err.toString());
                    console.log('error bringing down');
                    reject(err);
                } else {
                    console.log('success bringing down');
                    resolve();
                }
            });
        });
    }
};

module.exports = getBringDown;