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
var getCategories = function (callback){
	Categories.find().sort({'Name': 1}).exec(callback);
};
module.exports = {
	Categories: Categories,
	getCategories :getCategories
};