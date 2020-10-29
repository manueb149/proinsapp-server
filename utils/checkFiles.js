const fs = require('fs');
const directoryPath = __basedir + "/resources/static/assets/uploads/";

const checkFiles = ( fileName ) => {
    var res = false;
    fs.readdir(directoryPath, function (err, files) {
        if(err) {
            res = false;
        }
        const filesInfo = [];
        files.forEach(file => {
            filesInfo.push(file);
        });

        const result = filesInfo.filter((file) => {
            return file===fileName.toUpperCase();
        });

        if(result.length>0){
            res = true;
        }
    });
    return res;
};

module.exports = checkFiles;