const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name: {type: String, unique: true}
})

const category = mongoose.model('Category', categorySchema)
module.exports = category;