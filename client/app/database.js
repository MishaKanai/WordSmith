import React from 'react';
import ReactDOM from 'react-dom';
//import { loremipsum1, loremipsum2 } from './js/LoremIpsum';
var loremipsum1 = '';
var loremipsum2 = '';
// Modify with your startup's name!
var startupName = "WordSmith";

// Put your mock objects here, as in Workshop 4
var initialData = {
    "users": {
        "1": {
            "_id": 1,
            "username": "klamar",
            "email": "klamar@gmail.com",
            "displayName": "Kendrick Lamar",
            "password" : "thisIsARandomHashWhatAreTheOdds!?",
            "settings" : {
                "theme" : "Dark",
                "font" : "Courier-New",
                "fontSize": 12
            },
            "collections": [1, 2],
            "documents": [4]
        },
        "2": {
            "_id": 2,
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
            "documents": []
        }
    },
    "collections": {
        "1": {
            "_id": 1,
            "name": "my raps",
            "documents": [1, 2]
        },
        "2": {
            "_id": 2,
            "name": "ballads",
            "documents": [3]
        }
    },
    "documents": {
        "1": {
            "_id": 1,
            "title": "work in progress",
            "text": loremipsum1,
            "timestamp": 1453668480000,
            "settings": {
                "theme": "patriotic colors",
                "fontSize": 15
            }
        },
        "2": {
            "_id": 2,
            "title": "When Doves Cry",
            "text": loremipsum2,
            "timestamp": 1453668480005
        },
        "3": {
            "_id": 3,
            "title": "song3",
            "text": "<p>This is wysiwyg text for song 3. Does the canvas adjust so we can see overflow? only YOU know!</p>",
            "timestamp": 1453668480066
        },
        "4": {
            "_id": 4,
            "title": "song4",
            "text": "<p>This is <i>wysiwyg</i> <u>text</u> for <b>song 4</b></p>",
            "timestamp": 1453668480060
        }

    }

};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

export function removeDocument(collectionName, rmDoc) {
    var collection = data[collectionName];
    var keys = Object.keys(collection);
    delete collection[keys.filter((key) => collection[key]._id === rmDoc._id)];
    data[collection] = collection;
    localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
