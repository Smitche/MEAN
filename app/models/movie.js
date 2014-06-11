var mongoose = require('mongoose');

module.exports = mongoose.model('Movies', {
	title : String,
	year : Number,
	imdbLink : String,
	seen : String
});