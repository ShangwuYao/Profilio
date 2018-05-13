/**
 * Data access.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var dataAccess = {};
var createDataAccess = undefined;
var helper = {};

var fs = require('fs');
var path = require('path');
var Promise = require('promise');

var Configurations = require('./userModels/Configurations');
var Profile = require('./userModels/Profile');
var Experiences = require('./userModels/Experiences');
var Abilities = require('./userModels/Abilities');
var Projects = require('./userModels/Projects');
var Honors = require('./userModels/Honors');
var Activities = require('./userModels/Activities');
var People = require('./userModels/People');
var Supplements = require('./userModels/Supplements');
var Contact = require('./userModels/Contact');


/**
 * User models.
 */
dataAccess.userModels = {};
dataAccess.userModels.Configurations = Configurations;
dataAccess.userModels.Profile = Profile;
dataAccess.userModels.Experiences = Experiences;
dataAccess.userModels.Abilities = Abilities;
dataAccess.userModels.Projects = Projects;
dataAccess.userModels.Honors = Honors;
dataAccess.userModels.Activities = Activities;
dataAccess.userModels.People = People;
dataAccess.userModels.Supplements = Supplements;
dataAccess.userModels.Contact = Contact;


/**
 * User model mapping.
 */
helper.userModelMapping = {};
helper.userModelMapping.configurations = dataAccess.userModels.Configurations;
helper.userModelMapping.profile = dataAccess.userModels.Profile;
helper.userModelMapping.experiences = dataAccess.userModels.Experiences;
helper.userModelMapping.abilities = dataAccess.userModels.Abilities;
helper.userModelMapping.projects = dataAccess.userModels.Projects;
helper.userModelMapping.honors = dataAccess.userModels.Honors;
helper.userModelMapping.activities = dataAccess.userModels.Activities;
helper.userModelMapping.people = dataAccess.userModels.People;
helper.userModelMapping.supplements = dataAccess.userModels.Supplements;
helper.userModelMapping.contact = dataAccess.userModels.Contact;


/**
 * Data paths.
 */
helper.datapath = undefined;


/**
 * Get or set an attribute value of the user data.
 *
 * @param attr A string indicating the attribute name.
 * @param val The update value of the attribute. It is optional. An undefined 
 *            indicates to get the current value of the attribute, while an 
 *            object value indicates to set update value of the attribute. Note 
 *            that it can be a string `default`, which means to set default 
 *            value to the corresponding attribute.
 * @param callback The function to call after operation finishes. The form of 
 *                 the callback function is `function (err, val)`, where `err` 
 *                 is the error occurs and `val` is the current value of the 
 *                 attribute. It is optional.
 * @return A promise of this operation, where the form of the reject function 
 *         is `function (err)` and the form of the resolve function is 
 *         `function (val)`.
 */
dataAccess.user = function (attr, val, callback) {
  return new Promise(function (resolve, reject) {
    // Check parameters
    var hasCallback = (typeof(callback) == 'function' || callback instanceof Function);
    if (!(typeof(attr) === 'string')) {
      var err = new Error('Invalid parameter. The attribute name must exist and be a string.');
      if (hasCallback) callback(err);
      reject(err);
      return;
    }
    var checkAttrExists = false;
    for (var o in helper.userModelMapping) {
      if (helper.userModelMapping.hasOwnProperty(o) && o == attr) {
        checkAttrExists = true;
      }
    }
    if (!checkAttrExists) {
      var err = new Error('Invalid parameter. The corresponding attribute does not exist.');
      if (hasCallback) callback(err);
      reject(err);
      return;
    }

    // Select operation
    var Model = helper.userModelMapping[attr];
    var updateVal = new Model;
    var modelpath = path.resolve(helper.datapath + '/user/' + attr + '.json');
    if (val == 'default') { // Set default
      return dataAccess.user(attr, updateVal, callback);
    } else if (val === undefined) { // Get
      fs.exists(modelpath, function (exists) {
        if (exists) { // exists
          fs.readFile(modelpath, function (err, data) {
            // Check error
            if (err) {
              if (hasCallback) callback(err);
              reject(err);
              return;
            }

            // Load the read model and response
            updateVal.load(JSON.parse(data));
            if (hasCallback) callback(undefined, updateVal);
            resolve(updateVal);
            return;
          });
          return;
        } else { // not exists
          if (hasCallback) callback(undefined, updateVal);
          resolve(updateVal);
          return;
        }
      });
      return;
    } else if (typeof(val) == 'object' || val instanceof Object) { // Set
      // Stringify the model and write
      updateVal.load(val);
      var data = JSON.stringify(updateVal);
      fs.writeFile(modelpath, data, function (err) {
        // Check error
        if (err) {
          if (hasCallback) callback(err);
          reject(err);
          return;
        }

        // Response with updated value
        if (hasCallback) callback(undefined, updateVal);
        resolve(updateVal);
        return;
      });
      return;
    } else { // Invalid
      var err = new Error('Invalid parameter. The type of value is invalid.');
      if (hasCallback) callback(err);
      reject(err);
      return;
    }
  });
}


/**
 * Create a new data access.
 *
 * @param datapath The path of the data.
 * @return A data access to the corresponding data.
 */
createDataAccess = function (datapath) {
  helper.datapath = datapath;
  return dataAccess;
}


module.exports = createDataAccess;
