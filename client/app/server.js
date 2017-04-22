import {readDocument, writeDocument, addDocument, removeDocument } from './database.js';

var token = 'eyJpZCI6MX0=';

/** TAKEN FROM WORKSHOP 9
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that WordSmithError is a global.
  /* global WordSmithError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
        //success
      cb(xhr);
    } else {
      var responseText = xhr.responseText;
      WordSmithError('Could not ' + verb + " " + resource + ": Received " +
		            statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    WordSmithError('Could not ' + verb + " " + resource +
	              ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    WordSmithError('Could not ' + verb + " " + resource +
		          ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}


// SYNC functions
/*
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

function addCollectionSync(title, list) {
    var coll = {
        "name": title,
        "documents": list

    };
    coll = addDocument('collections', coll);
    return coll;
}
*/
// GET functions

export function getCollections(userId, cb) {
    /*var user = readDocument('users', userId);
    var collections = user.collections.map(
        (cid) => readDocument('collections', cid)
    );
    emulateServerReturn(collections, cb);*/
    //verb, route, body, callback
    sendXHR('GET', '/user/'+userId+'/collection', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    })
}

export function getUserDocuments(userId, cb) {
    var user = readDocument('users', userId);
    var documents = user.documents.map(
        (did) => readDocument('documents', did)
    );
    emulateServerReturn(documents, cb);
}

export function getMostRecentUserDocument(userId) {
    var user = readDocument('users', userId);
    var mostRecentdocument = user.documents[user.documents.lenth-1]
    emulateServerReturn(mostRecentdocument);
}

export function getCollectionDocuments(collectionId, cb) {
    var collection = readDocument('collections', collectionId);
    var documents = collection.documents.map(
        (did) => readDocument('documents', did)
    );
    emulateServerReturn(documents, cb);
}

export function getUserSettings(userId, cb) {
    var user = readDocument('users', userId);
    emulateServerReturn(user, cb);
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
    writeDocument('users', user);
    emulateServerReturn(doc, cb);
}


export function postDocumentToCollection(collId, title, text, timestamp, cb) {
    var doc = addDocumentSync(title, text, timestamp);
    var coll = readDocument('collections', collId);
    coll.documents.push(doc._id);
    writeDocument('collections', coll);
    emulateServerReturn(doc, cb);
}


export function postCollection(userId, collectionName,cb) {
 var collection = addCollectionSync(collectionName,[]);
 var user = readDocument('users', userId);
 user.collections.push(collection._id);
 writeDocument('users', user);
 emulateServerReturn(collection, cb);
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

export function putUserSettings(userId, settingsId, value, cb) {
    var user = readDocument('users', userId);
	if (settingsId === 'email' || settingsId === 'displayName' || settingsId === 'password') {
	    user[settingsId] = value;
	} else {
	    user.settings[settingsId] = value;
	}
    writeDocument('users', user);
    emulateServerReturn(user, cb);
}



/* DELETE */

export function deleteUserDocument(userId, docId, cb) {
    var user = readDocument('users', userId);
    user.documents = user.documents.filter(val => val!== docId);
    writeDocument('users', user);

    removeDocument('documents', readDocument('documents', docId));
    var remainingDocs = user.documents.map(
        (did) => readDocument('documents', did)
    );
    return emulateServerReturn(remainingDocs, cb);
}

export function deleteCollectionDocument(userId, collectionId, docId, cb) {
    //todo: authenticate user first
    var coll = readDocument('collections', collectionId);
    coll.documents = coll.documents.filter(val => val!== docId);
    writeDocument('collections', coll);

    removeDocument('documents', readDocument('documents', docId));
    var remainingDocs = coll.documents.map(
        (did) => readDocument('documents', did)
    );
    return emulateServerReturn(remainingDocs, cb);
}
