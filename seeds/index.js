
// const mongoose=require('mongoose')
// const cities=require('./cities');
// const Campground=require('../models/campground')
// const { places, descriptors } = require('./seedhelper');
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);


// mongoose.connect("mongodb+srv://Nikhil:Nikhil@cluster0.ayxgl.mongodb.net/test?retryWrites=true&w=majority").then(() => {
// 	console.log('Connected to DB!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });

// const seedDB=async()=>{
//     await Campground.deleteMany({});
//     for(let i =0;i<50;i++){
//         const random1000=Math.floor(Math.random()*1000);
//        const camp= New Campground({
//             location:`${cities[random1000].city},${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`
            
//         })
//        await camp.save(); 
//     }
    
// }

// seedDB();
// const mongoose = require('mongoose');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');
// const Campground = require('../models/campground');

// // mongoose.connect('mongodb://localhost:27017/yelp-camp', {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //     useUnifiedTopology: true
// // });

// // const db = mongoose.connection;

// // db.on("error", console.error.bind(console, "connection error:"));
// // db.once("open", () => {
// //     console.log("Database connected");
// // });

// const sample = array => array[Math.floor(Math.random() * array.length)];


// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price=Math.floor(Math.random() * 20);
//         const camp = New Campground({
//             author:'5fe63da2d71e6c0008c4f8dc',
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ,${sample(places)}`,
//             image:'https://source.unsplash.com/collection/483251',
//             description:'hcytftyfytc',
//             price,
//             geometry: {
//                 type: "Point",
//                 coordinates: [-113.1331, 47.0202]
//             },
//             images:[
               
//             ]

//         })  
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);


mongoose.connect("mongodb+srv://Nikhil:Nikhil@cluster0.ayxgl.mongodb.net/Attractions?retryWrites=true&w=majority").then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '5fe63da2d71e6c0008c4f8dc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates:  [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                   
                    url: 'https://res.cloudinary.com/dngwkbswd/image/upload/v1610095289/Globetrotter/cjegseuk21jrasjr9wen.jpg',
                    filename: 'Globetrotter/cjegseuk21jrasjr9wen'
                  },
                  {
                   
                    url: 'https://res.cloudinary.com/dngwkbswd/image/upload/v1610095290/Globetrotter/dqc3vov2ssxpahtmoppp.jpg',
                    filename: 'Globetrotter/dqc3vov2ssxpahtmoppp'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})