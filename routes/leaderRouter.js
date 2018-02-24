const express = require('express');
const bodyParser = require('body-parser');

const leaders = express.Router();

leaders.use(bodyParser.json());

leaders.route('/leaders/:id')
.all((req,res,next) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	next();
})
.get((req,res,next) => {
	res.end('Will send leader number ' + req.params.id + ' to you')
})
.post((req,res,next) => {
	res.end(`POST operation is not supported on leader ${req.params.id}`);
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end(`Will update leader ${req.params.id}`)
})
.delete((req,res,next) => {
	res.end(`Will delete leader ${req.params.id}`)
});

leaders.route('/leaders')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the leaderboard to you');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting leaderboard');
});


module.exports = leaders;