const defaultCallback = () => {}

const logColors = {
	find: "\x1b[36m",
	insert: "\x1b[32m",
	update: "\x1b[33m",
	delete: "\x1b[31m",
	drop: "\x1b[41m"
}

class Collection {
	constructor(db, name) {
		this.name = name
		this.collection = db.collection(name)
	}

	find(query = {}, callback = defaultCallback) {
		this.collection.find(query)
		.toArray( (err, result) => {
			console.log(logColors.find, `Find result for query ${JSON.stringify(query)}`)
			callback(result)
		})
	}

	insert(data, callback = defaultCallback) {
		if( Array.isArray(data) ) {
			this.collection.insertMany(data)
			.then( result => {
				console.log(logColors.insert, `Inserted ${data.length} ${this.name}`)
				callback(result)
			})
		} else {
			this.collection.insertOne(data)
			.then( result => {
				console.log(logColors.insert, `Inserted 1 ${this.name}`)
				callback(result)
			})
		}
	}

	update(query, newValue, callback = defaultCallback) {
		this.collection.updateMany(query, {$set: newValue})
		.then( result => {
			console.log(logColors.update, `Updated every ${JSON.stringify(query)} with ${JSON.stringify(newValue)}`)
			callback(result)
		})
	}

	delete(query, callback = defaultCallback) {
		this.collection.deleteMany(query)
		.then( result => {
			console.log(logColors.delete, `Deleted every ${JSON.stringify(query)}`)
			callback(result)
		})
	}

	drop(callback = defaultCallback) {
		this.collection.drop( (err, result) => {
			if(err) throw err
			else if(result) {
				console.log(logColors.drop, `Collection ${this.name} has been dropped`)
			}
			callback()
		})
	}
}

module.exports = Collection