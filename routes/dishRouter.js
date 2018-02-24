const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes')

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/dishes')
.get((req, res, next) => {
	Dishes.find({})
	.then((dishes) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dishes);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next) => {
	Dishes.create(req.body)
	.then((dish) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next) => {
	res.end('PUT operation not supported on /dishes')
})
.delete((req, res, next) => {
	Dishes.remove({})
	.then((resp) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err))
})

dishRouter.route('/dishes/:dishId')
.get((req, res, next) => {
	Dishes.findById(req.params.dishId)
	.then((dish) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err))
})
.post((req, res, next) => {
	res.setStatusCode = 403;
	res.end('POST operation not supported in /dishes/' + req.params.name);
})
.put((req, res, next) => {
	Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
	.then((dish) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req, res, next) => {
	Dishes.findByIdAndRemove(req.params.dishId)
	.then((resp) => {
		res.setStatusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = dishRouter;