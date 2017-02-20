/**
 * Created by info on 15/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var RendezvousnotificationSchema = new Schema({
    rendezvous : Schema.Types.ObjectId,
    date : {type: Date, default: Date.now},
    vue : {type: Boolean, default: false}
});


module.exports = mongoose.model('Rendezvousnotification', RendezvousnotificationSchema);

