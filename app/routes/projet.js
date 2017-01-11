/**
 * Created by InFo on 16/12/2016.
 */
var Projet = require('../models/projet');

module.exports = function(router){

    //Add a new Projet
    //http://localhost:3000/api/projet
    router.post('/projet',function (req,res) {
        //res.send('testing add route');
        var projet = new Projet(req.body);

        if(req.body.titre == null || req.body.titre == ''
            || req.body.type == null || req.body.type == ''
            || req.body.description == null || req.body.description == ''
            || req.body.etudiants == null || req.body.etudiants == ''
        ){
            res.json({ success: false, message: 'Vous devez remplir tous les champs !'});
        }else{
            projet.save(function (err) {
                if(err){
                    res.json({ success: false, message: err});
                }else{
                    projet.save(function (err,projet) {
                        if(err){
                            res.send(err);
                        }else{
                            res.json({ success: true, message: 'projet ajouté', projet: projet});
                        }
                    });
                }
            });
        }


    });

    //Get All Projets
    //http://localhost:3000/api/projets
    router.get('/projets',function (req,res) {
        //res.send('testing get all route');
        Projet.find(function (err,projets) {
            if(err) throw err;
            if(!projets){
                res.json({success:false, message: 'Aucun projet trouvé'});
            }
            else if(projets){
                res.json({success:true, message: 'liste trouvée', projetsList: projets});
            }
        });
    });

    //Get Projet by id
    //http://localhost:3000/api/projet/:id
    router.get('/projet/:id',function (req,res) {
        //res.send('testing get all route');
        Projet.findOne({_id : req.params.id},function (err,projet) {
            if(err) throw err;
            if(!projet){
                res.json({success:false, message: 'Aucun projet trouvé'});
            }
            else if(projet){
                res.json({success:true, message: 'projet trouvé', projet: projet});
            }
        })
    });


    //Delete a Projet
    //http://localhost:3000/api/projet/:id
    router.delete('/projet/:id',function (req,res) {
        Projet.remove({_id : req.params.id},function (err) {
            if(err){
                res.send(err);
            }else{
                res.json({ success: true, message: 'projet supprimé'});
            }
        })
    });

    //Update a Projet
    //http://localhost:3000/api/projet/:id
    router.put('/projet/:id',function (req,res) {
        //res.send('testing update route');
        var updProjet = new Projet(req.body);
        var projet = {};

        if(updProjet.titre){
            projet.titre = updProjet.titre;
        }
        if(updProjet.type){
            projet.type = updProjet.type;
        }
        if(updProjet.description){
            projet.description = updProjet.description;
        }
        if(updProjet.etudiants){
            projet.etudiants = updProjet.etudiants;
        }
       /* if(updProjet.documents){
            projet.documents = updProjet.documents;
        }*/


        if(!projet){
            res.json({ success: false, message: 'projet non modifié'});
        }else {
            Projet.update({_id : req.params.id},projet,{},function (err, newProjet) {
                if(err){
                    res.send(err);
                }else{
                    res.json({ success: true, message: 'projet modifié', newProjet : newProjet});
                }
            })
        }
    });



    return router;
};