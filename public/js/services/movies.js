angular.module('movieService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Movies', function($http) {
		return {
			// show : function(id){
			// 	return $http.get('/api/movies/' + id);
			// },
			get : function() {
				return $http.get('/api/movies');
			},
			create : function(movieData) {
				return $http.post('/api/movies', movieData);
			},
			update : function(movieData, id) {
				return $http.put('/api/movies/' + id, movieData);
			},
			delete : function(id) {
				return $http.delete('/api/movies/' + id);
			}
		}
	});