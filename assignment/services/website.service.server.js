var app = require("../../express");

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

    website._id = new Date().getTime()+"";
    website.developerId = userId;
    website.created = new Date();
    website.modified = new Date();

    websites.push(website);
    res.json(website);
}

function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];

    var found = [];
    for (var w in websites) {
        var website = websites[w];
        if (website.developerId === userId) {
            found.push(website);
        }
    }

    res.send(found);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    for (var w in websites) {
        var website = websites[w];
        if (website._id === websiteId) {
            res.json(website);
            return;
        }
    }

    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;

    website.modified = new Date();
    for (var w in websites) {
        var found = websites[w];
        if (found._id === websiteId) {
            websites[w] = website;
            res.json(website);
            return;
        }
    }

    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    for (var w in websites) {
        var website = websites[w];
        if (website._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
}