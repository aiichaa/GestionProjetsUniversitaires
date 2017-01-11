/**
 * Created by InFo on 12/12/2016.
 */
//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var DocumentSchema = new Schema({
    nom: String,
    projet : Schema.Types.ObjectId,
    dateCreation : Date,
    file : Object
});


module.exports = mongoose.model('Document', DocumentSchema);
