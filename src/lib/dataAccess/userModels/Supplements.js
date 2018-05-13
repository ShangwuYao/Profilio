/**
 * User supplements model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Supplements;


/**
 * Constructor of supplements model.
 */
Supplements = function () {
  ;
}


/**
 * Load a supplements model from an object.
 */
Supplements.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Supplements;
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
          if ((typeof(item.icon)  == 'string' || item.icon instanceof String)  && item.icon  &&
              (typeof(item.title) == 'string' || item.title instanceof String) && item.title &&
              (typeof(item.link)  == 'string' || item.link instanceof String)  && item.link  ) {
            var newItem = {};
            newItem.icon = item.icon;
            newItem.title = item.title;
            newItem.link = item.link;
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


module.exports = Supplements;
