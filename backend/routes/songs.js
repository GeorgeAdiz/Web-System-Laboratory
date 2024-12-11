const express = require('express')
const {
    createSong,
    getSongs,
    getSong,
    deleteSong,
    updateSong
} = require('../controllers/songControllers')

const router = express.Router()

// GET all workouts
router.get('/', getSongs)

// GET a single workout 
router.get('/:id', getSong)

// POST  a new workout 
router.post('/', createSong)

// DELETE a workout 
router.delete('/:id',deleteSong)

// UPDATE a workout
router.patch('/:id', updateSong)

module.exports = router