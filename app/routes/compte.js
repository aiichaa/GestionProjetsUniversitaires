/**
 * Created by InFo on 16/12/2016.
 */
var Compte = require('../models/compte');
var jwt = require('jsonwebtoken');
var secret = 'HappyCutePotato';

module.exports = function(router){

    //Add a new Compte
    //http://localhost:3000/api/compte
    router.post('/compte',function (req,res) {
        //res.send('testing add route');
        var compte = new Compte(req.body);

        if(req.body.nom == null || req.body.nom == ''
            || req.body.prenom == null || req.body.prenom == ''
            //|| req.body.cne == null || req.body.cne == ''
            || req.body.email == null || req.body.email == ''
            || req.body.telephone == null || req.body.telephone == ''
            || req.body.motPasse == null || req.body.motPasse == ''
        ){
            res.json({ success: false, message: 'Vous devez remplir tous les champs !'});
        }else{
            compte.save(function (err) {
                if(err){
                    res.json({ success: false, message: 'Email existe deja !'});
                }else{
                    compte.save(function (err,compte) {
                        if(err){
                            res.send(err);
                        }else{
                            res.json({ success: true, message: 'compte ajouté', compte: compte});
                        }
                    });
                }
            });
        }


    });

    //Get All Comptes
    //http://localhost:3000/api/comptes
    router.get('/comptes',function (req,res) {
        //res.send('testing get all route');
        Compte.find(function (err,comptes) {
            if(err) throw err;
            if(!comptes){
                res.json({success:false, message: 'Aucun compte trouvé'});
            }
            else if(comptes){
                res.json({success:true, message: 'liste trouvée', comptesList: comptes});
            }
        })
    });

    //Get Compte by email
    //http://localhost:3000/api/compte/:email
    router.get('/compte/:email',function (req,res) {
        //res.send('testing get all route');
        Compte.findOne({email : req.params.email},function (err,compte) {
            if(err) throw err;
            if(!compte){
                res.json({success:false, message: 'Aucun compte trouvé'});
            }
            else if(compte){
                res.json({success:true, message: 'compte trouvé', compte: compte});
            }
        })
    });
    //Get Compte by id
    //http://localhost:3000/api/compte/:id
    router.get('/compteById/:id',function (req,res) {
        //res.send('testing get all route');
        Compte.findOne({_id : req.params.id},function (err,compte) {
            if(err) throw err;
            if(!compte){
                res.json({success:false, message: 'Aucun compte trouvé'});
            }
            else if(compte){
                res.json({success:true, message: 'compte trouvé', compte: compte});
            }
        })
    });


    //Delete a Compte
    //http://localhost:3000/api/compte/:email
    router.delete('/compte/:email',function (req,res) {
        Compte.remove({email: req.params.email},function (err) {
            if(err){
                res.send(err);
            }else{
                res.json({ success: true, message: 'compte supprimé'});
            }
        })
    });

    //Update a Compte
    //http://localhost:3000/api/compte/:email
    router.put('/compte/:email',function (req,res) {
        //res.send('testing update route');
        var updCompte = new Compte(req.body);
        //un compte sans id avec le quel on va modifier dans la base de donnees
        var compte = {};

        if(updCompte.nom){
            compte.nom = updCompte.nom;
        }
        if(updCompte.prenom){
            compte.prenom = updCompte.prenom;
        }
        if(updCompte.cne){
            compte.cne = updCompte.cne;
        }
        if(updCompte.email){
            compte.email = updCompte.email;
        }
        if(updCompte.telephone){
            compte.telephone = updCompte.telephone;
        }
        if(updCompte.motPasse){
            compte.motPasse = updCompte.motPasse;
        }
        if(updCompte.role){
            compte.role = updCompte.role;
        }
        if(!compte){
            res.json({ success: false, message: 'compte non modifié'});
        }else {
            Compte.update({email : req.params.email},compte,{},function (err, newCompte) {
                if(err){
                    res.send(err);
                }else{
                    res.json({ success: true, message: 'compte modifié', newCompte : newCompte});
                }
            })
        }
    });


    //compt login route
    //http://localhost:3000/api/compte/login
    router.post('/compte/login',function (req, res) {
        Compte.findOne({email: req.body.email }).select('email motPasse nom prenom cne telephone role').exec(function (err,compte) {
            if(err) throw err;
            if(!compte){
                res.json({success: false, message: 'compte non authentifié'});
            }else if(compte){
                if(req.body.motPasse){
                    var validPassword =  compte.comparePassword(req.body.motPasse);
                }else{
                    res.json({success: false, message: 'Aucun mot de passe inseré'});
                }
                if(!validPassword){
                    res.json({success:false, message: 'mot de passe non authentifié'});
                }else{
                    //user authenticated
                    //the data we wanna save in the token
                    var token = jwt.sign({
                        id: compte.id,
                        nom : compte.nom,
                        prenom : compte.prenom,
                        cne : compte.cne,
                        email : compte.email,
                        telephone : compte.telephone,
                        role : compte.role
                        }, secret, {expiresIn : '24h'});
                    res.json({success:true, message: 'compte authentifié', token: token});
                }
            }

        });
    });

    //we need to decrypte the token so we can use it in the /profile route to get the current user
    //to do so we'll use a middleware
   router.use(function (req,res,next) {
        //we can get the token from :
        // the request : req.body.token
        // the url : req.body.query
        // the headers : req.headers['x-access-token']
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            //verify token
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    res.json({success : false, message :'Token non valide'});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });

        }else{
            res.json({success : false, message: 'token non inseré'});
        }
    });

    //current user
    //http://localhost:3000/api/compte/profile
    router.post('/compte/profile', function (req,res) {
        //res.send('testing me route');
        res.send(req.decoded);
    });

    return router;
};