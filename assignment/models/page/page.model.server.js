var db = require('../db');
var pageSchema = require('./page.schema.server');

var pageModel = db.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPagesByWebsite = findPagesByWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(page) {
    return pageModel.create(page);
}

function findPagesByWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.updateOne({_id: pageId}, page);
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}