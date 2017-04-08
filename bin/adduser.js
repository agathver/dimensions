#!/usr/bin/env node

/* eslint no-console: 0 */
const inquirer = require('inquirer');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../config/db');
const isEmail = require('isemail').validate;

const questions = [
  [{
    type: 'input',
    name: 'name',
    message: 'Name:',
  },
  {
    type: 'input',
    name: 'userId',
    message: 'User ID:',
    validate: (str) => /^\w+$/.test(str)
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email:',
    validate: (str) => isEmail(str)
  },
  {
    type: 'input',
    name: 'phoneNumber',
    message: 'Phone no:',
    validate: (str) => /(\+91)?\d+/.test(str)
  },
  {
    type: 'list',
    name: 'group',
    message: 'Group',
    choices: [{
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
    choices: [{
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
  ],
  [{
    type: 'password',
    name: 'password',
    message: 'Password:'
  },
  {
    type: 'password',
    name: 'passwordConfirm',
    message: 'Confirm Password:'
  }
  ]
];

let readPassword = function () {
  return inquirer.prompt(questions[1])
    .then((answer) => {
      if (answer.password !== answer.passwordConfirm) {
        console.error('Passwords do not match');
        return readPassword();
      }
      return bcrypt.hash(answer.password, 13);
    });
};

let user = {};
db().then(() => {
  return inquirer.prompt(questions[0]);
}).then((answer) => {
  let names = answer.name.trim().replace(/\s+/, ' ').split(' ', 2);
  user.firstName = names[0];
  user.lastName = names[1];
  user.userId = answer.userId;
  user.email = answer.email;
  user.phoneNumber = answer.phoneNumber;
  user.group = answer.group;
  user.permissions = answer.permissions;
  return readPassword();
}).then((hash) => {
  user.password = hash;
  return (new User(user)).save();
}).then(() => {
  console.log('Succesfully added');
  process.nextTick(() => {
    process.exit(0);
  });
}).catch((err) => {
  console.log(err);
  process.nextTick(() => {
    process.exit(1);
  });
});
