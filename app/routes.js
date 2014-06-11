var Movie = require('./models/movie');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get movie logic here

	// get all movies
	app.get('/api/movies', function(req, res) {

		// use mongoose to get all movies in the database
		Movie.find(function(err, movies) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(movies); // return all movies in JSON format
		});
	});

	app.get('/api/movies/:movie_id', function(req, res){
		Movie.find({
			_id : req.params.movie_id
		}, function(err, movie) {
			if (err)
				res.send(err);

			// get and return all the movies after you create another
			Movie.find(function(err, movies) {
				if (err)
					res.send(err)
				res.json(movies);
			});
		});
	});

	// create movie and send back all movies after creation
	app.post('/api/movies', function(req, res) {

		// create a movie, information comes from AJAX request from Angular
		Movie.create({
			title : req.body.title,
			year : req.body.year,
			imdbLink : req.body.imdbLink,
			seen : 0
		}, function(err, movie) {
			if (err)
				res.send(err);

			// get and return all the movies after you create another
			Movie.find(function(err, movies) {
				if (err)
					res.send(err)
				res.json(movies);
			});
		});

	});
	// update a movie logic here
	app.put('/api/movies/:movie_id', function(req, res){
		var _id = (req.params.movie_id !== "undefined") ? req.params.movie_id : null;
		var query = {_id: _id};	
		Movie.update(
		query,
		{
			$set:{
				title : req.body.title,
				year : req.body.year
			}
		}, function(err, movie) {
			if (err)
				res.send(err);

			// get and return all the movies after you create another
			Movie.find(function(err, movies) {
				if (err)
					res.send(err)
				res.json(movies);
			});
		});
	});


	// delete a movie
	app.delete('/api/movies/:movie_id', function(req, res) {
		Movie.remove({
			_id : req.params.movie_id
		}, function(err, movie) {
			if (err)
				res.send(err);

			// get and return all the movies after you create another
			Movie.find(function(err, movies) {
				if (err)
					res.send(err)
				res.json(movies);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};