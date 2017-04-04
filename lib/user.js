const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    login: function (username, password) {
        return User.findOne({
            userId: username
        }).then((user) => {
            if (user !== null) {
                bcrypt.compare(password, user.password).then((result) => {
                    if (result) {
                        return Promise.resolve(user);
                    } else {
                        return Promise.reject("Invalid username or password");
                    }
                });
            } else {
                return Promise.reject("Invalid username or password");
            }
        });
    }
}