var database = require('./database.js')

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;
var getCollection = database.getCollection;
var resetDatabase = database.resetDatabase;

var UserSettingsSchema = require('../schemas/UserSettings.json');
var DocumentSchema = require('../schemas/Document.json');

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());


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

function getUserObjFromAuth(authHeader) {
    try {
        //cut off "bearer " from header
        var token = authHeader.slice(7);
        //convert from base64 to UTF-8
        var plainString = new Buffer(token, 'base64').toString('utf8');
        var tokenObj = JSON.parse(plainString);
        return tokenObj;
    } catch(e) {
        return {} //empty object. error will be caught when object is parsed.
    }
}

function getUserIdFromAuth(authHeader) {
    var userObj = getUserObjFromAuth(authHeader);
    if (userObj.hasOwnProperty('id') && typeof userObj['id'] === 'number') {
        //all good
        return userObj['id'];
    } else {
        //signal error
        return -1;
    }
}

//stolen from workshop 9
// Reset database.
app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    // This is a debug route, so don't do any validation.
    database.resetDatabase();
    // res.send() sends an empty response with status code 200
    res.send();
});

app.get('/user/:userid/collections', function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var collectionOwner = parseInt(req.params.userid, 10);

    if (sender === collectionOwner) {
        var user = readDocument('users', collectionOwner);
        var collections = user.collections.map(
            (cid) => readDocument('collections', cid)
        );
        res.send(collections);
    } else {
        //unauthorized
        res.status(401).end();
    }
});

app.get('/user/:userid/documents', function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var documentOwner = parseInt(req.params.userid, 10);

    if (sender === documentOwner) {
        var user = readDocument('users', documentOwner);
        var documents = user.documents.map(
            (did) => readDocument('documents', did)
        );
        res.send(documents);
    } else {
        //unauthorized
        res.status(401).end();
    }
});

app.get('/collection/:collectionid/documents', function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var collectionid = parseInt(req.params.collectionid, 10);
    var user = readDocument('users', sender);
    if (user.collections.indexOf(collectionid) === -1) {
        res.status(401).end();
    }
    else {
            var collection = readDocument('collections', collectionid);
            var documents = collection.documents.map(
                (did) => readDocument('documents', did)
            );
            res.send(documents);
    }
});

app.get('/document/:docid', function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var allDocs = [];
    //resolve all documents owned by user
    var user = readDocument('users', sender);
    allDocs = allDocs.concat(user.documents);
    var collDocs = user.collections.map(
        (cid) => readDocument('collections', cid).documents
    );
    collDocs.forEach((docs) => allDocs = allDocs.concat(docs));

    var docid = parseInt(req.params.docid, 10);
    if (allDocs.indexOf(docid) !== -1) {
        var doc = readDocument('documents', docid);
        res.send(doc);
    } else {
        //figure out which error code to throw
        var documents = getCollection('documents');
        for (var dockey in documents) {
            if (documents[dockey]._id === docid) {
                //resource exists: unauthorized.
                res.status(401).end();
                return;
            }
        }
        //not found
        res.status(404).end();
    }
});

app.get('/user/:userid', function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var userId = parseInt(req.params.userid, 10);

    if (sender === userId) {
        var user = readDocument('users', userId);
        res.send(user);
    } else {
        //unauthorized
        res.status(401).end();
    }
});

app.put('/user/:userid', validate({ body: UserSettingsSchema }), function(req, res) {
    var sender = getUserIdFromAuth(req.get('Authorization'));
    var userId = parseInt(req.params.userid, 10);
    var body = req.body;

    if (sender === userId) {
        var user = readDocument('users', userId);
	    if (body.settingsId === 'email' || body.settingsId === 'displayName' || body.settingsId === 'password') {
	        user[body.settingsId] = body.value;
	    } else {
	        user.settings[body.settingsId] = body.value;
	    }
        writeDocument('users', user);
        res.send(user);
    } else {
        //unauthorized
        res.status(401).end();
    }
});

//validation coming soon!
app.put('/documents/:docId', validate({ body: DocumentSchema}), function(req, res) {
  //var sender = getUserIdFromAuth(req.get('Authorization'));
  var docId = parseInt(req.params.docId, 10);
  var body = req.body;

  var doc = readDocument('documents', docId);
  doc.title = body.title;
  doc.text = body.text;
  doc.timestamp = body.timestamp;
  writeDocument('documents', doc);
  res.send(doc);
})

app.use(express.static('../client/build'));

/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
        // Set a bad request http response status
        res.status(400).end();
    } else {
        // It's some other sort of error; pass it to next error middleware handler
        next(err);
    }
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
