/**
 * Routing rules for root namespace.
 *
 * Author:  David Qiu.
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */

var express = require('express');
var router = express.Router();

// GET: Homepage
router.get('/', function(req, res) {
  res.render('homepage', {});
});

module.exports = router;
