/**
 * Created by info on 24/12/2016.
 */

angular.module('rendezvousServices',[])
    .factory('Rendezvous', function ($http) {

        return{
            createRendezvous: function (ajoutData) {
                return $http.post('/api/rendezvous',ajoutData);
            },

            getRendezVousById : function (idData) {
                return $http.get('/api/rendezvous/' + idData);
            },

            getRendezVousList : function () {
                return $http.get('/api/rendezvous');
            },

            deleteRendezVous : function (idData) {
                return  $http.delete('/api/rendezvous/' + idData);
            },

            updateRendezVous : function (idData, modifierData) {
                return $http.put('/api/rendezvous/' + idData , modifierData);
            }
        }

    });

