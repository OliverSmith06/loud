"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var fs_1 = require("fs");
var pg_1 = require("pg");
var path_1 = require("path");
var multer_1 = require("multer");
dotenv_1.default.config();
var headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');
headers.set('X-Custom-Header', 'CustomValue');
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
var pool = new pg_1.Pool({
    user: 'ollie',
    host: 'localhost',
    database: 'load',
    password: 'Fl4m1ng0',
    port: 5433,
});
app.get('/getDances', function (req, res) {
    pool.query('SELECT * FROM dances ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
app.get('/addTestDance', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email;
    pool.query('INSERT INTO dances (name, "desc", dance_order) VALUES ($1, $2, $3) RETURNING *', [["Drama - Aespa"], ["first dance learning"], "0"], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(201).send("User added with ID: ".concat(results.rows[0].id));
    });
});
app.get('/video/:filename', function (req, res) {
    var videoPath = path_1.default.join(__dirname, 'uploads', req.params.filename);
    var stat = fs_1.default.statSync(videoPath);
    var fileSize = stat.size;
    var range = req.headers.range;
    if (range) {
        var parts = range.replace(/bytes=/, "").split("-");
        var start = parseInt(parts[0], 10);
        var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        var chunksize = (end - start) + 1;
        var file = fs_1.default.createReadStream(videoPath, { start: start, end: end });
        var head = {
            'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(fileSize),
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else {
        var head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs_1.default.createReadStream(videoPath).pipe(res);
    }
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Destination folder
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`); // Use timestamp to avoid filename conflicts
//   }
// });
// const upload = multer({ storage: storage });
var upload = (0, multer_1.default)({ dest: "uploads/" });
app.post('/upload', upload.array("files"), function (req, res) {
    if (!req.file) {
        // No file uploaded
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log("VIDEO UPLOADED");
    res.json({ message: 'Video uploaded successfully' });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
