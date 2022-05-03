let fs = require('fs'); 

const FILE_NAME = './assets/orders.json';

let orderRepo = {
    //GET function
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err); //if there is an error, reject
            }
            else {
                resolve(JSON.parse(data)); //if correct, call resolve call back and convert data to JSON
            }
        });
    }
};

module.exports = orderRepo; //expose data from this module