const express = require('express');
const bodyParser = require('body-parser');

const promotions = express.Router();

promotions.use(bodyParser.json());

promotions.route('/promotions/:id')
.all((req,res,next) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	next();
})
.get((req,res,next) => {
	res.end('Will send promotion number ' + req.params.id + ' to you')
})
.post((req,res,next) => {
	res.end(`POST operation is not supported on promotion ${req.params.id}`);
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end(`Will update promotion ${req.params.id}`)
})
.delete((req,res,next) => {
	res.end(`Will delete promotion ${req.params.id}`)
});

promotions.route('/promotions')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promos to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});


module.exports = promotions;