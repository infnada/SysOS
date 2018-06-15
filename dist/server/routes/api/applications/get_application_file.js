/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API applications - Get application file
 *
 * @description
 *
 */

router.get('/:file', function (req, res) {
    var file = path.join(__dirname, '../../../filesystem/bin/applications/' + req.params.file);

    res.sendFile(file);
});

module.exports = router;
