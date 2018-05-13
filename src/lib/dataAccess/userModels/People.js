/**
 * User people model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var People;


/**
 * Constructor of people model.
 */
People = function () {
  ;
}


/**
 * Load a people model from an object.
 */
People.prototype.load = function (obj) {
  // Reset the model
  var newModel = new People;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  for (var o in obj) {
    if (obj.hasOwnProperty(o)) {
      var section = obj[o];
      if ((typeof(section.title)       == 'string' || section.title instanceof String)       && section.title           &&
          (typeof(section.institution) == 'string' || section.institution instanceof String) && section.institution     &&
          (typeof(section.items)       == 'array'  || section.items instanceof Array)        && section.items.length > 0) {
        var newSection = {};
        newSection.title = section.title;
        newSection.institution = section.institution;
        newSection.items = [];
        for (var i=0; i<section.items.length; ++i) {
          var item = section.items[i];
          if ((typeof(item.name)        == 'string' || item.name instanceof String)        && item.name        &&
              (typeof(item.position)    == 'string' || item.position instanceof String)    && item.position    &&
              (typeof(item.institution) == 'string' || item.institution instanceof String) && item.institution &&
              (typeof(item.description) == 'string' || item.description instanceof String) && item.description &&
              (typeof(item.photo)       == 'string' || item.photo instanceof String)       && item.photo       ) {
            var newItem = {};
            newItem.name = item.name;
            newItem.position = item.position;
            newItem.institution = item.institution;
            newItem.description = item.description;
            newItem.photo = item.photo;
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


module.exports = People;
