var app = require("../../express");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPagesByWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem",
        "created": new Date("Dec 2016"), "modified": new Date("Dec 2016") }
];

function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;

    page._id = new Date().getTime()+"";
    page.websiteId = websiteId;
    page.created = new Date();
    page.modified = new Date();

    pages.push(page);

    res.json(page);
}

function findPagesByWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    var found = [];
    for (var p in pages) {
        var page = pages[p];
        if (page.websiteId === websiteId) {
            found.push(page);
        }
    }

    res.send(found);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];

    for (var p in pages) {
        var page = pages[p];
        if (page._id === pageId) {
            res.json(page);
            return;
        }
    }

    res.sendStatus(404);
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;

    page.modified = new Date();
    for (var p in pages) {
        var found = pages[p];
        if (found._id === pageId) {
            pages[p] = page;
            res.json(page);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];

    for (var p in pages) {
        var page = pages[p];
        if (page._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}