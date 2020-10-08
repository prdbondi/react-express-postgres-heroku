const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const authenticateHandler = require('../models/handlers/authenticate');

const router = express.Router();

router.get('/api/login', async (req, res) => {
    const paramSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca'] } }).max(320).required(),
        password: Joi.string().min(3).max(40).required()
    });

    const paramEmail = req.query.email ? req.query.email : null;
    const paramPassword = req.query.password ? req.query.password : null;

    const {error, value} = paramSchema.validate({email: paramEmail, password: paramPassword});

    if(!_.isNil(error)) res.send(error);

    const response = await authenticateHandler.isUserCredentialsValid(paramEmail, paramPassword);
    // Should we return an Access token here or leave that as next sprint? => not in scope, will create another ticket in next sprint.
    res.send(response);
});

module.exports = router