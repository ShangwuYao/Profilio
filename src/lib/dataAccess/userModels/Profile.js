/**
 * User profile model.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var Profile;


/**
 * Constructor of user profile model.
 */
Profile = function () {
  this.introduction = '';
  this.details = {}; // .item = { title, text }
}


/**
 * Load a profile model from an object.
 */
Profile.prototype.load = function (obj) {
  // Reset the model
  var newModel = new Profile;
  for (var o in newModel) {
    if (newModel.hasOwnProperty(o)) this[o] = newModel[o];
  }

  // Update the model
  if ((typeof(obj.introduction) == 'string' || obj.introduction instanceof String) && obj.introduction ) {
    this.introduction = obj.introduction;
  }
  for (var o in obj.details) {
    if (obj.details.hasOwnProperty(o)) {
      var item = obj.details[o];
      if ((typeof(item.icon)  == 'string' || item.icon  instanceof String) && item.icon  &&
          (typeof(item.title) == 'string' || item.title instanceof String) && item.title &&
          (typeof(item.text)  == 'string' || item.text  instanceof String) && item.text  ) {
        var newItem = {};
        newItem.icon  = item.icon;
        newItem.title = item.title;
        newItem.text  = item.text;
        this.details[o] = newItem;
      }
    }
  }
};


module.exports = Profile;
