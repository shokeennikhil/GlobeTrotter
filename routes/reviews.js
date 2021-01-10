// const express=require('express')
// const router=express.Router({mergeParams:true});
// const catchAsync=require('../utils/catchAsync')
// const ExpressError=require('../utils/ExpressError')
// const Campground = require('../models/campground');
// const {reviewSchema} = require('../schemas.js');
// const Review=require('../models/review');
// const validateReview = (req, res, next) => {
//     const { Attractionschema,reviewSchema} = require('../schemas.js')
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }
// router.post('/',validateReview,catchAsync(async(req,res)=>{
//     const campground=await Campground.findById(req.params.id);
//     const review=new Review(req.body.review);
//     campground.reviews.push(review);
//    await review.save();
//     await campground.save();
//     req.flash=('success','created a new review')
//     res.redirect(`/Attractions/${campground._id}`)
// }))
// // app.all('*',(req,res,next)=>{
// //    next(new ExpressError('ohh noii',404))
// // })
// router.delete('/:reviewId', catchAsync(async (req, res) => {
//    const { id, reviewId } = req.params;
//    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//    await Review.findByIdAndDelete(reviewId);
//    req.flash('success','successfully deleted campground')
//    res.redirect(`/Attractions/${id}`);
// }))

// module.exports=router;

// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
// const Campground = require('../models/campground');
// const Review = require('../models/review');
// const ExpressError = require('../utils/ExpressError');
// const catchAsync = require('../utils/catchAsync');
// const reviews = require('../controllers/reviews');
// // router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
// //     const campground = await Campground.findById(req.params.id);
// //     const review = new Review(req.body.review);
// //     review.author = req.user._id;
// //     campground.reviews.push(review);
// //     await review.save();
// //     await campground.save();
// //     req.flash('success', 'Created new review!');
// //     res.redirect(`/Attractions/${campground._id}`);
// // }))

// // router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
// //     const { id, reviewId } = req.params;
// //     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
// //     await Review.findByIdAndDelete(reviewId);
// //     req.flash('success', 'Successfully deleted review')
// //     res.redirect(`/Attractions/${id}`);
// // }))

// // module.exports = router;
// router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

// module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;