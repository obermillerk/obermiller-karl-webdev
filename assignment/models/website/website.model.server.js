var db = require('../db');
var websiteSchema = require('./website.schema.server');

var websiteModel = db.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsite(website) {
    return websiteModel.create(website);
}

function findWebsitesByUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.updateOne({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}