/* global angular */
angular.module('ClassRat').controller('classCtrl', function($scope, $http, sharedReviewInputFormService, getClassDataService, getClassSectionService, getClassReviewService) {
    $scope.sharedObj = sharedReviewInputFormService;
    $scope.sections = [];
    $scope.sectionReviews = [];
    $scope.classId = "";
    $scope.className = "";
    $scope.classListings = [];
    $scope.professorName = "";
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
	
	$scope.getSectionReviews = function(profId, profName) {
	    // Calls the async method defined in the service that returns a promise
        // The then method of the promise is used to set $scope.sectionReviews to the data response
	    getClassReviewService.async(profId, $scope.classId).then(function(reviews) {
	        $scope.sectionReviews = reviews;
	    });
	    
	    $scope.professorName = "- " + profName;
	    $scope.sharedObj.setReviewsLoaded(true);
	    $scope.sharedObj.setSharedProfId(profId);
	    $scope.sharedObj.submitted = false;
	};
	
	$scope.clearSearchInfo = function() {
	    $scope.search = "";
	    $scope.sectionReviews = [];
	    $scope.sharedObj.setReviewsLoaded(false);
	};
	
});
