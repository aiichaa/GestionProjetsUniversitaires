/**
 * Created by info on 15/01/2017.
 */
//rendezvousnotificationServices

angular.module('rendezvousnotificationServices',[])
    .factory('Rendezvousnotification', function ($http) {

        return{
            createRendezvousnotification: function (ajoutData) {
                return $http.post('/api/rendezvousnotification',ajoutData);
            },

            getRendezvousnotificationList : function () {
                return $http.get('/api/rendezvousnotifications');
            },

            updateRendezvousnotification : function (idData, modifierData) {
                return $http.put('/api/rendezvousnotifications/' + idData , modifierData);
            }
        }

    });
