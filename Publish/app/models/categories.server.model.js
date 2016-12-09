/**
 * Created by phuc.ngo on 8/12/2016.
 */
var mongoose = require('mongoose');
var categoriesSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    }
});

var Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;