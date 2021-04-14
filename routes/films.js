const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const { AuthenticatedUser } = require('../config/authentication');

//Film Model
const Film = require('../models/Film');
const Review = require('../models/Review');

// Film Page
router.get('/films', (req, res) => res.render('films'));

router.get("/films/:id", AuthenticatedUser, function (req, res) {
    var id = req.params.id;

    Film.findById(id, function(error, foundFilm){
        if(error){
            console.log("Couldn't find Film with that id:");
        }else{
            res.render("films", {
                user: req.user,
                name: foundFilm.name,
                synopsis: foundFilm.synopsis,
                runTime: foundFilm.runTime,
                releaseDate: foundFilm.releaseDate,
                genre: foundFilm.genre,
                director: foundFilm.director,
                rating: foundFilm.rating,
                trailer: foundFilm.trailer,
                box_office: foundFilm.box_office,
                posterFile: foundFilm.posterFile,
            });
        }
    });
});
 
router.get("/FilmList", AuthenticatedUser, function (req, res) {
    Film.find({}, function(error, films){
        if(error){
            console.log("There was a problem retrieving all of the Films from the database.");
            console.log(error);
        }else{
            res.render("FilmList", {
                filmsList: films,
                user: req.user
            });
        }
    });
});

router.get("/addfilm", function(req, res){
    res.render("addfilm");
});

router.post("/addfilm", (req, res) =>{
    var data = req.body;

var imageFile = req.files.imagefile;

imageFile.mv("public/filmsimages/" + imageFile.name, function(error){
    if(error){
        console.log("Couldn't upload the image file");
        console.log(error);
    }else{
        console.log("Image file succesfully uploaded.");
    }
});
    
    Film.create({
        name: data.name,
        synopsis: data.synopsis,
        runTime: data.runTime,
        releaseDate: data.releaseDate,
        genre: data.genre,
        trailer: data.trailer,
        director: data.director,
        rating: data.rating,
        box_office: data.box_office,
        posterFile: imageFile.name
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this Film to the database");
        }else{
            console.log("Film added to database");
            console.log(data);
        }

    });
    res.redirect("/films/FilmList");
});


router.post("/addreview", AuthenticatedUser, (req, res) =>{
    var data = req.body;
    Review.create({
        comment: data.comment,
        film: req.film_id,
        written_by: req.user_id,

    }, function(error, data){
        if(error){
            console.log("There was a problem adding this Review to the database");
        }else{
            console.log("Review added to database");
            console.log(data);
        }

    });
    res.redirect("/films/FilmList");
});

module.exports = router;