/**
 * User experiences model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Experiences;


/**
 * Constructor of experiences model.
 */
Experiences = function () {
  ;
}


/**
 * Load a experiences model from an object.
 */
Experiences.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Experiences;
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
          if ((typeof(item.institution) == 'string' || item.institution instanceof String) && item.institution &&
              (typeof(item.position)    == 'string' || item.position instanceof String)    && item.position    &&
              (typeof(item.description) == 'string' || item.description instanceof String) && item.description &&
              (typeof(item.location)    == 'string' || item.location instanceof String)    && item.location    &&
              (typeof(item.date)        == 'string' || item.date instanceof String)        && item.date        ) {
            var newItem = {};
            newItem.institution = item.institution;
            newItem.position    = item.position;
            newItem.description = item.description;
            newItem.location    = item.location;
            newItem.date        = item.date;
            if ((typeof(item.link) == 'string' || item.link instanceof String) && item.link) {
              newItem.link = item.link;
            }
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


module.exports = Experiences;
