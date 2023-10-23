const router = require('express').Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);
