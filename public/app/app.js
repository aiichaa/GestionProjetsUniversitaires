/**
 * Created by info on 23/12/2016.
 */
//console.log('Testing main app configuration');
angular.module('gestionprojets',['appRoutes', 'ngAnimate','mainController','authServices','compteControllers','compteServices','projetControllers','projetServices','documentControllers'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptores');
    });