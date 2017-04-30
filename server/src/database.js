var ObjectID = require('mongodb').ObjectID;

var LoremIpsum = require('./LoremIpsum.js');
var loremipsum1 = LoremIpsum.loremipsum1;
var loremipsum2 = LoremIpsum.loremipsum2;

// Your startup's initial mock objects go here
var initialData = {
    "users": {
        "1": {
            "_id": new ObjectID("000000000000000000000001"),
            "username": "klamar",
            "email": "klamar@gmail.com",
            "displayName": "Kendrick Lamar",
            "password" : "thisIsARandomHashWhatAreTheOdds!?",
            "settings" : {
                "theme" : "WordSmith"
            },
            "collections": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")],
            "documents": [new ObjectID("000000000000000000000004")]
        },
        "2": {
            "_id": new ObjectID("000000000000000000000002"),
            "username": "fiddy",
            "email": "50@gmail.com",
            "displayName": "Fiddy Cent",
            "password" : "thisIsAlsoRandomHashThisIsIncredible(:)",
            "settings" : {
                "theme" : "Gold"
            },
            "collections": [],
            "documents": [new ObjectID("000000000000000000000005")]
        }
    },
    "collections": {
        "1": {
            "_id": new ObjectID("000000000000000000000001"),
            "name": "my raps",
            "documents": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"),]
        },
        "2": {
            "_id": new ObjectID("000000000000000000000002"),
            "name": "ballads",
            "documents": [new ObjectID("000000000000000000000003")]
        }
    },
    "documents": {
        "1": {
            "_id": new ObjectID("000000000000000000000001"),
            "title": "work in progress",
            "text": loremipsum1,
            "timestamp": 1453668480000,
            "settings": {
                "theme": "patriotic colors"
            }
        },
        "2": {
            "_id": new ObjectID("000000000000000000000002"),
            "title": "When Doves Cry",
            "text": loremipsum2,
            "timestamp": 1453668480005
        },
        "3": {
            "_id": new ObjectID("000000000000000000000003"),
            "title": "song3",
            "text": "<p>This is wysiwyg text for song 3. Does the canvas adjust so we can see overflow? only YOU know!</p>",
            "timestamp": 1453668480066
        },
        "4": {
            "_id": new ObjectID("000000000000000000000001"),
            "title": "song4",
            "text": "<p>This is <i>wysiwyg</i> <u>text</u> for <b>song 4</b></p>",
            "timestamp": 1453668480060
        },
        "5": {
            "_id": new ObjectID("000000000000000000000005"),
            "title": "song5",
            "text": "<p>This is <i>wysiwyg</i> <u>text</u> for <b>song 5</b></p>",
            "timestamp": 1453668480066
        }

    }

};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
