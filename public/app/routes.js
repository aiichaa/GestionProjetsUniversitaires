/**
 * Created by info on 23/12/2016.
 */
//console.log('Testing route file');
angular.module('appRoutes',['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/accueil.html'
            })


            //Paths for user
            .when('/login',{
                templateUrl: 'app/views/user/login.html'
            })
            .when('/logout',{
                templateUrl: 'app/views/user/logout.html'
            })
            .when('/profile',{
                templateUrl: 'app/views/user/profile.html'
            })
            .when('/tableaubord',{
                templateUrl: 'app/views/tableauBord/accueil.html'
            })


            //Paths for etudiant
            .when('/etudiantajout',{
                templateUrl: 'app/views/tableauBord/etudiant/etudiantAjout.html',
                controller: 'ajoutCompteCtrl',
                controllerAs: 'ajouter'
            })
            .when('/etudiantInfo/:email',{
                templateUrl: '/app/views/tableauBord/etudiant/etudiantInfo.html',
                controller: 'infoCompteCtrl'
            })
            .when('/etudiants',{
                templateUrl: 'app/views/tableauBord/etudiant/etudiants.html',
                controller: 'comptesCtrl'
            })
            .when('/etudiantmodifier/:email',{
                templateUrl: '/app/views/tableauBord/etudiant/etudiantModifier.html',
                controller: 'modifierCompteCtrl',
                controllerAs: 'modifier'
            })


            //Paths for projet
            .when('/projetajout',{
                templateUrl: 'app/views/tableauBord/projet/projetAjout.html',
                controller: 'ajoutProjetCtrl',
                controllerAs: 'ajouter'
            })
            .when('/projets',{
                templateUrl: 'app/views/tableauBord/projet/projets.html',
                controller: 'projetsCtrl'
            })
            .when('/projetInfo/:id',{
                templateUrl: '/app/views/tableauBord/projet/projetInfo.html',
                controller: 'infoProjetCtrl'
            })
            .when('/projetmodifier/:id',{
                templateUrl: '/app/views/tableauBord/projet/projetModifier.html',
                controller: 'modifierProjetCtrl',
                controllerAs: 'modifier'
            })

            //Paths for document
            .when('/documentajout',{
                templateUrl: 'app/views/tableauBord/document/documentAjout.html',
                controller: 'documentCtrl'
            })
            .when('/documents',{
                templateUrl: 'app/views/tableauBord/document/documents.html',
                controller: 'documentCtrl'
            })
            .when('/documentInfo/:id',{
                templateUrl: '/app/views/tableauBord/document/documentInfo.html',
                controller: 'infoDocumentCtrl'
            })
            .when('/documentmodifier/:id',{
                templateUrl: '/app/views/tableauBord/document/documentModifier.html',
                controller: 'modifierDocumentCtrl'
            })
            .when('/calendrier',{
                templateUrl: 'app/views/tableauBord/calendrier/calendrier.html'
            })
            //Paths for calendar
            
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });