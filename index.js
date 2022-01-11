let http = require('http');
let url = require('url');
require('dotenv').config();

let routes = {
    "GET": {
        "/": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>Get Method => / route</h1>");
        },
        "/home": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Get Method => /home route with param of ${params.query.name} and ${params.query.age}</h1>`);
        }
    },
    "POST": {
        "/": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>Post Method => / route</h1>");
        },
        "/about": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>Post Method => /about route</h1>");
        }
    },
    "NA": (req, res, params) => {
        res.writeHead(404);
        res.end("<h1>Page Not Found.</h1>");
    }
};

let start = (req, res) => {
    let reqMethod = req.method;
    let params = url.parse(req.url, true);
    let resolveRoute = routes[reqMethod][params.pathname];
    if (resolveRoute != undefined) {
        resolveRoute(req, res, params);
    } else {
        routes["NA"](req, res, params);
    }
};
let server = http.createServer(start);

server.listen(process.env.PORT, function () {
    console.log(`Server is running on port ${process.env.PORT}...`);
});