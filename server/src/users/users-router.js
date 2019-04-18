'use strict';
const express = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users-service');

usersRouter
  .post('/', jsonBodyParser, (req, res) => {
    const {password} = req.body;
    for (const field of ['full_name','user_name','password']){
      if (!req.body[field]){
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
      }
    }

    const passwordError = UsersService.validatePassword(password);
    if(passwordError)
      return res.status(400).json({
        error: passwordError
      })
    
    res.send('ok');
  });

module.exports = usersRouter;