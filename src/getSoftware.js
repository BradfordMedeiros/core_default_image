

const child_process = require('child_process');

const getSoftware = (isProduction, namedPipeLocation) => {
    const changeImage = imageName => new Promise((resolve, reject) => {
        if (isProduction){
            // @todo need to escape this better so cannot  just inject anything here
            child_process.exec(`/opt/automated/use_image.sh '${imageName}' >  ${namedPipeLocation}`, err => {       // @todo call real binary
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        }else{
            console.log('changing image to ', imageName);
            resolve();
        }
    });

    let activeIndex = 0;
    const softwareMock = [
        {
            name: 'automate 0.7',
            dockerUrl: 'bradfordmedeiros/automate_arm_0.7.0',
            imageUrl: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAA/1BMVEUvKyz///8rICItJScuKCkvKysgHyBDV1QwMDArHyHl+vdHZmEsIiQUAAAqHR/u+vg6R0VHYFx7m5fV9O/c9vL6//8lGhtEXFhBVFGGqqXO8+0PAAAnHyFHX1tQdW85REIbAACZwbu98em+2NQnEhdsh4M6W1ZNb2o1OjkoFxrb/vgZAAh0k46vyMSJnZun1s9zpJxekIhQhn6g3tQpMzF3rqWgvLgdEBLf7uwvRkJ7wLUWERJqgX0bLSq17uSIv7nH5eFcg32NqqdzNidcdnOloaE8a2a9c1jCQhnm4uNkX140ISEWJyyw3tdkppz7UxmTblrkglypSCpWWlMAEQ5bXsMxAAAGSUlEQVR4nO2ae3eaSBjGgRmCMBOQChFRIatGRJON2jRuNm1T99K9de/9/p9lZxhUME3q2ZOGc4b3d04PBPhj5ul7eWZGRQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoA7gqgdQPWiCqh5CxWDqJoFW9SiqxSTN1DBo1cOoEKy5TaRQI6ixCJRJoCu1FsEUEnAR6poOGmluWkJdI4EnwvYPrZYisI5QnDVPB72ywVSDSZplb1S7dMClRBAwEWpllsz7EvCaUKfucC8RBDVqkTr9tAR1EkH7VCLkrwyjFjXBfigKOPWIBErizCDrCkYYUUoR1TR2h5Xa2ObcIGNk6kE7cJMoSdg/l91jE/EtJSp9OvBEwBjZBkncOG5gqrFI0ChuxLFLksCmGGuB3JGgkZhSvZkkEw0xLXZbieweITNOklhBUvsE7g7TCXGb9gNFkQVIQPqNVOJ0sEmMk36DPrKTrGM6cYktazromhsTYuJH99J5TmiUGIGcCyitT5IGUh5dIOM4CILm1ThZRE37uQb2fKRk3TQ/d56CyCTWk6HjT62XhnQipOvlZxVgGvTN447K8FR1MJZMBDuKRgd8htzZtZpp8Muv6iD47UPji4/s2bCTdnrId6j9gyo08H9U/fc//fz9lx7Zs6ElN6ujPXriojeKKME71ff9LBdUdfzX33/+86HqwT8R6dzaxxuEnmW1fl+MSQH3j+xlaxmNGeto8W+v6rE/GbOOWsazNnfDmxHaMppnz85PjVQz08gduX1pCqO+J0Lo7+79ZLX97mTutVqt6ZpErtuP1rZur4lZ4bifluOiCC2/KIi/3raME/HV2cikaUzabFlhLyTabS6IYDnlxJhuRUhFLngfEWoSzWUa4Ekk0QJqlw6tveLARFgJ/2QuRYQMb+PExFwDhSYyLaA2keA4+xp4/lrUBMR6oxDhPfMTmQYKJoFEkZCL4O1LoPpWLgIyXgiZvOFHlGtACZJJhFnn0xrwR+uZwtcLV7xpOiGLhI8oj4M4MIO2ZOmwVw58x/MGnuecrbL1wrmQgIlwJDRgLpNSmSKBi1DWgM2ex4Hv8O6AXHp84ecfDMfiPx+5E0yDtjw+gaVDKRcyt+RnrtFaz5gG9Obl5t3lbZ4MTaxItdt83Cn0BT8sVcn1zLWbpHu5qZTDo0wEO2IXFgkypcN0q0GrdGGREDSJiY7urMwmWOrlEfcNqJ8ZBZlqwmy+scq5YfS2gTF91dYwRrNLi5UJ3wrVi67Cd9iyyWsyRcLpvBQGzq5AWOE8cF13sXzJVtceT5QXzEbTKBVnkdK1yE0dcHZ9gnVJ/+wUJzQ9GrJymT26QQpK8p5AZSqMs3lmhVgO+C1rJ8GARYa/vmJtwCRCAlW9XrFc2JxLpdGk0nE/KbP51LNCy2sVGqXTYnHArosrrNDxpnA6V3gXB0Zbph/6Z2aptHjiOcEigYXGeXd1/NX2+XkPbepBWyKjxGFmqbSAFGUh5IHgX3x9uXtxMUNiL4lFgTzVQFB2jE7ulkSTCAviWF2a+QPNYH2z6kE/NUWz5IQWr43MMHARihKo/puU+0RNtkQQiO6QSfBWGKZW1iD3FpY3kybWmQSyJYJgNt9GQRYEwjAO9jVos3WjIZFHLHPaEeVQFIZQlMWia8pygVAeBdL+qv204/ApZ5NuObwmhKpaFsF6Y9htaaOAs1peDrI9lOk0S4ew0CgFwzGSNxEEo+XR+PV8vTzj3L3dFMmdCN+1mQTSJoIgjRqjdqr1er2T7t2uWW5FWMseBRwtahB+sooLBnknwjuZzpkexo76E6zg26IEGxH8byU6b3wMO4rMfQlyEaT7VdJD6PYi7u5LkIkwrYsEjFFyXwLuH2skAb69nt47iWV2wT2pemTPBu5es8y/dw4Zjk8k9wU7MgnYlMNSKHwzv7FrI4HSuxCznlqWlR89OMPX45o0xQzkvsh51TlfLNj1tXF1LNNZwgGgk5xRoqf82kO2zIvlx7GjSbZlKOnG2WFoXASdyrpxdhgmE0HavcMD0e2oIfeu0QEwEQzZt0w+D5XpTPH/It1pEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAA/wEs9nb6zYXSMQAAAABJRU5ErkJggg==)',
        },
        {
            name: 'automate 0.8',
            dockerUrl: 'bradfordmedeiros/automate_arm_0.8.0',
            imageUrl: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAAAYFBMVEXr6+vv7+9MTEzOzs7W1taIiIjS0tLx8fFFRUXq6uqfn59+fn6+vr53d3dVVVWsrKzd3d3IyMiXl5eMjIxdXV21tbXk5ORwcHBbW1tjY2Oenp7c3NxSUlJBQUG/v7+np6c/AtUHAAACbElEQVR4nO3bXXOyMBCG4SyIG+TTDxCs1v//L19ox1p1mfY9qQ65rxNHj8gz2Qhh4xwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC9FVF3atm3qVOXZF/MaRNv1Odn33a7r98l53RKM0/Q9K32frKrzsapWSe/L7D3VZ1/WU0l67nzR1DLU0DJ6G+pH6qbw3TngXESa4/FQD1GMX+Jo8fEpWh/KspFA60jqzG/qy6S4pDLSuIyyOshYdN318bVQvqcii2PTd+sAq0gbn6TfpsNtKtEiTXwTXCxanVY3g75LZSm6OlWBxTLMlNtQHlNxugpstsgy2twN+DEVp5uPj2Cku+x+uEYqTrJd+sdX9kS67dpfpdJ222BqSGKfPwzWSsVp7uNQakiK4nEGmKk4LYpAUpH1yZgAdioSn9ZhxCKZMVUmUhkmy8O6PEvyFuXGQCdSkTx6CyEWqcrW+tlOxbVlFUQqWWL9206lokkYJRQ11jCnUpEm+qPreiZZePM2fjKVpV/Mf7JIXtbm7xOpuLq0FueZkao3n20mU0n7AJZbPexVDONutpmK7FfzfxbSzW6bWLKjnYru7zcdZuj/UylCSGW6gux1RfaH+afCamvhn9nCXZyNO34DT4cWdhIs7DqZ2KG0sJtt4s2HhbdkJt6omnj7bqFTwzQsGL/p6nlcfuaNDjDTT92CLsRuwR86S6NAO0u/upAvDzzXVETj0gfahfzZsV5ecvlKRbTeBNyx7sYTH/enG1zwpxtG6vLPkzDN9SRM7sLOZMSpqQmcsAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvLB/XuUfPL1PrdcAAAAASUVORK5CYII=)'
        },
    ];

    const getAvailableSoftware = () => {
        return softwareMock;
    };

    const setSoftwareAsActive = async dockerUrl => {
        const index = softwareMock.findIndex(sw => sw.dockerUrl === dockerUrl);
        if (index < 0){
            throw (new Error('invalid docker url'));
        }
        activeIndex = index;
        await changeImage(dockerUrl);
    };

    const getActiveSoftware = () => {
        return softwareMock[activeIndex];
    };

    const software = {
        getAvailableSoftware,
        setSoftwareAsActive,
        getActiveSoftware,
    };

    return software;
};


module.exports = getSoftware;
