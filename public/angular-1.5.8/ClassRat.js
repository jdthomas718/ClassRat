/******** Controllers ***********************/
var classCtrl = function($scope, sharedReviewInputFormService) {
    sharedReviewInputFormService.setReviewsLoaded(false);
    $scope.sections = [];
    $scope.sectionReviews = [];
    $scope.classId = {};
    $scope.className = "";
    $scope.classListings = [
        {
            id: 0xf00b412,
            code: "CSC 150",
            name: "Computer Science 1"
        }, 
        {
            id: 0xf00b413,
            code: "CSC 250",
            name: "Computer Science 2"
        }, 
        {
           id: 0xf00b414,
           code: "MATH 201",
           name: "Intro to Discrete Math"
        }
         ];

    // will use class id to retrieve and populate the list of class sections
	$scope.getClassSections = function(className) {
		$scope.sections = classSectionService(className);
		$scope.className = className;
	};
	
	$scope.getSectionReviews = function(profId) {
	    $scope.sectionReviews = classReviewService(profId);
	    sharedReviewInputFormService.setReviewsLoaded(true);
	};
	
	$scope.clearSearchInfo = function() {
	    $scope.search = "";
	    $scope.sectionReviews = [];
	    sharedReviewInputFormService.setReviewsLoaded(false);
	};
	
};

var reviewInputCtrl = function($scope, sharedReviewInputFormService) {
    $scope.reviewsLoaded = sharedReviewInputFormService;
    //alert($scope.reviewsLoaded);
};
/******** End Controllers ********************/

/******** Directives *************************/
var classButtonItem = function() {
	return {
	    restrict: 'A',
	    replace: false,
		templateUrl: '/angular-1.5.8/professorList.html',
	    scope: true
	};
};

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

var reviewInputForm = function() {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '/angular-1.5.8/writeReview.html',
        scope: {
            display: '='
        }
    };
};
/**** End Directives ***********************/

/**** Services *****************************/
var classSectionService = function(className) {
    return  [   {
                    _id: 0x1234,
            		name: "Tom Halverson",
            		average: 3.5,
            		ratings: [3, 4]
                },
            	{
            		_id: 0x1235,
            		name: "Jason Jenkins",
            		average: 4.5,
            		ratings: [5, 5, 4, 4]
                }
            ];
        
};

var classReviewService = function(profId) {
    return [
        	{
        		id: "580ff27d49e785f8d1e4c678",
        		created: "05/17/2016",
        		username: "anonymous",
        		rating: 4,
        		text: "Review goes here."
        	},
        	{
        		id: "580ff28749e785f8d1e4c679",
        		created: "07/18/2015",
        		username: "anonymous",
        		rating: 3,
        		text: ""
        	}
        ];
};

var sharedReviewInputFormService = function() {
        this.loaded = false;
        
        this.getReviewsLoaded = function() {
            return this.loaded;
        };
            
        this.setReviewsLoaded = function(reviewsLoaded) {
            this.loaded = reviewsLoaded;
        };
};
/**** End Services **************************/

angular
    .module('ClassRat', [])
    .controller('classCtrl', classCtrl)
    .controller('reviewInputCtrl', reviewInputCtrl)
    .directive('classButtonItem', classButtonItem)
    .directive('review', review)
    .directive('reviewInputForm', reviewInputForm)
    .service('sharedReviewInputFormService', sharedReviewInputFormService)
    .service('classSectionService', classSectionService)
    .service('classReviewService', classReviewService);
    