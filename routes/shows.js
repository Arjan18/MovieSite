const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const { AuthenticatedUser, forwardAuthenticated } = require('../config/authentication');

//TV Model
const Show = require('../models/Television');

// TV Page
router.get('/shows', (req, res) => res.render('shows'));

router.get("/shows/:id", AuthenticatedUser, function (req, res) {
    var id = req.params.id;
    Show.findById(id, function(error, foundShow){
        if(error){
            console.log("Couldn't find TV Show with that id:");
        }else{
            res.render("shows", {
                user: req.user,
                name: foundShow.name,
                overview: foundShow.overview,
                seasons: foundShow.seasons,
                episodes: foundShow.episodes,
                genre: foundShow.genre,
                creator: foundShow.creator,
                rating: foundShow.rating,
                trailer: foundShow.trailer,
                network: foundShow.network,
                releaseYear: foundShow.releaseYear,
                posterFile: foundShow.posterFile
            });
        }
    });
});
 
router.get("/ShowList", AuthenticatedUser, function (req, res) {
    Show.find({}, function(error, shows){
        if(error){
            console.log("There was a problem retrieving all of the Show from the database.");
            console.log(error);
        }else{
            res.render("ShowList", {
                showsList: shows,
                user: req.user
            });
        }
    });

});

router.get("/addshows", function(req, res){
    res.render("addshows");
});

router.post("/addshows", (req, res) =>{
var data = req.body;

var imageFile = req.files.imagefile;

imageFile.mv("public/TVimages/" + imageFile.name, function(error){
    if(error){
        console.log("Couldn't upload the image file");
        console.log(error);
    }else{
        console.log("Image file succesfully uploaded.");
    }
});
    
    Show.create({
        name: data.name,
        overview: data.overview,
        seasons: data.seasons,
        episodes: data.episodes,
        genre: data.genre,
        creator: data.creator,
        rating: data.rating,
        trailer: data.trailer,
        network: data.network,
        releaseYear: data.releaseYear,
        posterFile: imageFile.name
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this Show to the database");
        }else{
            console.log("Show added to database");
            console.log(data);
        }

    });
    res.redirect("/shows/ShowList");
});

module.exports = router;