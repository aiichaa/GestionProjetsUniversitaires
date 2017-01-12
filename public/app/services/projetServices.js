/**
 * Created by info on 24/12/2016.
 */

angular.module('projetServices',[])
    .factory('Projet', function ($http) {

        return{

            //create a projet
            createProjet : function (ajoutData) {
                return $http.post('/api/projet',ajoutData);
            },

            //get projet by id
            getProjetById : function (idData) {
                return $http.get('/api/projet/' + idData);
            },

            //get all projets
            getProjets : function () {
                return $http.get('/api/projets');
            },

            //delete a projet
            deleteProjet : function (idData) {
                return  $http.delete('/api/projet/' + idData);
            },

            //update a projet
            updateProjet : function (idData, modifierData) {
                return $http.put('/api/projet/' + idData , modifierData);
            },

            //get documents in a project
            getDocumentsInProject : function (projetId) {
                return $http.get('/api/documentsProjet/' + projetId);
            }
        }

    });

