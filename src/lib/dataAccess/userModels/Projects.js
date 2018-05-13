/**
 * User projects model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Projects;


/**
 * Constructor of projects model.
 */
Projects = function () {
  this.items = [];
}


/**
 * Load a projects model from an object.
 */
Projects.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Projects;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  if ((typeof(obj.items) == 'array' || obj.items instanceof Array) && obj.items.length > 0) {
    for (var i=0; i<obj.items.length; ++i) {
      var item = obj.items[i];
      if ((typeof(item.name)         == 'string' || item.name instanceof String)         && item.name         &&
          (typeof(item.organization) == 'string' || item.organization instanceof String) && item.organization &&
          (typeof(item.description)  == 'string' || item.description instanceof String)  && item.description  &&
          (typeof(item.image)        == 'string' || item.image instanceof String)        && item.image        &&
          (typeof(item.date)         == 'string' || item.date instanceof String)         && item.date         &&
          (typeof(item.location)     == 'string' || item.location instanceof String)     && item.location     ) {
        var newItem = {};
        newItem.name = item.name;
        newItem.organization = item.organization;
        newItem.description = item.description;
        newItem.date = item.date;
        newItem.location = item.location;
        newItem.visible = !!(item.visible);
        if ((typeof(item.link) == 'string' || item.link instanceof String) && item.link) {
          newItem.link = item.link;
        }
        newItem.image = item.image;
        if ((typeof(item.imageBackgroundColor) == 'string' || item.imageBackgroundColor instanceof String) && item.imageBackgroundColor) {
          newItem.imageBackgroundColor = item.imageBackgroundColor;
        }
        this.items.push(newItem);
      }
    }
  }
};


module.exports = Projects;
