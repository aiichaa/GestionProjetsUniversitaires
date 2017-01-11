/**
 * Created by InFo on 18/12/2016.
 */
//console.log('testing the main controller');

angular.module('mainController',['authServices'])

    .controller('mainCtrl', function (Auth,  $location, $timeout, $rootScope) {
        var app = this;

        //so we wait for data before loading the html
        app.loadme = false;

        $rootScope.$on('$routeChangeStart', function () {

            //we check if the user is logged in
            if(Auth.isLoggedIn()){
                //console.log('Success : user is logged in');
                //a variable we gonna use in view to hide some things once the user is logged in
                app.isLoggedIn = true;
                Auth.getUser().then(function (data) {
                    //console.log(data);
                    //console.log(data.data.username);
                    app.id = data.data.id;
                    app.nom = data.data.nom;
                    app.prenom = data.data.prenom;
                    app.email = data.data.email;
                    app.telephone = data.data.telephone;
                    app.role = data.data.role;
                    app.loadme = true;
                });
            }else{
                //console.log('Failure : user is not logged in');
                app.isLoggedIn = false;
                app.loadme = true;
            }

        });

        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMsg = false;
            //we connect it to the back end of our application
            Auth.login(app.loginData).then(function (data) {
                if(data.data.success){
                    //Create Success Message
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirection';
                    //Redirect to home page
                    $timeout(function () {
                        $location.path('/tableaubord');
                        app.loginData = '';
                        app.successMsg = false;

                    }, 2000);
                }else{
                    //Create an error message
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000);

        };

        this.isProf = function () {
            if(app.role=='professeur'){
                //console.log(app.role);
                //console.log('je suis prof');
                return true;
            }else{
                //console.log(app.role);
                //console.log('je ne suis pas prof je suis etudiant');
                return false;
            }
        };

    });
