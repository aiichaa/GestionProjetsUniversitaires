/**
 * Created by info on 24/12/2016.
 */
//console.log('Testing projet ctrl');
angular.module('projetControllers', ['projetServices','compteServices'])
    .controller('ajoutProjetCtrl', function ($http, $location, $timeout, Projet, Compte, $scope) {

        //recupere la liste des etudiants pour le formulaire
        app = this;
        Compte.getComptes().then(function (result) {
            var comptesList = new Array();
            for(var i=0; i<result.data.comptesList.length;i++) {
                if (result.data.comptesList[i].role == "etudiant") {
                    comptesList.push(result.data.comptesList[i]);
                }
            }

            $scope.comptesList = comptesList;
        });


        app.ajoutProjet = function () {
            app.loading = true;
            app.errorMsg = false;
            console.log(app.ajoutData);
            //we connect it to the back end of the application
            Projet.createProjet(app.ajoutData).then(function (data) {
                if(data.data.success){
                    //create success message
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    //Redirect to show projet
                    $timeout(function () {
                        $location.path('/projets');
                    }, 2000);
                }else{
                    //create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };

    })
    .controller('projetsCtrl',function ($scope,$route,$location,Projet) {

        Projet.getProjets().then(function (result) {
            //console.log(result.data.projetsList);
            $scope.projetsList = result.data.projetsList;
        });

        //function to delete projet
        $scope.suppProjet = function (idData) {
            Projet.deleteProjet(idData).then(function (data) {
                if(data.data.success){
                    console.log("projet supprime");
                    //relaod the page
                    $route.reload();
                }else{
                    console.log("projet non supprime");
                }
            });

        };

        //function to redirect to the update projet with id
        $scope.redirectToUpdate = function (id) {
            $location.path('/projetmodifier/'+ id);
        };
        //function to redirect to the info compte with email
        $scope.redirectToInfo = function (id) {
            $location.path('/projetInfo/'+ id);
        };


    })
    .controller('infoProjetCtrl',function (Compte,Projet,$location,$routeParams,$scope,$http) {
        //console.log("current id :" + $routeParams.id);
        var id = $routeParams.id;
        var listEtudiants = Array();
        Projet.getProjetById(id).then(function (result) {
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
     //////////////////////////////////////////////////////////////////////////////////////////////
        //get documents in a project
        Projet.getDocumentsInProject(id).then(function (res) {
            $scope.documents = res.data.documents;
            //console.log(id);
            //console.log(res.data.documents);
        });
        $scope.redirectToInfoDocument = function (idDocument) {
            $location.path('/documentInfo/'+ idDocument);
        };


        //function to delete projet
        $scope.suppProjet = function (idData) {
            Projet.deleteProjet(idData).then(function (data) {
                if(data.data.success){
                    console.log("projet supprime");
                    //relaod the page
                    $location.path('/projets');
                }else{
                    console.log("projet non supprime");
                }
            });

        };

        //function to redirect to list
        $scope.redirectToList = function () {
            $location.path('/projets');
        };

        //function to redirect to the update projet with id
        $scope.redirectToUpdate = function (id) {
            $location.path('/projetmodifier/'+ id);
        };

    })
    .controller('modifierProjetCtrl',function (Projet,Compte,$location,$routeParams,$scope,$timeout) {

        //get list des etudiants
        Compte.getComptes().then(function (result) {
            var comptesList = new Array();
            for(var i=0; i<result.data.comptesList.length;i++) {
                if (result.data.comptesList[i].role == "etudiant") {
                    comptesList.push(result.data.comptesList[i]);
                }
            }

            $scope.comptesList = comptesList;
        });

        //get compte old infos
        var id = $routeParams.id;

        Projet.getProjetById(id).then(function (result) {
            if(result.data.success){
                $scope.projetInfo = result.data.projet;
                console.log(result.data.message);
            }else{
                console.log(result.data.message);
            }
        });

        //modifier
        var app = this;

        app.modifierProjet = function () {
            app.loading = true;
            app.errorMsg = false;

            Projet.updateProjet(id, app.modifierData).then(function (data) {
                if(data.data.success){
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    $timeout(function () {
                        $location.path('/projets');
                    }, 2000);
                }else{
                    //create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };

    });
