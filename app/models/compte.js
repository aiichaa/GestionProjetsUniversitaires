/**
 * Created by info on 23/12/2016.
 */
/**
 * Created by InFo on 12/12/2016.
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var CompteSchema = new Schema({
    nom : {type: String, required: true},
    prenom :{type:String, required: true},
    cne: {type:String},
    email:{type:String, required:true, lowercase:true, unique:true},
    telephone:{type:String, required:true},
    motPasse: {type:String, required:true},
    /*image: {type: Schema.Types.Mixed},*/
    role: {type: String, default: 'etudiant'}
    
});

//encrypte the password before saving method
/*CompteSchema.pre('save',function (next) {
 var compte = this;
 bcrypt.hash(compte.motPasse, null, null, function (err, hash) {
 if(err) return next(err);
 compte.motPasse = hash;
 next();
 });
 });*/

//methode for validating the passward
/*
 CompteSchema.methods.comparePassword = function (motPasse) {
 return bcrypt.compareSync(motPasse, this.motPasse);
 };
 */

//fonction sans decryptage
CompteSchema.methods.comparePassword = function (motPasse) {

    if(motPasse == this.motPasse){
        return true;
    }
    else{
        return false;
    }

};

module.exports = mongoose.model('Compte', CompteSchema);
