#!/usr/bin/env node

const readfunc = require("read");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../config/db');

db();

let read = function (opts) {
    return new Promise((resolve, reject) => {
        readfunc(opts, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
};

user = {}

read({ prompt: 'Name:'})
    .then((name) => {
        user.name = name;
        return read({ prompt: 'User ID:'});
    }).then((userId) => {
        user.userId = userId;
        return read({
            prompt: 'Password:',
            silent: true,
            replace: '*'
        });
    }).then((password) => {
        return bcrypt.hash(password, 13);
    }).then((hash) => {
        user.password = hash;
        return new User(user).save();
    }).then(() => {
        console.log("User added!");
        process.exit(0);
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });