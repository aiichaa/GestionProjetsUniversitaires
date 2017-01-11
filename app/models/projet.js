/**
 * Created by info on 07/01/2017.
 */
/**
 * Created by info on 23/12/2016.
 */
/**
 * Created by InFo on 12/12/2016.
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ProjetSchema = new Schema({
    titre : {type: String, required: true},
    type :{type:String, required: true},
    description : {type:String},
    etudiants : [Schema.Types.ObjectId]
    //documents : [Schema.Types.ObjectId]
});


module.exports = mongoose.model('Projet', ProjetSchema);
