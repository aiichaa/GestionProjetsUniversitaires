/**
 * Created by info on 24/12/2016.
 */
//console.log('Testing compte service');
/*
angular.module('compteServices', []).config(function(){
    console.log('testing compteServices');
});*/

angular.module('compteServices',[])
    .factory('Compte', function ($http) {

        return{

            //create a compte
            createCompte : function (ajoutData) {
                return $http.post('/api/compte',ajoutData);
            },

            //get compte by email
            getCompleByEmail : function (emailData) {
                return $http.get('/api/compte/' + emailData);
            },

            //get compte by id
            getCompleById : function (idData) {
                return $http.get('/api/compteById/' + idData);
            },

            //get all compte
            getComptes : function () {
                 return $http.get('/api/comptes');
            },

            //delete a compte
            deleteCompte : function (emailData) {
                 return  $http.delete('/api/compte/' + emailData);
            },

            //update a compte
            updateCompte : function (emailData, modifierData) {
                return $http.put('/api/compte/' + emailData, modifierData);
            }
        }

    });

