/**
 * Created by info on 24/12/2016.
 */
angular.module('calendrierControllers',['ui.calendar','rendezvousServices','projetServices'])
    .controller('calendrierCtrl', function (Rendezvous, $scope, $http, uiCalendarConfig, $compile) {

        /*var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();*/


       /* $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];*/


        $scope.events = [];
        //load events from server
       Rendezvous.getRendezVousList().then(function (result) {

            for(var i=0;i<result.data.rendezvousList.length;i++){

                /*console.log("i number : "+ i);
                console.log(result.data.rendezvousList[i]);
                console.log("titre : " + result.data.rendezvousList[i].title);
                console.log("description : " + result.data.rendezvousList[i].description);
                console.log("start : " + result.data.rendezvousList[i].startAt);
                console.log("end: " + result.data.rendezvousList[i].endAt);
                console.log("backgroundColor : " + result.data.rendezvousList[i].color);*/

                $scope.events.push(
                    {
                        id: result.data.rendezvousList[i]._id,
                        title : result.data.rendezvousList[i].title,
                        description : result.data.rendezvousList[i].description,
                        start : new Date(result.data.rendezvousList[i].startAt),
                        end : new Date(result.data.rendezvousList[i].endAt),
                        stick: true,
                        backgroundColor : result.data.rendezvousList[i].color,
                        borderColor : result.data.rendezvousList[i].color

                    }
                );


            }
        });

        //configurer calendar
        $scope.uiConfig = {
            calendar : {
               height : 450,
                editable : true,
                dispatchEventTime : false,

                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                buttonText: {
                    today: 'today',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour'
                },
                editable : false

            }
        };

        $scope.eventSources = [$scope.events];

    });