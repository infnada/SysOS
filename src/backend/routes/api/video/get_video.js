/*jslint node: true */
"use strict";

var express = require("express");
var router = express.Router();
var path = require('path');

/**
 * API video - Get video file
 *
 * @description
 *
 */

router.get('/', function (req, res) {
    var file = path.join(__dirname, '../filesystem/juego.mp4');
    fs.stat(file, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 Error if file not found
                return res.sendStatus(404);
            }
            res.end(err);
        }

        var range = req.headers.range;
        if (!range) {
            // 416 Wrong range
            return res.sendStatus(416);
        }
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];
        var total = stats.size;
        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });
        var fileStream = fs.createReadStream(file, {
            start: start,
            end: end
        });
        fileStream.pipe(res);
        res.on('close', function () {
            console.log('response closed');
            if (res.fileStream) {
                res.fileStream.unpipe(this);
                if (this.fileStream.fd) {
                    fs.close(this.fileStream.fd);
                }
            }
        });

    });
});
module.exports = router;
