
var Rendezvousnotification = require('../models/rendezvousnotification');


module.exports = function(router){


    //http://localhost:3000/api/rendezvousnotification
    router.post('/rendezvousnotification',function (req,res) {

        var rendezvousnotification = new Rendezvousnotification(req.body);

            rendezvousnotification.save(function (err,rendezvousnotification) {
                        if(err){
                            res.send(err);
                        }else{
                            res.json({ success: true, message: 'rendezvousnotification ajoutée', rendezvousnotification: rendezvousnotification});
                        }
                    });
    });

    //http://localhost:3000/api/rendezvousnotification
    router.get('/rendezvousnotifications',function (req,res) {
        //res.send('testing get all route');
        Rendezvousnotification.find(function (err,rendezvousnotifications) {
            if(err) throw err;
            if(rendezvousnotifications.length == 0){
                res.json({success:false, message: 'Aucune rendezvousnotifications trouvée'});
            }
            else if(rendezvousnotifications){
                res.json({success:true, message: 'liste trouvée', rendezvousnotificationList: rendezvousnotifications});
            }
        })
    });



    router.put('/rendezvousnotification/:id',function (req,res) {
        //res.send('testing update route');
        var updrendezvousnotification = new Rendezvousnotification(req.body);
        var rendezvousnotification = {};

        console.log(req.body);
        if(updrendezvousnotification.vue){
            rendezvousnotification.vue = updrendezvousnotification.vue;
        }

        if(!rendezvousnotification){
            res.json({ success: false, message: 'rendezvousnotification non modifié'});
        }else {
            Rendezvousnotification.update({_id : req.params.id},rendezvousnotification,{},function (err, newRendezvousnotification) {
                if(err){
                    res.send(err);
                }else{
                    res.json({ success: true, message: 'rendezvousnotification modifiée', newRendezvousnotification : newRendezvousnotification});
                }
            })
        }
    });

    return router;
};