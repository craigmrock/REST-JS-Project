let fs = require('fs'); 

const FILE_NAME = './assets/customers.json';

let customerRepo = {
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
                let customer = JSON.parse(data).find(p => p.id == id); //parse data into JSON object, then perform find with arrow syntax
                resolve(customer);
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
                let customers = JSON.parse(data);
                //Perform search
                if (searchObject) {
                    customers = customers.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }

                resolve(customers);
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
            let customers = JSON.parse(data);
            customers.push(newData); //push new object onto the cusotomers array
            fs.writeFile(FILE_NAME, JSON.stringify(customers), function (err) { //puts object back into file
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
        let customers = JSON.parse(data);
        let customer = customers.find(p => p.id == id);
        if (customer) {
            Object.assign(customer, newData); //will change data if customer object found
            fs.writeFile(FILE_NAME, JSON.stringify(customers), function (err) { //puts object back into file
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
    //DELETE 
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
          if (err) {
            reject(err);
          }
          else {
            let customers = JSON.parse(data);
            let index = customers.findIndex(p => p.id == id);
            if (index != -1) {
              customers.splice(index, 1);
              fs.writeFile(FILE_NAME, JSON.stringify(customers), function (err) {
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

module.exports = customerRepo; //expose data from this module