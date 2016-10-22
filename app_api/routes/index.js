var express = require('express');
var router = express.Router();
var ctrlClasses = require('../controllers/classes');
var ctrlReviews = require('../controllers/reviews');

//classes
router.get('/classes', ctrlClasses.classesGetAll);

//professors
router.get('/classes/:classid/professors', ctrlClasses.professorsForClass);

//reviews
router.get('/classes/:classid/professors/:professorid/reviews', ctrlReviews.reviewsGetAll);
router.post('/classes/:classid/professors/:professorid/reviews', ctrlReviews.reviewsCreate);

module.exports = router;