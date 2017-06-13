var app = require("../../express");
var websiteModel = require("../models/website/website.model.server");
var userModel = require("../models/user/user.model.server");
var mongoose = require("mongoose");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findWebsitesByUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") }
];

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;

    website._user = userId;

    websiteModel
        .createWebsite(website)
        .then(function(created) {
            website = created;
            return userModel.findUserById(website._user);
        })
        .then(function(user) {
            if (user === null) {
                websiteModel.deleteOne(website);
                res.sendStatus(404);
                return;
            }
            var websites = user.websites;
            websites.push(website);
            return userModel
                .updateUser(website._user, {websites: websites})
                .then(function(response) {
                    res.json(website);
                })
        });
}

function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];

    websiteModel
        .findWebsitesByUser(userId)
        .then(function(websites) {
            res.send(websites);
        })
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            if (website === null)
                res.sendStatus(404);
            else res.json(website);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;

    website.dateModified = new Date();

    websiteModel.updateWebsite(websiteId, website)
        .then(function(response) {
            if (response.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var userId;
    var website;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function(found) {
            website = found;
            userId = website._user;
            return websiteModel.deleteWebsite(websiteId);
        })
        .then(function(response) {
            if (response.deletedCount === 1)
                return userModel
                    .findUserById(userId)
                    .then(removeFromUser)
                    .then(function(response) {
                        res.sendStatus(200);
                    });
            else
                res.sendStatus(404);
        });

    function removeFromUser(user) {
        // If user is null, we don't need to worry about removing the website from it.
        if (user !== null) {
            var websites = user.websites;
            var ind = websites.indexOf(mongoose.Types.ObjectId(userId));
            websites.splice(ind, 1);
            return userModel
                .updateUser(userId, {websites: websites});
        }
    }
}