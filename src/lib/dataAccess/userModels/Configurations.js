/**
 * User configurations model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Configurations;


/**
 * Constructor of configurations model.
 */
Configurations = function () {
  this.homecover = {};
  this.homecover.title = '';
  this.homecover.subtitle = '';
  this.homecover.left = '';
  this.homecover.right = '';

  this.corals = {}; // .coral = { class, visible }
}


/**
 * Load a configurations model from an object.
 */
Configurations.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Configurations;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  if (obj.homecover) {
    if ((typeof(obj.homecover.title) == 'string' || obj.homecover.title instanceof String) && obj.homecover.title) {
      this.homecover.title = obj.homecover.title;
    }
    if ((typeof(obj.homecover.subtitle) == 'string' || obj.homecover.subtitle instanceof String) && obj.homecover.subtitle) {
      this.homecover.subtitle = obj.homecover.subtitle;
    }
    if ((typeof(obj.homecover.left) == 'string' || obj.homecover.left instanceof String) && obj.homecover.left) {
      this.homecover.left = obj.homecover.left;
    }
    if ((typeof(obj.homecover.right) == 'string' || obj.homecover.right instanceof String) && obj.homecover.right) {
      this.homecover.right = obj.homecover.right;
    }
  }
  if (obj.corals) {
    for (var o in obj.corals) {
      if (obj.corals.hasOwnProperty(o)) {
        var coral = obj.corals[o];
        if ((typeof(coral.class) == 'string' || coral.class instanceof String) && coral.class) {
          var newCoral = {};
          newCoral.class = coral.class;
          newCoral.visible = !!(coral.visible);
          this.corals[o] = newCoral;
        }
      }
    }
  }
};


module.exports = Configurations;
