// const express=require('express')
// const router=express.Router();
// const catchAsync=require('../utils/catchAsync')
// const ExpressError=require('../utils/ExpressError')
// const Campground = require('../models/campground');
// const { Attractionschema,reviewSchema} = require('../schemas.js');
// const {isLoggedIn}=require('../middleware')
// //const Review=require('./models/review');
// const validateCampground = (req, res, next) => {
//     const { error } = Attractionschema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }
// router.get('/', async (req, res) => {
//     const Attractions = await Campground.find({});
//     res.render('Attractions/index', { Attractions })
// });
// router.get('/new', isLoggedIn,(req, res) => {
//     res.render('Attractions/new');
// })

// router.post('/',isLoggedIn,validateCampground,catchAsync( async (req, res,next) => {
//  // if(!req.body.campground) throw new ExpressError('invalid campground',400)
   
//     const campground = New Campground(req.body.campground);
//     await campground.save();
//     req.flash('success','successfully made a New Campground')
//     res.redirect(`/Attractions/${campground._id}`)

   
// }))

// router.get('/:id', catchAsync(async (req, res,) => {
//     const campground = await Campground.findById(req.params.id).populate('reviews')
//     if(!campground){
//         req.flash('error','cannot find')
//        return res.redirect('/Attractions')
//     }
//     //console.log(campground)
//     res.render('Attractions/show', { campground });
// }));

// router.get('/:id/edit',catchAsync( async (req, res) => {
//     const campground = await Campground.findById(req.params.id)
//     if(!campground){
//         req.flash('error','cannot find')
//        return res.redirect('/Attractions')
//     }
//     res.render('Attractions/edit', { campground });
// }))
// router.put('/:id',validateCampground,catchAsync( async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     req.flash('success','successfully updated campground')
//     res.redirect(`/Attractions/${campground._id}`)
// }));
// router.delete('/:id',catchAsync( async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     res.redirect('/Attractions');
// }))
// module.exports=router

  
// const express = require('express');
// const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
// const { Attractionschema } = require('../schemas.js');
// const { isLoggedIn } = require('../middleware');

// const ExpressError = require('../utils/ExpressError');
// const Campground = require('../models/campground');

// const validateCampground = (req, res, next) => {
//     const { error } = Attractionschema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// router.get('/', catchAsync(async (req, res) => {
//     const Attractions = await Campground.find({});
//     res.render('Attractions/index', { Attractions })
// }));

// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('Attractions/new');
// })


// router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
//     const campground = New Campground(req.body.campground);
//     await campground.save();
//     req.flash('success', 'Successfully made a New Campground!');
//     res.redirect(`/Attractions/${campground._id}`)
// }))

// router.get('/:id', catchAsync(async (req, res,) => {
//     const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/Attractions');
//     }
//     res.render('Attractions/show', { campground });
// }));

// router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id)
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/Attractions');
//     }
//     res.render('Attractions/edit', { campground });
// }))

// router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     req.flash('success', 'Successfully updated campground!');
//     res.redirect(`/Attractions/${campground._id}`)
// }));

// router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted campground')
//     res.redirect('/Attractions');
// }));

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
// const Attractions=require('../controllers/Attractions')
// const Campground = require('../models/campground');

// router.get('/', catchAsync(Attractions.index));

// router.get('/new', isLoggedIn, Attractions.renderNewForm)


// router.post('/', isLoggedIn, validateCampground, catchAsync(Attractions.createCampground))

// router.get('/:id', catchAsync(Attractions.showCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Attractions.renderEditForm))

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(Attractions.updateCampground));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(Attractions.deleteCampground));

// module.exports = router;
const express = require('express');
const router = express.Router();
const Attractions = require('../controllers/Attractions');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer=require('multer')
const {storage}=require('../cloudinary')
const upload=multer({ storage});

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(Attractions.index))
    .post(isLoggedIn,upload.array('image'), validateCampground,catchAsync(Attractions.createCampground))
    // .post(upload.array('image'),(req,res)=>{
    //     res.send(req.body);
    // })
router.get('/new', isLoggedIn, Attractions.renderNewForm)

router.route('/:id')
    .get(catchAsync(Attractions.showCampground))
    .put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(Attractions.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(Attractions.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Attractions.renderEditForm))



module.exports = router;