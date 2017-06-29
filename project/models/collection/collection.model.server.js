var db = require('../db');
var collectionSchema = require('./collection.schema.server');

var collectionModel = db.model('CollectionModel', collectionSchema);

module.exports = collectionModel;

collectionModel.createCollection = createCollection;
collectionModel.deleteCollection = deleteCollection;
collectionModel.addToCollection = addToCollection;
collectionModel.findCollectionsByUser = findCollectionsByUser;
collectionModel.getCollection = getCollection;
collectionModel.removeFromCollection = removeFromCollection;

function createCollection(user, name) {
    return collectionModel.create({user: user._id, name: name});
}

function deleteCollection(collectionId, user) {
    return collectionModel.findOneAndRemove({_id: collectionId, user: user._id})
}

function addToCollection(collectionId, type, id, user) {
    return collectionModel.updateOne({_id: collectionId, user: user._id}, {$addToSet: {[type+'s']: id}});
}

function findCollectionsByUser(userId) {
    return collectionModel.find({user: userId})
        .populate('user')
        .exec();
}

function getCollection(collectionId) {
    return collectionModel.findOne({_id: collectionId})
        .populate('user')
        .exec();
}

function removeFromCollection(collectionId, type, id, user) {
    return collectionModel.updateOne({_id: collectionId, user: user._id}, {$pull: {[type+'s']: id}});
}