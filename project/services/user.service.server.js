var app = require('../../express').projectRouter;
var userModel = require('../models/user/user.model.server');
var commentModel = require('../models/comment/comment.model.server');
var postModel = require('../models/post/post.model.server');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../../passport').project;
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
};

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use('project-local', new LocalStrategy(localStrategy));
passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));


app.post('/rest/login', passport.authenticate('project-local'), login);
app.post('/rest/logout', logout);
app.post('/rest/register', register);
app.post('/rest/unregister', unregister);
app.post('/rest/user', createUser);
app.post('/rest/follow', followUser);
app.post('/rest/unfollow', unfollowUser);

app.put('/rest/user', updateUser);
app.put('/rest/library/:type/:id', addToLibrary);
app.put('/rest/favorites/:artistid', addToFavorites);
app.put('/rest/password', updateUserPassword);

app.delete('/rest/library/:type/:id', removeFromLibrary);
app.delete('/rest/favorites/:artistid', removeFromFavorites);

app.get('/rest/admin', isAdmin);
app.get('/rest/user', getAllUsers);
app.get('/rest/user/:username', findUserByUsername);
app.get('/rest/loggedin', loggedin);
app.get('/rest/follow/:username', isCurrentUserFollowing);
app.get('/rest/self/:username', isUserSelf);
app.get('/rest/library/:type/:id', isInLibrary);
app.get('/rest/favorites/:artistid', isInFavorites);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] } ));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/',
        failureRedirect: '/project/#!/login'
    }));




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
        .findUserWithCredentials(username)
        .then(function(user) {
                if (user !== null && user.username === username && bcrypt.compareSync(password, user.password)) {
                    user.password = undefined;
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


function googleStrategy(token, refreshToken, profile, done) {
    userModel.findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  'g_' + emailParts[0],
                        name: {
                            first: profile.name.givenName,
                            last:  profile.name.familyName
                        },
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}



/* API DEFINITION */


function isAdmin(req, res) {
    var user = req.user;

    if (user && user.role === 'ADMIN')
        res.sendStatus(200);
    else
        res.sendStatus(401);
}

function login(req, res) {
    var user = req.body;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
        .then(function(response) {
            res.send(response);
        }, function(err) {
            res.send(err);
        })
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    if (user.username === 'admin')
        user.role = 'ADMIN';
    else
        user.role = 'USER';
    userModel.createUser(user)
        .then(function(user) {
            if (user)
                req.login(user, function(err) {
                    if(err)
                        res.sendStatus(400);
                    else
                        res.json(user);
                });
            else
                res.sendStatus(400);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function unregister(req, res) {
    var user = req.body;
    var loggedin = req.user;

    if (loggedin && loggedin.role !== 'ADMIN' && user._id !== String(loggedin._id)) {
        res.sendStatus(401);
        return;
    }

    userModel.unregister(user._id)
        .then(function(response) {
            commentModel.deleteCommentsByUserId(user._id)
                .then(function (response) {}, function(err) {
                    console.error(err);
                });
            postModel.deletePostsByUserId(user._id)
                .then(function (response) {}, function(err) {
                    console.error(err);
                });
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(404);
        });

}

function getAllUsers(req, res) {
    var user = req.user;

    if (!user || user.role !== 'ADMIN') {
        res.sendStatus(401);
        return;
    }

    userModel.getAllUsers()
        .then(function(users) {
            res.json(users);
        })
}

function findUserByUsername(req, res) {
    var username = req.params['username'];

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null)
                res.sendStatus(404);
            else
                res.json(user);
        })
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function isUserSelf(req, res) {
    var username = req.params['username'];
    var self = req.user;

    if (typeof self === 'undefined') {
        res.json(false);
        return;
    }

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null) {
                res.status(404).end('Could not find user');
            } else {
                var ans = String(self._id) === String(user._id);
                res.json(ans);
            }
        });
}

function updateUser(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.status(401).send('Not logged in');
        return;
    }

    var user = req.body;

    if (loggedin.role !== 'ADMIN' && String(loggedin._id) !== user._id) {
        res.sendStatus(401);
        return;
    }

    userModel.updateUser(user._id, user)
        .then(function(response) {
            res.sendStatus(200);
        });
}

