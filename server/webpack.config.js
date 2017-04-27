var path = require('path');

module.exports = {
    "scripts": {
        "start": "node src/server.js --exec babel-node --presets es2015,stage-2,react"
    }
};
