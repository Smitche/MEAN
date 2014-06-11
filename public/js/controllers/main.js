angular.module('movieController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, $attrs, Movies) {
		$scope.formData = {};
		$scope.editFormData = {};
		$scope.formSeen = {};

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Movies.get()
			.success(function(data) {
				$scope.movies = data;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createMovie = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (!$.isEmptyObject($scope.formData)) {

				// call the create function from our service (returns a promise object)
				Movies.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.movies = data; // assign our new list of todos
					});
			}
		};

		$scope.updateMovie = function(id) {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (!$.isEmptyObject(this.editFormData)) {

				Movies.update(this.editFormData, id)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log('Succes!');
					$scope.enableEditable = false;
					$scope.editFormData = {}; // clear the form so our user is ready to enter another
					$scope.movies = data; // assign our new list of todos
				});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteMovie = function(id) {
			Movies.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.movies = data; // assign our new list of todos
				});
		};


		$scope.enableEditable = false;

		$scope.enableEditor = function(){
			this.enableEditable = false;
			this.enableEditable = true;
			this.editFormData.title = this.movie.title;
			this.editFormData.year = this.movie.year;
		}

		$scope.disableEditor = function(){
			this.enableEditable = false;
		}

		$scope.isChecked = function()
		{
			
			// OLD NICE CLEANER CODE
		    // $scope.checked = ($scope.checked) ? false : true;
		    // return $scope.checked;
		    if($scope.checked == false){
		    	
		    	return $scope.checked;
		    }
		}

		$scope.seenMovie = function(id){

			if(this.movie.seen == "true"){
				this.movie.seen = "false";
			}
			else{
				this.movie.seen = "true";
			}
			$scope.formSeen = this.movie.seen;
			console.log(formSeen);
			Movies.update($scope.formSeen, id)
				.success(function(data) {
					
					$scope.movies = data; // assign our new list of todos
				});
		}
	});