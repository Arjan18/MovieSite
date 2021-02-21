const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fileUpload = require('express-fileupload');

//Film Model
const Film = require('../models/Film');

// Film Page
router.get('/movies', (req, res) => res.render('movies'));

router.get("/films/:id", function (req, res) {
    var id = req.params.id;

    Film.findById(id, function(error, foundFilm){
        if(error){
            console.log("Couldn't find Film with that id:");
        }else{
            res.render("films", {
                name: foundFilm.name,
                synopsis: foundFilm.synopsis,
                runTime: foundFilm.runTime,
                releaseDate: foundFilm.releaseDate,
                genre: foundFilm.genre,
                director: foundFilm.director,

                posterFile: foundFilm.posterFile
            });
        }
    });
});
 
router.get("/FilmList", function (req, res) {
 
    Film.find({}, function(error, films){
        if(error){
            console.log("There was a problem retrieving all of the Films from the database.");
            console.log(error);
        }else{
            res.render("FilmList", {
                filmsList: films
            });
        }
    });

});

router.get("/addfilm", function(req, res){
    res.render("addfilm");
});

router.post("/addfilm", function(req, res){
    var data = req.body;

    //a variable representation of the files
    var imageFile = req.files.imagefile;

    //Using the files to call upon the method to move that file to a folder
    imageFile.mv("../public/films/thumbnails/" + imageFile.name, function(error){
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
        posterFile: imageFile.name
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this Film to the database");
        }else{
            console.log("Film added to database");
            console.log(data);
        }

    });
    res.redirect("/FilmList");
});

module.exports = router;
