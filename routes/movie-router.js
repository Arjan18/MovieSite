const express = require('express');
const router = express.Router();

const MovieCtrl = require('../controllers/movie-ctrl')

router.get('/searchMovie', (req, res) => res.render('searchMovie'));
router.get('/createMovie', (req, res) => res.render('createMovie'));

router.post('/movie', MovieCtrl.createMovie);
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)

module.exports = router;