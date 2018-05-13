/**
 * Common utilities.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */


if (typeof(jQuery) === 'undefined') {
  throw new Error('Client JavaScripts require jQuery.');
}


(function ($) {
  /**
   * Initialize view layouts.
   */
  var initializeViewLayouts = function () {
    var winHeight = $(window).height();
    var winWidth  = $(window).width();

    ;
  }

  /**
   * Refresh view layouts.
   */
  var refreshViewLayouts = function () {
    var winHeight = $(window).height();
    var winWidth  = $(window).width();

    $('.d-coral').css('min-height', $(window).height() + 'px');
  }


  // Handler for window resize event
  var handler_onWindowResize = function (event) {
    refreshViewLayouts();
  }


  // Handler for window load event
  var handler_onWindowLoad = function (event) {
    initializeViewLayouts();
    refreshViewLayouts();
  }


  /**
   * Register events.
   */
  var registerEvents = function () {
    // Register: Window load event handler
    $(window).load(handler_onWindowLoad);

    // Register: Window resize event handler
    $(window).resize(handler_onWindowResize);
  }


  // Register events
  registerEvents();

})(jQuery);


