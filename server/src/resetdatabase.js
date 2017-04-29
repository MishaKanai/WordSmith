var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = 'wordsmith';
// Put the initial mock objects here.


var LoremIpsum = require('./LoremIpsum.js');
var loremipsum1 = LoremIpsum.loremipsum1;
var loremipsum2 = LoremIpsum.loremipsum2;

var initialData = {
    "users": {
        "1": {
            "_id": new ObjectID("000000000000000000000001"),
            "username": "klamar",
            "email": "klamar@gmail.com",
            "displayName": "Kendrick Lamar",
            "password" : "thisIsARandomHashWhatAreTheOdds!?",
            "settings" : {
                "theme" : "WordSmith",
                "font" : "Courier-New",
                "fontSize": 12
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
                "theme" : "Gold",
                "font" : "Comic Sans",
                "fontSize": 16
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
                "theme": "patriotic colors",
                "fontSize": 15
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

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
