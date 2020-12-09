const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../models/categories');
const authenticate = require('../authenticate');
const categoryRouter = express.Router();
const cors = require('./cors');
categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser, (req,res,next) => {
    Categories.find(req.query)
    .populate('members.member')
    .populate('projects.project')
    .populate('patents.patent')
    .populate('papers.paper')
    .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(categories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        console.log('Category Created ', category);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /categories');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Categories.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

categoryRouter.route('/:categoryId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Categories.findById(req.params.categoryId)
    .populate('members.member')
    .populate('projects.project')
    .populate('patents.patent')
    .populate('papers.paper')
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported on /categories/'+ req.params.categoryId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Categories.findByIdAndUpdate(req.params.categoryId, {
        $set: req.body
    }, { new: true })
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');            
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Categories.findByIdAndRemove(req.params.categoryId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = categoryRouter;