const express = require('express');
const bodyParser = require('body-parser')

const app = express();
var mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
var ID = mongodb.ObjectID;

var db
var dburl = 'mongodb://grey:qwertyuiop@ds243085.mlab.com:43085/students'

MongoClient.connect(dburl, (err, database) => 
	{
		if (err) return console.log(err)
        db = database
        console.log('Database successfully connected')
		
		var server = app.listen(process.env.PORT || 4000, () => {
			var port = server.address().port;
			console.log("Express is working on port " + port);
		  });
	})

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
	//db.collection('quotes').find().toArray((err,result) => {
		//if (err) return console.log(err)
		//renders ejs
		res.render('index.ejs')
	})
app.get('/students', (req, res) => {
	db.collection('students').find().toArray((err,result) => {
		if (err) return console.log(err)
		res.render('students.ejs', {students: result})
	})
	
})
app.post("/students/details", (req, res, next) => {
	db.collection('students').findOne({
		_id: ID(req.body.id) }, (err, result) => {
		if (err) {
		  console.log(err.message, "Failed to get student")
		} else {
		  res.send(result)
		}
	  });
})

app.post("/students/edit", (req, res, next) => {
	db.collection('students').findOne({
		_id: ID(req.body.id) }, (err, result) => {
		if (err) {
		  console.log(err.message, "Failed to get student")
		} else {
		  res.send(result)
		}
	  });
})
	
  //  })
   
app.post('/register', (req,res) => {
	db.collection('students').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})
})

app.put('/students/update', (req, res) => {
	
	db.collection('students').findOneAndUpdate({_id: ID(req.body._id)},{
		
			name: req.body.name,
			course: req.body.course,
			department: req.body.department,
			faculty: req.body.faculty,
			level: req.body.level,
			email: req.body.email
		}, {
		upsert: false
	}, (err, result) => {
		if (err) return res.send(err)
		res.send(result)
	})
})

app.delete('/students/delete', (req, res, next) => {
	//Handle delete event here
	db.collection('students').remove({
		_id: ID(req.body._id)
	},
		(err, result) => {
			if (err) return res.send(500, err)
			res.send({message: 'Student Deleted'})
		})
})