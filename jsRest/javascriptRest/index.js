//Bring in the express server and create application
let express = require('express')
let app = express();
let dessertRepo = require('./repos/dessertRepo'); //brings in anything exported from repos module
let customerRepo = require('./repos/customerRepo');
let orderRepo = require('./repos/orderRepo');
let errorHelper = require('./helpers/errorHelpers');
let cors = require('cors');

//Use the express router object
let router = express.Router();

//Configure middleware to support JSON data parsing in request object
app.use(express.json());

//Configure CORS
app.use(cors());

//Create GET to return a list of all desserts
router.get('/desserts/', function (req, res, next) {
    dessertRepo.get(function (data) { //if we get data, do status with JSON data
        res.status(200).json({ //pass JSON object 
            "status": 200,
            "statusText": "Ok",
            "message": "All desserts retrieved.",
            "data": data
        });
    }, function(err) {
        next(err); //if no data, send error
    });
});

//Create GET to return a list of all customers
router.get('/customers/', function (req, res, next) {
  customerRepo.get(function (data) { //if we get data, do status with JSON data
      res.status(200).json({ //pass JSON object 
          "status": 200,
          "statusText": "Ok",
          "message": "All customers retrieved.",
          "data": data
      });
  }, function(err) {
      next(err); //if no data, send error
  });
});

//Create GET to return a list of all orders
router.get('/orders/', function (req, res, next) {
  orderRepo.get(function (data) { //if we get data, do status with JSON data
      res.status(200).json({ //pass JSON object 
          "status": 200,
          "statusText": "Ok",
          "message": "All orders retrieved.",
          "data": data
      });
  }, function(err) {
      next(err); //if no data, send error
  });
});

//SEARCH for item by id and name, works with just name or id also
router.get('/search/desserts', function (req, res, next) { //search has to go before get id method since it is more generic
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    dessertRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message": "Single dessert retrieved.",
            "data": data
        });
    }, function(err) {
        next(err); 
    });
});

//SEARCH for customer by id and name, works with just name or id also
 router.get('/search/customers', function (req, res, next) { //search has to go before get id method since it is more generic
  let searchObject = {
      "id": req.query.id,
      "name": req.query.firstName
  };

  customerRepo.search(searchObject, function (data) {
      res.status(200).json({
          "status": 200,
          "statusText": "Ok",
          "message": "Single customer retrieved.",
          "data": data
      });
  }, function(err) {
      next(err); 
  });
}); 


//Create GET/id to return single dessert
router.get('/desserts/:id', function (req, res, next) {
    dessertRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "Ok",
                "message": "Single dessert retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The dessert '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The dessert '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err); 
    });
});

//Create GET/id to return single customer
router.get('/customers/:id', function (req, res, next) {
  customerRepo.getById(req.params.id, function (data) {
      if (data) {
          res.status(200).json({
              "status": 200,
              "statusText": "Ok",
              "message": "Single customer retrieved.",
              "data": data
          });
      }
      else {
          res.status(404).json({
              "status": 404,
              "statusText": "Not Found",
              "message": "The customer '" + req.params.id + "' could not be found.",
              "error": {
                  "code": "NOT_FOUND",
                  "message": "The cust '" + req.params.customerid + "' could not be found."
              }
          });
      }
  }, function(err) {
      next(err); 
  });
});

//POST a new dessert method
router.post('/desserts/', function (req, res, next) {
    dessertRepo.insert(req.body, function(data) { 
        res.status(201).json({
            "status": 201, //means data was created
            "statusText": "Created",
            "message": "New Dessert Added.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
})

//POST a new customer method
router.post('/customers/', function (req, res, next) {
  customerRepo.insert(req.body, function(data) { 
      res.status(201).json({
          "status": 201, //means data was created
          "statusText": "Created",
          "message": "New Customer Added.",
          "data": data
      });
  }, function(err) {
      next(err);
  });
})

//PUT method for desserts
router.put('/desserts/:id', function (req, res, next) {
    dessertRepo.getById(req.params.id, function (data) {
      if (data) {
        // Attempt to update the data
        dessertRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message": "Dessert '" + req.params.id + "' updated.",
            "data": data
          });
        });
      }
      else {
        res.status(404).send({
          "status": 404,
          "statusText": "Not Found",
          "message": "The dessert '" + req.params.id + "' could not be found.",
          "error": {
            "code": "NOT_FOUND",
            "message": "The dessert '" + req.params.id + "' could not be found."
          }
        });
      }
    }, function(err) {
      next(err);
    });
  })

//PUT method for customers
router.put('/customers/:id', function (req, res, next) {
  customerRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      customerRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "Ok",
          "message": "Customer '" + req.params.id + "' updated.",
          "data": data
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "The customer '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The customer '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function(err) {
    next(err);
  });
})

//DELETE dessert
router.delete('/desserts/:id', function (req, res, next) {
  dessertRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to delete the data
      dessertRepo.delete(req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "The dessert '" + req.params.id + "' is deleted.",
          "data": "Dessert '" + req.params.id + "' deleted."
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "The pie '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The pie '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function(err) {
    next(err);
  });
})

//DELETE customer
router.delete('/customers/:id', function (req, res, next) {
  customerRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to delete the data
      customerRepo.delete(req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "The customer '" + req.params.id + "' is deleted.",
          "data": "Customer '" + req.params.id + "' deleted."
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "The customer '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The customer '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function(err) {
    next(err);
  });
})

//PATCH dessert
router.patch('/desserts/:id', function (req, res, next) {
  dessertRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      dessertRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "Dessert '" + req.params.id + "' patched.",
          "data": data
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "The dessert '" + req.params.id + "' could not be found.",
        "error": {
          "code": "NOT_FOUND",
          "message": "The dessert '" + req.params.id + "' could not be found."
        }
      });
    }
  }, function (err) {
    next(err);
  });
})

//Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Configure exception logger
app.use(errorHelper.logErrors);
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
});