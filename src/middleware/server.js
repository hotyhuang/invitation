const express = require("express");
const app = express();
const cors = require('cors')
const port = 8443;
const mongodb = require("./crud.js")
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get('/MP_verify_SBHGkC9eZJF3vku9.txt', (req, res) => {
	res.sendFile(__dirname + '/MP_verify_SBHGkC9eZJF3vku9.txt')
})

app.get("/find/:query", (req, res) => {
	const {query} = req.params
	mongodb.find({name: query},
		result => {
			res.send(result);
		})
	.catch(err => {
		res.status(400).send(err);
	});
});

app.get("/find", (req, res) => {
	mongodb.find({},
		result => {
			res.send(result);
		})
	.catch(err => {
		res.status(400).send(err);
	});
})

app.post("/add", (req, res) => {
	const {name, number} = req.body
	mongodb.add(
		{name, number},
		result => {
			res.send(result)
		}
	)
	.catch(err => {
		console.log(err)
		res.status(400).send(err);
	});
});

app.put("/update", (req, res) => {
	const {query, newValue} = req.body
	mongodb.update(query, newValue,
		result => {
			res.send(result);
		})
	.catch(err => {
		res.status(400).send(err);
	});
});

// app.delete("/delete", (req, res) => {
// 	const {query} = req.body
// 	mongodb.delete(query,
// 		result => {
// 			res.send(result);
// 		})
// 	.catch(err => {
// 		res.status(400).send(err);
// 	});
// });

// app.delete("/drop", (req, res) => {
// 	// const {query} = req.body
// 	mongodb.drop(result => {
// 		res.send(result);
// 	})
// 	.catch(err => {
// 		res.status(400).send(err);
// 	});
// });

app.listen(port, () => {
	console.log("Server listening on port " + port);
});