function updateUserPassword(req, res) {
    var loggedin = req.user;

    if (typeof loggedin === 'undefined') {
        res.status(401).send('Not logged in');
        return;
    }

    var passwords = req.body;

    if (loggedin.role !== 'ADMIN' && String(loggedin._id) !== passwords._id) {
        res.sendStatus(401);
        return;
    }

    if (loggedin.role === 'ADMIN')
        userModel.updateUser(passwords._id, {password: bcrypt.hashSync(passwords.new)})
            .then(function (response) {
                res.sendStatus(200);
            });
    else
        userModel.findUserWithCredentials(loggedin.username)
            .then(function(user) {
                if (bcrypt.compareSync(passwords.current, user.password)) {
                    userModel.updateUser(passwords._id, {password: bcrypt.hashSync(passwords.new)})
                        .then(function (response) {
                            res.sendStatus(200);
                        });
                } else {
                    res.status(401).send('Invalid current password');
                }
            });
}

/* FOLLOW */

function isCurrentUserFollowing(req, res) {
    var username = req.params['username'];
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.json(false);
        return;
    }

    userModel.findUserByUsername(username)
        .then(function(user) {
            if (user === null) {
                res.status(404).end('Could not find user');
            } else {
                return userModel.isUserFollowing(follower, user);
            }
        })
        .then(function(response) {
            res.json(response);
        })
}

function followUser(req, res) {
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var user = req.body;

    if (follower._id === user._id) {
        res.sendStatus(400);
        return;
    }

    userModel.followUser(follower._id, user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}

function unfollowUser(req, res) {
    var follower = req.user;

    if (typeof follower === 'undefined') {
        res.send('Not logged in');
        return;
    }

    var user = req.body;

    userModel.unfollowUser(follower._id, user._id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        })
}

/* LIBRARY */

function isInLibrary(req, res) {
    var user = req.user;

    var id = req.params['id'];
    var type = req.params['type'];

    if (type !== 'track' && type !== 'album') {
        res.sendStatus(400);
        return;
    }

    if (typeof user === 'undefined') {
        res.json(false);
        return;
    }

    userModel.isInLibrary(user, type, id)
        .then(function(response) {
            res.send(response);
        });
}

function addToLibrary(req, res) {
    var user = req.user;

    var id = req.params['id'];
    var type = req.params['type'];

    if (type !== 'track' && type !== 'album') {
        res.sendStatus(400);
        return;
    }

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    userModel.addToLibrary(user, type, id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function removeFromLibrary(req, res) {
    var user = req.user;

    var id = req.params['id'];
    var type = req.params['type'];

    if (type !== 'track' && type !== 'album') {
        res.sendStatus(400);
        return;
    }

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    userModel.removeFromLibrary(user, type, id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

/* FAVORITE */

function isInFavorites(req, res) {
    var user = req.user;

    var id = req.params['artistid'];

    if (typeof user === 'undefined') {
        res.json(false);
        return;
    }

    userModel.isInFavorites(user, id)
        .then(function(response) {
            res.send(response);
        });
}

function addToFavorites(req, res) {
    var user = req.user;

    var id = req.params['artistid'];

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    userModel.addToFavorites(user, id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}

function removeFromFavorites(req, res) {
    var user = req.user;

    var id = req.params['artistid'];

    if (typeof user === 'undefined') {
        res.send('Not logged in');
        return;
    }

    userModel.removeFromFavorites(user, id)
        .then(function(response) {
            res.sendStatus(200);
        }, function(err) {
            console.error(err);
            res.sendStatus(400);
        });
}