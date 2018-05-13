/**
 * Website general require tool.
 *
 * Author:  David Qiu.
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */


var drequire = function (module_name) {
  switch (module_name) {
    // MODULE: dataAccess
    case 'dataAccess':      return require('./lib/dataAccess/index');

    // MODULE: routes
    case 'routes':          return require('./routes/routes');

    // MODULE: routesAPI
    case 'routesAPI':       return require('./routes/routesAPI');

    // MODULE: (not found)
    default:                return undefined;
  }
}


module.exports = drequire;
