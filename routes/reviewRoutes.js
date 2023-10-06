const reviews = require ('../controllers/reviewCtr.js')
const router = require ('express').Router();

router.get('/allreview', reviews.getAllReviews)
router.post('/addreview/:id', reviews.addReview)

module.exports = router;