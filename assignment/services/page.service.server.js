var app = require("../../express");
var pageModel = require("../models/page/page.model.server");
var websiteModel = require("../models/website/website.model.server");
var mongoose = require("mongoose");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPagesByWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;

    page._website = websiteId;

    pageModel
        .createPage(page)
        .then(function(created) {
            page = created;
            return websiteModel.findWebsiteById(page._website);
        })
        .then(function(website) {
            if (website === null) {
                pageModel.deletePage(page._id);
                res.sendStatus(404);
                return;
            }
            var pages = website.pages;
            pages.push(page);
            websiteModel
                .updateWebsite(page._website, {pages: pages})
                .then(function(response) {
                    res.json(page);
                })
        });
}

function findPagesByWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    pageModel
        .findPagesByWebsite(websiteId)
        .then(function(pages) {
            res.send(pages);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function(page) {
            if (page === null)
                res.sendStatus(404);
            else res.json(page);
        });
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;

    page.dateModified = new Date();

    pageModel.updatePage(pageId, page)
        .then(function(response) {
            if (response.n === 1)
                res.sendStatus(200);
            else
                res.sendStatus(404);
        });
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var websiteId;
    var page;

    pageModel
        .findPageById(pageId)
        .then(function(found) {
            page = found;
            websiteId = page._website;
            return pageModel.deletePage(pageId);
        })
        .then(function(response) {
            if (response.result.n === 1)
                websiteModel
                    .findWebsiteById(websiteId)
                    .then(removeFromWebsite)
                    .then(function(response) {
                        res.sendStatus(200);
                    });
            else
                res.sendStatus(404);
        });

    function removeFromWebsite(website) {
        // If website is null, we don't need to worry about removing the page from it.
        if (website !== null) {
            var pages = website.pages;
            var ind = pages.indexOf(mongoose.Types.ObjectId(pageId));
            pages.splice(ind, 1);
            return websiteModel
                .updateWebsite(websiteId, {pages: pages});
        }
    }
}