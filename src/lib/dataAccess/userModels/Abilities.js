/**
 * User abilities model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Abilities;


/**
 * Constructor of abilities model.
 */
Abilities = function () {
  ;
}


/**
 * Load a abilities model from an object.
 */
Abilities.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Abilities;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  for (var o in obj) {
    if (obj.hasOwnProperty(o)) {
      var section = obj[o];
      if ((typeof(section.title) == 'string' || section.title instanceof String) && section.title &&
          (typeof(section.items) == 'array'  || section.items instanceof Array)  && section.items.length > 0) {
        var newSection = {};
        newSection.title = section.title;
        newSection.items = [];
        for (var i=0; i<section.items.length; ++i) {
          var item = section.items[i];
          if ((typeof(item.name) == 'string' || item.name instanceof String) && item.name &&
              (typeof(item.rate) == 'number' || item.rate instanceof Number) &&
              0 <= item.rate && item.rate <= 5) {
            var newItem = {};
            newItem.name = item.name;
            newItem.rate = Math.round(item.rate);
            newSection.items.push(newItem);
          }
        }
        if (newSection.items.length > 0) {
          this[o] = newSection;
        }
      }
    }
  }
};


module.exports = Abilities;
