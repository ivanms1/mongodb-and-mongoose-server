const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promos = require('../models/promos')

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/promotions')
.get((req, res, next) => {
	Promos.find({})
	.then((promos) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promos);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req, res, next) => {
    Promos.create(req.body)
    .then((promo) => {
    	res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promo);
    }, (err) => next(err))
	.catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promos.remove({})
    .then((resp) => {
    	res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
    }, (err) => next(err))
	.catch((err) => next(err))
});

promoRouter.route('/promotions/:promoId')
.get((req,res,next) => {
	Promos.findById(req.params.promoId)
	.then((promo) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promo);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post((req,res,next) => {
	res.end('POST operation is not supported in /promotions/' + req.params.promoId);
})
.put((req,res,next) => {
	Promos.findByIdAndUpdate(req.params.promoId, { $set: req.body }, { new: true })
	.then((promo) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(promo);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete((req,res,next) => {
	Promos.findByIdAndRemove(req.params.promoId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = promoRouter;