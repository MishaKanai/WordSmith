import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

// SYNC functions

function removePasswordSync(userObj) {
    if (userObj.hasOwnProperty('password')) {
        delete userObj['password'];
    }
    return userObj;
}

function getUsersResolvedRefsSync(userId) {
    var user = readDocument('users', userId);
    user.collections =
        user.collections.map(
            (cid) => {
                var collection = readDocument('collections', cid);
                collection.documents =
                    collection.documents.map(
                        (did) => readDocument('documents', did)
                    );
                return collection;
            }
        );
    user.documents =
        user.documents.map(
            (did) => readDocument('documents', did)
        );
    return removePasswordSync(user);
}

function addDocumentSync(title, text, timestamp) {
    var doc = {
        "title": title,
        "text": text,
        "timestamp": timestamp
    };
    doc = addDocument('documents', doc);
    return doc;
}

// GET functions

export function getCollections(userId, cb) {
    var user = readDocument('users', userId);
    var collections = user.collections.map(
        (cid) => readDocument('collections', cid)
    );
    emulateServerReturn(collections, cb);
}

export function getUserDocuments(userId, cb) {
    var user = readDocument('users', userId);
    var documents = user.documents.map(
        (did) => readDocument('documents', did)
    );
    emulateServerReturn(documents, cb);
}

export function getCollectionDocuments(collectionId, cb) {
    var collection = readDocument('collections', collectionId);
    var documents = collection.documents.map(
        (did) => readDocument('documents', did)
    );
    emulateServerReturn(documents, cb);
}

export function getUserSettings(userId) {
    var user = readDocument('users', userId);
    emulateServerReturn(user.settings);
}

//falls back to user settings if document settings not set
export function getDocumentSettings(userId, docId, cb) {
    var doc = readDocument('documents', docId);
    var settings;
    if (doc.hasOwnProperty('settings'))
        settings = doc.settings;
    else
        settings = readDocument('users', userId).settings;
    emulateServerReturn(settings, cb);
}

export function getDocument(docId, cb) {
    emulateServerReturn(readDocument('documents', docId), cb);
}

// POST functions
export function postUser(username, email, displayName, password, cb) {
    var newUser = {
        "username": username,
        "email": email,
        "displayName": displayName,
        "password": password,
        "settings": {
            //default settings
            "theme": "light",
            "fontSize": 12
        },
        "collections": [],
        "documents": []
    };
    newUser = removePasswordSync(addDocument('users', newUser));
    emulateServerReturn(newUser, cb);
}

export function postDocumentToUser(userId, title, text, timestamp, cb) {
    var doc = addDocumentSync(title, text, timestamp);
    var user = readDocument('users', userId);
    user.documents.push(doc._id);
    console.log(user);
    writeDocument('users', user)
    emulateServerReturn(doc, cb);
}

export function postDocumentToCollection(collectionId, title, text, timestamp, cb) {
    var doc = addDocumentSync(title, text, timestamp);
    var collection = readDocument('collections', collectionId);
    collection.documents.push(doc._id);
    writeDocument('collections', collection)
    emulateServerReturn(doc, cb);
}

//PUT functions

export function putDocument(docId, title, text, timestamp, cb) {
    var document = readDocument('documents', docId);
    document.title = title;
    document.text = text;
    document.timestamp = timestamp;
    writeDocument('documents', document)
    emulateServerReturn(document, cb);
}

export function putSettings(userId, settingsId, value, cb) {
    console.log(userId);
    var user = readDocument('users', userId);
    if (settingsId === 'email' || settingsId === 'displayName' || settingsId === 'password') {
	user.settingsId = value;
    } else {
	user.settings.settingsId = value;
    }
    writeDocument('users', user);
    emulateServerReturn(user, cb);
}
