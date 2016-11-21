/******** Controllers ***********************/
var classCtrl = function($scope, $http, sharedReviewInputFormService, getClassDataService, getClassSectionService, getClassReviewService) {
    $scope.sharedObj = sharedReviewInputFormService;
    $scope.sections = [];
    $scope.sectionReviews = [];
    $scope.classId = "";
    $scope.className = "";
    $scope.classListings = [];
    $scope.sharedObj.setReviewsLoaded(false);

    $scope.getClassData = function() {
        // Calls the async method defined in the service that returns a promise
        // The then method of the promise is used to set $scope.classListings to the data response
        getClassDataService.async().then(function(data) {
            $scope.classListings = data;
        });
    };
    
    // will use class id to retrieve and populate the list of class sections
	$scope.getClassSections = function(classId, className) {
	    // Calls the async method defined in the service that returns a promise
        // The then method of the promise is used to set $scope.sections to the data response
		getClassSectionService.async(classId).then(function(sections) {
		    $scope.sections = sections;
		});
		$scope.className = className;
		$scope.classId = classId;
		$scope.sharedObj.setSharedClassId(classId);
	};
	
	$scope.getSectionReviews = function(profId) {
	    // Calls the async method defined in the service that returns a promise
        // The then method of the promise is used to set $scope.sectionReviews to the data response
	    getClassReviewService.async(profId, $scope.classId).then(function(reviews) {
	        $scope.sectionReviews = reviews;
	    });
	    $scope.sharedObj.setReviewsLoaded(true);
	    $scope.sharedObj.setSharedProfId(profId);
	    $scope.sharedObj.submitted = false;
	};
	
	$scope.clearSearchInfo = function() {
	    $scope.search = "";
	    $scope.sectionReviews = [];
	    $scope.sharedObj.setReviewsLoaded(false);
	};
	
};

var reviewInputCtrl = function($scope, $http, sharedReviewInputFormService, addReviewService) {
    $scope.sharedObj = sharedReviewInputFormService;
    $scope.newReview = {}; //newReview object that will hold the newly created review
    $scope.newReview.username = "Anonymous"; //Default Username
    $scope.newReview.rating = 3; //Default rating
    $scope.newReview.text = "";
    $scope.onSubmit = function() {
        $scope.newReview.profId = $scope.sharedObj.getSharedProfId();
        $scope.newReview.classId = $scope.sharedObj.getSharedClassId();
        addReviewService.async($scope.newReview).then(function() {
            $scope.newReview.username = "Anonymous";
            $scope.newReview.rating = 3;
            $scope.newReview.text = "";
          //  alert("Thanks!");
        });
        $scope.sharedObj.submitted = true;
        /*alert($scope.newReview.profId);
        alert($scope.newReview.classId);
        alert($scope.newReview.username);
        alert($scope.newReview.rating);
        alert($scope.newReview.text);*/
    };
};

/******** End Controllers ********************/

/******** Directives *************************/

// Directive for the class-section buttons
var classButtonItem = function() {
	return {
	    restrict: 'A',
	    replace: false,
		templateUrl: '/angular-1.5.8/professorList.html',
	    scope: true
	};
};

// Directive for displaying reviews
var review = function() {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '/angular-1.5.8/reviews.html',
        scope: {
            reviewId: '=',
            username: '=',
            rating: '=',
            date: '=',
            reviewText: '='
        }
    };
};

// Directive for the review input form
var reviewInputForm = function($compile) {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '/angular-1.5.8/writeReview.html',
        scope: true
    }
};

