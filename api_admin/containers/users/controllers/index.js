﻿const express = require('express');
const router = express.Router();
const services = require('../services');
const config = require('../../../helpers/config');

router.post('/authenticate', authenticate);
router.post('/loginWallet', loginWallet);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.post('/getByToken',getByToken);
router.post('/update', update);
router.delete('/:id', _delete);
router.post('/socialLogin', socialLogin);

module.exports = router;

function authenticate(req, res, next) {
    services.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function loginWallet(req, res, next) {
    services.loginWallet(req, res)
        .then(respondedVal => {
                respondedVal?res.redirect(302, config.clientHost):res.redirect(302, config.loginWalletHost);
            }
        )
        .catch(err => next(err));
}

function register(req, res, next) {
    services.register(req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    services.getAll()
        .then(result => {
            if(result) res.json(result);
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    services.getById(req.user.sub)
        .then(result => {
            if(result) res.json(result);
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}

function getById(req, res, next) {
    services.getById(req.params.id)
        .then(result => {
            if(result) res.json(result);
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}

function getByToken(req,res,next){
    services.getByToken(req.body)
        .then(result => {
            if(result) res.json(result);
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}

function update(req, res, next) {
    services.update(req.body)
        .then(result => {
            if(result) {
                res.json(result);
            }
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    services.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function socialLogin(req, res) {
    services.socialLogin(req.body)
        .then(result => {
            if(result) res.json(result);
            else {
                console.log('Object Return Failed: (',result,')');
                res.sendStatus(500);
            }
        })
        .catch(err => next(err));
}