// pre-define some behavior
RegExp.prototype.toJSON = RegExp.prototype.toString;

//imports
const mongoose = require('mongoose');
const Collection = require('./Collection.js')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'people';
const collectionName = 'table'

// yoyo
const callApi = (method, callback = ()=>{} , ...args) =>
	mongoose.connect(`${url}/${dbName}`,
		(err, db) => {
			const collection = new Collection(db, collectionName)
			collection[method](
				...args, 
				(result) => {
					callback(result)
					db.close() 
				}
			)
		}
	)

module.exports = {
	find: (query, callback) => callApi("find", callback, query),
	add: (data, callback) => callApi("insert", callback, data),
	update: (query, newValue, callback) => callApi("update", callback, query, newValue),
	delete: (query, callback) => callApi("delete", callback, query),
	drop: (callback) => callApi("drop", callback)
}


// err, open handling
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, "\x1b[41m", 'connection error:', "\x1b[40m"));
connection.once('open', function() {
	console.log("\x1b[42m", 'Get connected', "\x1b[40m")
});
