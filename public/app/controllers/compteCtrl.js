/**
 * Created by info on 24/12/2016.
 */
//console.log('Testing compte ctrl');
angular.module('compteControllers', ['compteServices'])
       .controller('ajoutCompteCtrl', function ($http, $location, $timeout, Compte) {
           var app = this;
           
           app.ajoutCompte = function (ajoutData) {
               app.loading = true;
               app.errorMsg = false;

               //we connect it to the back end of the application
               Compte.createCompte(app.ajoutData).then(function (data) {
                   if(data.data.success){
                       //create success message
                       app.loading = false;
                       app.successMsg = data.data.message + '...Redirection';
                       //Redirect to show compte
                       $timeout(function () {
                           $location.path('/etudiants');
                           //$location.path('/etudiantInfo/'+ app.ajoutData.email);
                           //console.log($location.path('/etudiantInfo/'+app.ajoutData.email));
                       }, 2000);
                   }else{
                       //create an error message
                       app.loading = false;
                       app.errorMsg = data.data.message;
                   }
               });
           };

       })
    .controller('comptesCtrl',function (Compte,$scope,$route,$location) {

        app = this;
           Compte.getComptes().then(function (result) {
               var comptesList = new Array();
               for(var i=0; i<result.data.comptesList.length;i++) {
                   if (result.data.comptesList[i].role == "etudiant") {
                       comptesList.push(result.data.comptesList[i]);
                   }
               }
               //var comptesList = result.data.comptesList;
               $scope.comptesList = comptesList;
           });

        //function to delete a compte
        $scope.suppCompte = function (emailData) {
            Compte.deleteCompte(emailData).then(function (data) {
                if(data.data.success){
                    console.log("compte supprime");
                        //relaod the page
                        $route.reload();
                }else{
                    console.log("compte non supprime");
                }
             });

        };

        //function to redirect to the update compte with email
        $scope.redirectToUpdate = function (email) {
            $location.path('/etudiantmodifier/'+ email);
        };
        //function to redirect to the info compte with email
        $scope.redirectToInfo = function (email) {
            $location.path('/etudiantInfo/'+ email);
        };

    })
    .controller('infoCompteCtrl',function (Compte,$location,$routeParams,$scope) {
        //console.log("current email :" + $routeParams.email);
        var email = $routeParams.email;
        Compte.getCompleByEmail(email).then(function (result) {
            if(result.data.success){
                $scope.compteInfo = result.data.compte;
                console.log(result.data.message);
            }else{
                console.log(result.data.message);
            }
        });

        //function to delete a compte
        $scope.suppCompte = function (emailData) {
            Compte.deleteCompte(emailData).then(function (data) {
                if(data.data.success){
                    console.log("compte supprime");
                    $location.path('/etudiants');
                }else{
                    console.log("compte non supprime");
                }
            });

        };

     //function to redirect to list
        $scope.redirectToList = function () {
            $location.path('/etudiants');
        };

        //function to redirect to the update compte with email
        $scope.redirectToUpdate = function (email) {
            $location.path('/etudiantmodifier/'+ email);
        };

    })
    .controller('modifierCompteCtrl',function (Compte,$location,$routeParams,$scope,$timeout) {
        //get compte old infos
        var email = $routeParams.email;
        Compte.getCompleByEmail(email).then(function (result) {
            if(result.data.success){
                $scope.compteInfo = result.data.compte;
                console.log(result.data.message);
            }else{
                console.log(result.data.message);
            }
        });

        //modifier
        var app = this;

        app.modifierCompte = function () {
            app.loading = true;
            app.errorMsg = false;

            //we connect it to the back end of the application
            Compte.updateCompte(email,app.modifierData).then(function (data) {
                if(data.data.success){
                    //create success message
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    //Redirect to show compte
                    $timeout(function () {
                        $location.path('/etudiants');
                        //$location.path('/etudiantInfo/'+ app.ajoutData.email);
                        //console.log($location.path('/etudiantInfo/'+app.ajoutData.email));
                    }, 2000);
                }else{
                    //create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };


    });


