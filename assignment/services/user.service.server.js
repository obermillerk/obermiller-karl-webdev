var app = require('../../express').assignmentRouter;
var userModel = require('../models/user/user.model.server');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../../passport').assignment;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use('assignment-local', new LocalStrategy(localStrategy));


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function(user) {
                if (user !== null && user.username === username
                    && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err)
                    return done(err);
            });
}



var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
    enableProof: true
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

/* API DEFINITION */

app.post('/api/user', createUser);
app.post('/api/login', passport.authenticate('assignment-local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.put('/api/user/:userId', updateUser);
app.get('/api/user/:userId', findUserById);
app.get('/api/user', findUserByCredentials);
app.get('/api/loggedin', loggedin);
app.get('/auth/facebook', passport.authenticate('facebook',
    { authType: 'rerequest', scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/assignment/#!/profile',
    failureRedirect: '/assignment/#!/login'
}));
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.delete('/api/unregister', unregister);


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel.createUser(user)
        .then(function(user) {
            if (user) {
                req.login(user, function(err) {
                    if(err)
                        res.sendStatus(400);
                    else
                        res.json(user);
                })
            } else {
                res.sendStatus(400);
            }
        });

}


function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id)
        .then(function(user) {
            if (user === null) {
                var username = 'facebook' + profile.id;
                userModel.createUser({
                    'username': username,
                    'facebook.id': profile  .id,
                    'facebook.token': token,
                    'firstName': profile.name.givenName,
                    'lastName': profile.name.familyName,
                    'email': profile.emails[0].value})
                    .then(function(user) {
                        done(null, user);
                    });
            } else {
                done(null, user);
            }
        });
}


function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function(user) {
            res.status(201);
            res.json(user);
        }, function() {
            res.sendStatus(409);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var password = req.query['password'];

    if (typeof password === 'undefined')
        return findUserByUsername(req, res);

    var username = req.query['username'];

    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user)
        });
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;

    userModel
        .updateUser(userId, user)
        .then(function(response) {
            if (response.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .unregister(userId)
        .then(function(response) {
            if (response.result.n === 1) {
                req.logout();
                res.sendStatus(200);
            }
            else
                res.sendStatus(404);
        });
}

function unregister(req, res) {
    if (req.isAuthenticated())
        userModel
            .deleteUser(req.user._id)
            .then(function(status) {
                req.logout();
                res.sendStatus(200);
            });
    else res.sendStatus(400);
}

/* MIDDLEWARE */

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}
