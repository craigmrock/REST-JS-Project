let fs = require('fs');

const FILE_NAME = './assets/desserts.json';

let dessertRepo = {
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
    },
    //GET by ID
    getById: function (id, resolve, reject) { //pass in id and also a resolve or reject
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let dessert = JSON.parse(data).find(p => p.id == id); //parse data into JSON object, then perform find with arrow syntax
                resolve(dessert);
            }
        })
    },
    //SEARCH function
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err,data) {
            if (err) {
                reject(err);
            }
            else {
                let desserts = JSON.parse(data);
                //Perform search
                if (searchObject) {
                    desserts = desserts.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }

                resolve(desserts);
            }
        });
    },
    //INSERT function
    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
          if (err) {
            reject(err);
          }
          else {
            let desserts = JSON.parse(data);
            desserts.push(newData); //push new object onto the desserts array
            fs.writeFile(FILE_NAME, JSON.stringify(desserts), function (err) { //puts object back into file
              if (err) {
                reject(err);
              }
              else {
                resolve(newData);
              }
            });
          }
        });
      },
    //UPDATE function
    update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
        if (err) {
        reject(err);
        }
        else {
        let desserts = JSON.parse(data);
        let dessert = desserts.find(p => p.id == id);
        if (dessert) {
            Object.assign(dessert, newData); //will change data if dessert object found
            fs.writeFile(FILE_NAME, JSON.stringify(desserts), function (err) { //puts object back into file
                if (err) {
                    reject(err);
                }
                else {
                    resolve(newData);
                }
            });
          }
        }
      });
    },
    //DELETE function 
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
          if (err) {
            reject(err);
          }
          else {
            let desserts = JSON.parse(data);
            let index = desserts.findIndex(p => p.id == id);
            if (index != -1) {
              desserts.splice(index, 1);
              fs.writeFile(FILE_NAME, JSON.stringify(desserts), function (err) {
                if (err) {
                  reject(err);
                }
                else {
                  resolve(index);
                }
              });
            }
          }
        });
      }
};

module.exports = dessertRepo; //expose data from this module