/**
 * User contact model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Contact;


/**
 * Constructor of contact model.
 */
Contact = function () {
  this.ways = {};
}


/**
 * Load a contact model from an object.
 */
Contact.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Contact;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  if (obj.ways !== undefined) {
    for (var o in obj.ways) {
      if (obj.ways.hasOwnProperty(o)) {
        if (obj.ways[o].icon && (typeof(obj.ways[o].icon) == 'string' || obj.ways[o].icon instanceof String) &&
            obj.ways[o].text && (typeof(obj.ways[o].text) == 'string' || obj.ways[o].text instanceof String) ) {
          var way = {
            icon: obj.ways[o].icon,
            text: obj.ways[o].text
          };
          if (obj.ways[o].link && (typeof(obj.ways[o].link == 'string') || obj.ways[o].link instanceof String) ) {
            way.link = obj.ways[o].link;
          }
          this.ways[o] = way;
        }
      }
    }
  }
};


module.exports = Contact;