//Star Rating Directive for User Input Form
var starRating = function() {
  return {
		restrict : 'A',
		templateUrl : '/angular-1.5.8/stars.html',
		scope : {
			ratingValue : '=ngModel',
			max : '='
		},
		link : function(scope, elem, attrs) {
			var updateStars = function() {
				scope.stars = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
			};
			
			scope.toggle = function(index) {
				scope.ratingValue = index + 1;
			};
			
			scope.$watch('ratingValue',
				function(oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};
};
/**** End Directives ***********************/

/**** Services *****************************/

//Returns a promise object returned by $http service for the initial class data API call 
var getClassDataService = function($http) {
    var ClassDataService = {
        // $http returns a promise, which has a then function, which also returns a promise
        async: function() {
            var promise = $http.get('https://brosz-class-rat-nbrosz.c9users.io/api/classes/').then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassDataService Request Failed: " + error);
            });
        // Return the promise to the controller
            return promise;
        }
    };
    return ClassDataService;
};

//Returns a promise object returned by $http service for the class section API call
//This service relies on the unique class id of the class chosen by the user to make the call
var getClassSectionService = function($http) {
    var ClassSectionService = {
        // $http returns a promise, which has a then function, which also returns a promise
        async: function(classId) {
            var promise = $http.get('https://brosz-class-rat-nbrosz.c9users.io/api/classes/' + classId + '/professors/').then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassSectionService Request Failed: " + error);
            });
        // Return the promise to the controller    
            return promise;
        }
    }; 
    return ClassSectionService;
};

//Returns a promise object returned by $http service for the class section reviews API call
//This service relies on the unique class id and professor id of the class and professor chosen by the user to make the call
var getClassReviewService = function($http) {
    var ClassReviewService = {
        // $http returns a promise, which has a then function, which also returns a promise    
        async: function(profId, classId) {
            var promise = $http.get('https://brosz-class-rat-nbrosz.c9users.io/api/classes/' + classId + '/professors/' + profId + '/reviews/' ).then(function(response) {
        // The return value gets picked up by the then method in the controller.
                return response.data;
            },
            //On failure
            function(error)
            {
                console.log("ClassReviewService Request Failed: " + error);
            });
        // Return the promise to the controller    
            return promise;
        }
    };
    
    return ClassReviewService;
};

var sharedReviewInputFormService = function() {
        this.loaded = false;
        this.profId = "";
        this.classId = "";
        this.submitted = false;
        
        this.getReviewsLoaded = function() {
            return this.loaded;
        };
            
        this.setReviewsLoaded = function(reviewsLoaded) {
            this.loaded = reviewsLoaded;
        };
        
        this.setSharedClassId = function(inputClassId) {
            this.classId = inputClassId;
        }
        
        this.getSharedClassId = function() {
            return this.classId;
        }
        
        this.setSharedProfId = function(inputProfId) {
            this.profId = inputProfId;
        }
        
        this.getSharedProfId = function () {
            return this.profId;
        }
};


var addReviewService = function($http) {

    var reviewService = {
            //$http returns a promise, which has a then function, which also returns a promise
            async: function(newReview) {
                
                //Create new data object for POST request
                var review = {};
                review.username = newReview.username;
                review.rating = newReview.rating;
                review.text = newReview.text;
                
                var promise = $http.post('https://brosz-class-rat-nbrosz.c9users.io/api/classes/'+newReview.classId+'/professors/'+newReview.profId+'/reviews/', newReview).then(
                    //On success
                    function(response) {
                        alert("POST success!");
                     },
                     //On failure
                    function(error) {
                        alert("addReviewService request failed:"+JSON.stringify(error));
                    }
            );
            //Return promise to the controller
            return promise;
        }
    };
    
    return reviewService;
};


/**** End Services **************************/

angular
    .module('ClassRat', [])
    .controller('classCtrl', classCtrl)
    .controller('reviewInputCtrl', reviewInputCtrl)
    .directive('classButtonItem', classButtonItem)
    .directive('review', review)
    .directive('reviewInputForm', reviewInputForm)
    .directive('starRating', starRating)
    .service('sharedReviewInputFormService', sharedReviewInputFormService)
    .service('getClassDataService', getClassDataService)
    .service('getClassSectionService', getClassSectionService)
    .service('getClassReviewService', getClassReviewService)
    .service('addReviewService', addReviewService);