const Song = require('../models/songmodel')
const mongoose = require('mongoose')

// get all workouts
const getSongs = async (req, res) => {
    const songs = await Song.find({}).sort({createdAt: -1})

    res.status(200).json(songs)
}

// get a single workout
const getSong = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song'}) 
    }

    const song = await Song.findById(id)

    if (!song) {
        return res.status(404).json({error: 'No such song'})
    }

    res.status(200).json(song)
}

const createSong = async (req, res) => {
    const { song, artist } = req.body;

    if (!song || !artist) {
        return res.status(400).json({ error: "Song and artist are required" });
    }

    try {
        const newSong = await Song.create({ song, artist });
        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete workout 
const deleteSong = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song'}) 
    }

    const song = await Song.findOneAndDelete({_id: id})

    if (!song) {
        return res.status(400).json({error: 'No such song'})
    }

    res.status(200).json(song)
}

// update a workout
const updateSong = async (req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such song'}) 
    }

    const song = await Song.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!song) {
        return res.status(400).json({error: 'No such song'})
    }

    res.status(200).json(song)
}

module.exports = {
    getSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
}