/**
 * Created by info on 24/12/2016.
 */
//console.log('Testing projet ctrl');
/*
angular.module('documentControllers',['documentServices','projetServices'])
    .controller('documentFormCtrl',function ($http, $scope, Document, Projet) {


        //get all project
        Projet.getProjets().then(function (result) {
            $scope.projetsList = result.data.projetsList;
        });


        Document.getDocuments('/api/document').then(function(response){
            //console.log(response.data);
            $scope.uploads = response.data;
        });

        $scope.submit = function(){
            Document.createDocument($scope.upload)
                .then(function (response) {
                    console.log("upload :: ");
                    console.log($scope.upload);

                console.log("response data :: ");
                console.log(response.data);

                $scope.uploads.push(response.data);
                $scope.upload = {};
            })
        }

    });*/

angular.module('documentControllers',['ngFileUpload','projetServices'])
    .controller('documentCtrl', ['$http', 'Upload', '$scope','Projet','$location','$route', function($http, Upload, $scope,Projet,$location,$route){

        app =this;
        //get all project
        Projet.getProjets().then(function (result) {
            $scope.projetsList = result.data.projetsList;
        });


        //get all documents
        $http.get('/api/document').then(function(response){
            //console.log(response.data);
            $scope.uploads = response.data;
        });

        //ajouter un nouveau document
        $scope.submit = function(){
            Upload.upload({
                url: '/api/document',
                method: 'post',
                data: $scope.upload
            }).then(function (response) {
                //console.log(response.data);
                $scope.uploads.push(response.data);
                $scope.upload = {};

                //redirection
                $location.path('/documents');

            });
        };

        //function to delete projet
        $scope.suppDocument = function (idData) {
               //delete document from db
            $http.delete('/api/document/' + idData);
            $route.reload();
        };

        //function to redirect to the update projet with id
        $scope.redirectToUpdate = function (id) {
            $location.path('/documentmodifier/'+ id);
        };
        //function to redirect to the info compte with email
        $scope.redirectToInfo = function (id) {
            $location.path('/documentInfo/'+ id);
        };

    }])
    .controller('infoDocumentCtrl',function ($http,$location,$routeParams,$scope,Projet) {
        //console.log("current id :" + $routeParams.id);
        var id = $routeParams.id;

        $http.get('/api/document/'+ id).then(function(response){
            $scope.document = response.data.document;
            //console.log(response.data.document.projet);
            //get the project of the document
            var idProjet = response.data.document.projet;
            Projet.getProjetById(idProjet).then(function (result) {
                $scope.projet = result.data.projet;
            });

            //get the path to download cuz the path is upload\uid\fileName
            var path = response.data.document.file.path;
            var mySplit = path.split("\\");
            var myPath = mySplit[1];
            //console.log(myPath);
            var downloadPath = 'http://localhost:3000/api/document/'+myPath+'/'+ response.data.document.file.originalname;
            //console.log(downloadPath);
            $scope.downloadPath = downloadPath;

        });

        //function to redirect to list
        $scope.redirectToList = function () {
            $location.path('/documents');
        };

        //function to delete projet
        $scope.suppDocument = function (idData) {
            $http.delete('/api/document/' + idData);
            $location.path('/documents');
        };

        //function to redirect to the update projet with id
        $scope.redirectToUpdate = function (id) {
            $location.path('/documentmodifier/'+ id);
        };

    })
    .controller('modifierDocumentCtrl', ['$http', 'Upload', '$scope','Projet','$location','$route', function($http, Upload, $scope,Projet,$location,$route){

        app =this;
        //get all project
        Projet.getProjets().then(function (result) {
            $scope.projetsList = result.data.projetsList;
        });


        //get all documents
        $http.get('/api/document').then(function(response){
            //console.log(response.data);
            $scope.uploads = response.data;
        });

        //ajouter un nouveau document
        $scope.submit = function(){
            Upload.upload({
                url: '/api/document',
                method: 'post',
                data: $scope.upload
            }).then(function (response) {
                //console.log(response.data);
                $scope.uploads.push(response.data);
                $scope.upload = {};

                //redirection
                $location.path('/documents');

            });
        };

        //function to delete projet
        $scope.suppDocument = function (idData) {
            //delete document from db
            $http.delete('/api/document/' + idData);
            $route.reload();
        };

        //function to redirect to the update projet with id
        $scope.redirectToUpdate = function (id) {
            $location.path('/documentmodifier/'+ id);
        };
        //function to redirect to the info compte with email
        $scope.redirectToInfo = function (id) {
            $location.path('/documentInfo/'+ id);
        };

    }]);

