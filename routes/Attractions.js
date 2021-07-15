

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