const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Members = require('../models/members');
const Users = require('../models/user');
const authenticate = require('../authenticate');
const memberRouter = express.Router();
const cors = require('./cors');
memberRouter.use(bodyParser.json());

memberRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Members.find(req.query)
    .populate('papers.paper')
    .populate('patents.patent')
    .populate('projects.project')
    .then((members) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(members);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Members.create(req.body)
    .then((member) => {
        console.log('Member Created ', member);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(member);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /members');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Members.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

memberRouter.route('/:memberId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Members.findById(req.params.memberId)
    .populate('papers.paper')
    .populate('patents.patent')
    .populate('projects.project')
    .then((member) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(member);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported on /members/'+ req.params.memberId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Members.findById(req.params.memberId)
        .then((member)=> {
            Users.findById(req.user._id)
                .then((user) => {
                    if(user.staffId == member.staffId) {
                        Members.findByIdAndUpdate(req.params.memberId,{$set: req.body},{new: true })
                        .then((member) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');            
                            res.json(member);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                    }
                    else if(user.staffId != member.staffId){
                        err = new Error("You are not allowed to modify others' details");
                        err.status = 401;
                        return next(err);
                    }
                }, (err) => next(err))
                .catch((err) => next(err));
        }, (err) => next(err))
        .catch(err => next(err));
    // if(req.user.staffId.equals(req.params.memberId)){
    //     Members.findByIdAndUpdate(req.params.memberId,{$set: req.body},{new: true })
    //     .then((member) => {
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json');            
    //         res.json(member);
    //     }, (err) => next(err))
    //     .catch((err) => next(err));
    // } else if(!req.user.staffId.equals(req.params.memberId)){
    //     err = new Error("You are not allowed to modify others' details");
    //         err.status = 401;
    //         return next(err);
    // }
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Members.findByIdAndRemove(req.params.memberId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = memberRouter;