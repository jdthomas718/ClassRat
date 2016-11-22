/* global angular*/
/* Service that provides a shared object used for data sharing between the classCtrl
   and reviewInputCtrl controllers
*/
angular.module('ClassRat').service('sharedReviewInputFormService', function() {
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
});