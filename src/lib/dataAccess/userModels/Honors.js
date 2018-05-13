/**
 * User honors model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Honors;


/**
 * Constructor of honors model.
 */
Honors = function () {
  ;
}


/**
 * Load a honors model from an object.
 */
Honors.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Honors;
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
          if ((typeof(item.prize)    == 'string' || item.prize instanceof String)    && item.prize    &&
              (typeof(item.activity) == 'string' || item.activity instanceof String) && item.activity &&
              (typeof(item.location) == 'string' || item.location instanceof String) && item.location &&
              (typeof(item.date)     == 'string' || item.date instanceof String)     && item.date     ) {
            var newItem = {};
            newItem.prize = item.prize;
            newItem.activity = item.activity;
            newItem.location = item.location;
            newItem.date = item.date;
            if ((typeof(item.host) == 'string' || item.host instanceof String) && item.host) {
              newItem.host = item.host;
            }
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


module.exports = Honors;
