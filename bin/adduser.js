#!/usr/bin/env node

const inquirer = require("inquirer");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../config/db');

db();

const questions = [
    [
        {
            type: 'input',
            name: 'name',
            message: 'Enter name:'
        },
        {
            type: 'input',
            name: 'userId',
            message: 'User ID:',
            validate: (str) => /^\w+$/.test(str)
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:'
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            message: 'Confirm Password:'
        }
    ],
    [
        {
            type: 'list',
            name: 'group',
            message: 'Group',
            choices: [
                {
                    name: 'Faculty',
                    value: 'faculty'
                },
                {
                    name: 'Student',
                    value: 'student'
                },
                {
                    name: 'Staff',
                    value: 'staff'
                },
                {
                    name: 'Admin',
                    value: 'admin'
                }
            ],
            default: 1
        },
        {
            type: 'checkbox',
            name: 'permissions',
            message: 'Additional permissions:',
            choices: [
                {
                    name: 'Library admin',
                    value: 'library_admin'
                },
                {
                    name: 'Academic admin',
                    value: 'academic_admin'
                },
                {
                    name: 'Noticeboard',
                    value: 'noticeboard'
                },
                {
                    name: 'Wheel',
                    value: 'wheel'
                },
            ]
        }
    ]
];

user = {}

inquirer.prompt(questions[0])
    .then((answer) => {
        user.name = answer.name;
        user.userId = answer.userId;
        if (answer.password !== answer.passwordConfirm) {
            return Promise.reject("Passwords do not match");
        }
        return bcrypt.hash(answer.password, 13);
    }).then((hash) => {
        user.password = hash;
        return inquirer.prompt(questions[1]);
    }).then((answers) => {
        user.group = answers.group;
        user.permissions = answers.permissions;
        return (new User(user)).save();
    }).then(() => {
        console.log(user);
        console.log("Suggesfully added");
        process.nextTick(() => {
            process.exit(0);
        });
    }).catch((err) => {
        console.log(err);
        process.nextTick(() => {
            process.exit(1);
        });
    });