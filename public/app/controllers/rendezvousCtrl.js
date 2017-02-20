/**
 * Created by info on 24/12/2016.
 */
//console.log('Testing projet ctrl');
angular.module('rendezvousControllers', ['rendezvousServices','projetServices','compteServices','moment-picker','rendezvousnotificationServices'])
    .controller('ajoutRendezvousCtrl', function ($http, $location, $timeout, Projet, Compte, $scope, Rendezvous, Rendezvousnotification) {
        app = this;
        
        //recuperer la liste des projets pour le formulaire
        Projet.getProjets().then(function (result) {
            $scope.projetsList = result.data.projetsList;
        });

        app.ajoutRendezvous = function () {
            app.loading = true;
            app.errorMsg = false;
            //console.log(app.ajoutData);
            Rendezvous.createRendezvous(app.ajoutData).then(function (data) {
                if(data.data.success){
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    //Redirect to show projet

                    //creer une notification pour ce rendez vous
                    var rendvnotifData = {};
                    rendvnotifData.date = new Date();
                    rendvnotifData.rendezvous = data.data.rendezvous._id;
                    rendvnotifData.vue = false;
                    console.log(rendvnotifData);
                    Rendezvousnotification.createRendezvousnotification(rendvnotifData).then(function (data) {
                        if(data.data.success){
                           console.log("notification added");
                        }else{
                            console.log("notification Not added");
                        }
                    });


                    $timeout(function () {
                        $location.path('/rendezvouslist');
                    }, 2000);
                }else{
                    //create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });


        };


    })
    .controller('rendezvousListCtrl',function (Rendezvous,$scope,$route,$location) {

        app = this;
        Rendezvous.getRendezVousList().then(function (result) {
            $scope.rendezvousList = result.data.rendezvousList;
        });

        $scope.suppRendezvous = function (idData) {
            Rendezvous.deleteRendezVous(idData).then(function (data) {
                if(data.data.success){
                    console.log("Rendez supprime");
                    $route.reload();
                }else{
                    console.log("Rendez vous non supprime");
                }
            });

        };

        //function to redirect to the update compte with email
        $scope.redirectToUpdate = function (id) {
            $location.path('/rendezvousmodifier/'+ id);
        };
        //function to redirect to the info compte with email
        $scope.redirectToInfo = function (id) {
            $location.path('/rendezvousInfo/'+ id);
        };

    })
    .controller('infoRendezvousCtrl',function (Rendezvous,$location,$routeParams,$scope,Projet,Compte) {
        var id = $routeParams.id;

        Rendezvous.getRendezVousById(id).then(function (result) {
            if(result.data.success){
                //recupere le projet de ce rendez vous
                var idProjet = result.data.rendezvous.projet;

                var listEtudiants = Array();
                Projet.getProjetById(idProjet).then(function (result) {
                    if(result.data.success){
                        //get les etudiants de ce projet
                        for(var i=0;i<result.data.projet.etudiants.length;i++){
                            Compte.getCompleById(result.data.projet.etudiants[i]).then(function (result) {
                                listEtudiants.push(result.data.compte);
                            });
                        }
                        $scope.listEtudiants = listEtudiants;
                        $scope.projetInfo = result.data.projet;

                        console.log(result.data.message);
                    }else{
                        console.log(result.data.message);
                    }
                });
                $scope.rendezvousInfo = result.data.rendezvous;
                console.log(result.data.message);
            }else{
                console.log(result.data.message);
            }
        });


        $scope.suppRendezvous = function (idData) {
            Rendezvous.deleteRendezVous(idData).then(function (data) {
                if(data.data.success){
                    console.log("Rendez supprime");
                    $location.path('/rendezvouslist');
                }
                else{
                    console.log("Rendez vous non supprime");
                }
            });

        };

        //function to redirect to list
        $scope.redirectToList = function () {
            $location.path('/rendezvouslist');
        };

        $scope.redirectToUpdate = function (id) {
            $location.path('/rendezvousmodifier/' + id);
        };




    })
    .controller('modifierRendezvousCtrl',function (Rendezvous,$location,$routeParams,$scope,$timeout,Projet) {

        var id = $routeParams.id;
        app = this;

        //recuperer la liste des projets pour le formulaire
        Projet.getProjets().then(function (result) {
            $scope.projetsList = result.data.projetsList;
        });

        Rendezvous.getRendezVousById(id).then(function (result) {
            if(result.data.success){
                //recupere le projet de ce rendez vous
                var idProjet = result.data.rendezvous.projet;
                Projet.getProjetById(idProjet).then(function (result) {
                    if(result.data.success){
                        $scope.projetInfo = result.data.projet;
                        console.log(result.data.message);
                    }else{
                        console.log(result.data.message);
                    }
                });
                $scope.rendezvousInfo = result.data.rendezvous;
                //console.log(result.data.rendezvous);
                console.log(result.data.message);
            }else{
                console.log(result.data.message);
            }
        });


        //modifier
        app.modifierrendezvous = function () {
            app.loading = true;
            app.errorMsg = false;
            //console.log(app.modifierData);
            Rendezvous.updateRendezVous(id, app.modifierData).then(function (data) {
                if(data.data.success){
                    //create success message
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    $timeout(function () {
                        $location.path('/rendezvouslist');
                    }, 2000);
                }else{
                    //create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };

    });
