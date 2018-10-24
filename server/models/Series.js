const mongoose = require('mongoose');

const seriesModel = new mongoose.Schema({
    title: String,
    seasons: Number,

})

const Series = mongoose.model('series', seriesModel);
module.exports = Series;