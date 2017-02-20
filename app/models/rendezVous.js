var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var RendezVousSchema = new Schema({
    title : {type: String, required: true},
    description :{type:String},
    startAt : {type:Date, required: true},
    endAt : {type:Date},
    projet : Schema.Types.ObjectId,
    color: {type:String, default: 'blue'}
});


module.exports = mongoose.model('RendezVous', RendezVousSchema);
