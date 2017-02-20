/**
 * Created by InFo on 16/12/2016.
 */
var RendezVous = require('../models/rendezvous');

module.exports = function(router){

    //http://localhost:3000/api/rendezVous
    router.post('/rendezvous',function (req,res) {

        var rendezvous = new RendezVous(req.body);
        if(req.body.title== null || req.body.title == ''
            || req.body.startAt== null || req.body.startAt == ''
            || req.body.projet == null || req.body.projet == ''
        ){
            res.json({ success: false, message: 'Vous devez remplir tous les champs !'});
        }else{
            rendezvous.save(function (err) {
                if(err){
                    res.json({ success: false, message: err});
                }else{
                    rendezvous.save(function (err,rendezvous) {
                        if(err){
                            res.send(err);
                        }else{
                            res.json({ success: true, message: 'rendez vous ajouté', rendezvous: rendezvous});
                        }
                    });
                }
            });
        }

    });

    //http://localhost:3000/api/rendezvous
    router.get('/rendezvous',function (req,res) {
        //res.send('testing get all route');
        RendezVous.find(function (err,rendezvous) {
            if(err) throw err;
            if(!rendezvous){
                res.json({success:false, message: 'Aucun rendezvous trouvé'});
            }
            else if(rendezvous){
                res.json({success:true, message: 'liste trouvée', rendezvousList: rendezvous});
            }
        })
    });

    //http://localhost:3000/api/rendezvous/:id
    router.get('/rendezvous/:id',function (req,res) {
        RendezVous.findOne({_id : req.params.id},function (err,rendezvous) {
            if(err) throw err;
            if(!rendezvous){
                res.json({success:false, message: 'Aucun rendezvous trouvé'});
            }
            else if(rendezvous){
                res.json({success:true, message: 'rendezvous trouvé', rendezvous: rendezvous});
            }
        })
    });


    //http://localhost:3000/api/rendezvous/:id
    router.delete('/rendezvous/:id',function (req,res) {
        RendezVous.remove({_id: req.params.id},function (err) {
            if(err){
                res.send(err);
            }else{
                res.json({ success: true, message: 'rendezvous supprimé'});
            }
        })
    });

    //http://localhost:3000/api/rendezvous/:id
    router.put('/rendezvous/:id',function (req,res) {
        var updRendezvous = new RendezVous(req.body);
        var rendezvous = {};

        if(updRendezvous.title){
            rendezvous.title = updRendezvous.title;
        }
        if(updRendezvous.description){
            rendezvous.description = updRendezvous.description;
        }
        if(updRendezvous.startAt){
            rendezvous.startAt = updRendezvous.startAt;
        }
        if(updRendezvous.endAt){
            rendezvous.endAt = updRendezvous.endAt;
        }
        if(updRendezvous.projet){
            rendezvous.projet = updRendezvous.projet;
        }
        if(updRendezvous.color){
            rendezvous.color = updRendezvous.color;
        }

        if(!rendezvous){
            res.json({ success: false, message: 'rendezvous non modifié'});
        }else {
            RendezVous.update({_id : req.params.id},rendezvous,{},function (err, newRendezvous) {
                if(err){
                    res.send(err);
                }else{
                    res.json({ success: true, message: 'rendezvous modifié', newRendezvous : newRendezvous});
                }
            })
        }
    });


    return router;
};