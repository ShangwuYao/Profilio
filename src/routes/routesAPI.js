/**
 * Routing rules for API namespace.
 *
 * Author:  David Qiu.
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var express = require('express');
var router = express.Router();
var createRouter = undefined;

var createDataAccess = drequire('dataAccess');
var dataAccess = undefined; // To be defined by create method

var routesAPIList = { get: {}, post: {}, put: {}, delete: {} };
var routesAPIIndex = {}; // To be constructed in the following


/**
 * Create a new router for API routing.
 *
 * @param datapath The path of the data.
 * @return An API router with the corresponding data.
 */
createRouter = function (datapath) {
  // Define data access
  dataAccess = createDataAccess(datapath);


  // GET: Configurations
  routesAPIList.get['configurations'] = function (req, res) {
    dataAccess.user('configurations', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Profile
  routesAPIList.get['profile'] = function (req, res) {
    dataAccess.user('profile', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Experiences
  routesAPIList.get['experiences'] = function (req, res) {
    dataAccess.user('experiences', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Abilities
  routesAPIList.get['abilities'] = function (req, res) {
    dataAccess.user('abilities', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Projects
  routesAPIList.get['projects'] = function (req, res) {
    dataAccess.user('projects', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Honors
  routesAPIList.get['honors'] = function (req, res) {
    dataAccess.user('honors', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Activities
  routesAPIList.get['activities'] = function (req, res) {
    dataAccess.user('activities', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: People
  routesAPIList.get['people'] = function (req, res) {
    dataAccess.user('people', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Supplements
  routesAPIList.get['supplements'] = function (req, res) {
    dataAccess.user('supplements', undefined, function (err, val) {
      res.json(val);
    });
  }

  // GET: Contact
  routesAPIList.get['contact'] = function (req, res) {
    dataAccess.user('contact', undefined, function (err, val) {
      res.json(val);
    });
  }


  // Register route operations and construct API index
  for (var method in routesAPIList) {
    var methodObject = routesAPIList[method];
    if (routesAPIList.hasOwnProperty(method)) {
      for (var route in methodObject) {
        // Construct route path
        var routePath = '/' + route;

        // Register operation
        var routeOperation = methodObject[route];
        if (methodObject.hasOwnProperty(route) && (typeof(routeOperation) == 'function' || routeOperation instanceof Function)) {
          router[method](routePath, routeOperation);
        }

        // Construct index
        if (!routesAPIIndex[route]) {
          routesAPIIndex[route] = {
            path: '/api' + routePath,
            methods: []
          };
        }
        routesAPIIndex[route].methods.push(method.toUpperCase());
      }
    }
  }


  // GET: API index
  router.get('/', function (req, res) {
    res.json(routesAPIIndex);
  });


  // Return the created object
  return router;
}


module.exports = createRouter;
