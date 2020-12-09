const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Patents = require('../models/patents');
const authenticate = require('../authenticate');
const patentRouter = express.Router();
const cors = require('./cors');
patentRouter.use(bodyParser.json());

patentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Patents.find(req.query)
    .populate('authors.member')
    .then((patents) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(patents);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Patents.create(req.body)
    .then((patent) => {
        console.log('Patent Created ', patent);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(patent);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /patents');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Patents.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

patentRouter.route('/:patentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Patents.findById(req.params.patentId)
    .populate('authors.member')
    .then((patent) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(patent);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported on /patents/'+ req.params.patentId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Patents.findByIdAndUpdate(req.params.patentId, {
        $set: req.body
    }, { new: true })
    .then((patent) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');            
        res.json(patent);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Patents.findByIdAndRemove(req.params.patentId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = patentRouter;