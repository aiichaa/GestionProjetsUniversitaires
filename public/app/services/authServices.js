/**
 * Created by InFo on 18/12/2016.
 */
//console.log('testing authService');
angular.module('authServices',[])
 .factory('Auth', function ($http, AuthToken) {
    var authFactory = {};

    authFactory.login = function (loginData) {
        return $http.post('/api/compte/login', loginData)
            .then(function (data) {
                //console.log(data.data);
                AuthToken.setToken(data.data.token);
                return data;
            });
    };

     //a function that tells us if the user is logged in
     //this function will be used this way : Auth.isLoggedIn();
     authFactory.isLoggedIn = function () {

         if(AuthToken.getToken()){
             return true;
         }else{
             return false;
         }
     };

     //a function de get the token
     //this fuction will be user this way : Auth.getUser();
     authFactory.getUser = function () {
         if(AuthToken.getToken()){
             return $http.post('/api/compte/profile');
         }else {
             //reject the request
             $q.reject({message : 'utilisateur n\'a pas de token'});
         }
     };

     //log out function to destroy the token
     //it's gonna be called this way : Auth.logout
     authFactory.logout = function () {
         AuthToken.setToken();
     };

    return authFactory;
})

    .factory('AuthToken',function ($window) {
        var authTokenFactory = {};

        //this function save the token into the local storage of the browser
        //and it's going to be like this : AuthToken.setToken(token)
        authTokenFactory.setToken = function (token) {
            if(token){
                $window.localStorage.setItem('token', token);
            }else{
                $window.localStorage.removeItem('token');
            }
        };

        //to test the token we use a get token function
        //it's going to be like this : AuthToken.getToken();
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })

    //connect token to every request
    .factory('AuthInterceptores', function (AuthToken) {
        var authInterceptorsFactory = {};
        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();

            //asign token to the headers
            if(token) config.headers['x-access-token'] = token;

            return config;
        };

        return authInterceptorsFactory;
    });

