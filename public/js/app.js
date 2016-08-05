// app initializing code for app.
// author: Sharad Biradar

// ensure our namespace
if (!this.shoppingbag) {
    this.shoppingbag = {};
}

if (!this.shoppingbag.app) {
    this.shoppingbag.app = {};
}

if (!this.shoppingbag.app.promise) {
    this.shoppingbag.app.promise = {};
}

(function (shoppingbag, $) {
    var body = $('body');
    var mainContainer = $(body).find('.content-wrapper section.content');

    //Load these scopes from the databaase.
    shoppingbag.app.possibleStates = ['login','home','cart','pagenotfound','logout'];
    shoppingbag.app.previousHash = '';

    shoppingbag.app.globalAjaxSetup = function(){
        //all the requests content/payload is json
        //We are sending json type payload throught the application.
        $.ajaxSetup({
            contentType: 'application/json'
        });

        //Set Authorization for each request made in future globally.
        var setGlobalAuthenticationHeader = function(payload) {
            $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
                var token = localStorage.getItem("auth-token");
                var userDetails = localStorage.getItem("user-details");
                if(token){
                    jqXHR.setRequestHeader("Authorization", 'Bearer ' +token);
                    jqXHR.setRequestHeader("userData", userDetails);
                }
            });
        }();
    }();

    shoppingbag.app.setupStartingPage = function(){
        var authToken =  shoppingbag.app.getLocalStorage('auth-token');
        if(authToken){
            window.location.href = "index.html";
        }
    };

    shoppingbag.app.getLocalStorage = function(key){
        return localStorage.getItem(key);
    };

    shoppingbag.app.setLocalStorage = function(key, value){
        localStorage.setItem(key, value);
    };

    shoppingbag.app.init = function() {
        var authToken =  shoppingbag.app.getLocalStorage('auth-token');
        authToken = "j&*#.dfjkk.jdg123";
        var initialState = shoppingbag.app.getState() || "home"; //intentionally making default state as home othrwise login
        if (initialState && shoppingbag.app.possibleStates.indexOf(initialState) >=0) {
            initialState = 'home';
            shoppingbag.app.setPreviousHash('home');
            shoppingbag.app.setState('home');
            shoppingbag.app.setUpUI(); 
        } else {
            initialState = 'login';
            shoppingbag.app.setPreviousHash('login');
            shoppingbag.app.setState('login');
        }
        //For further hash routing.
        $(window).on("hashchange", function (event) {
            var previousState = shoppingbag.app.getPreviousHash();
            var scope = shoppingbag.app.getState();
            var authToken =  shoppingbag.app.getLocalStorage('auth-token');
            authToken = "j&*#.dfjkk.jdg123";
            if(authToken){
                if (scope && shoppingbag.app.possibleStates.indexOf(scope) >= 0) {
                    if(shoppingbag.app.previousHash !== scope){
                        shoppingbag.app.routes.routeMap[previousState].destroy(previousState);
                    }
                    shoppingbag.app.setPreviousHash(scope);
                    shoppingbag.app.routes.routeMap[scope].create(scope);
                } else {
                    //module doesnot exists or you do not have permissions
                    shoppingbag.app.routes.routeMap[previousState].destroy(previousState);
                    scope = 'pagenotfound';
                    shoppingbag.app.setPreviousHash(scope);
                    shoppingbag.app.routes.routeMap[scope].create(scope);
                }
            }else{
                scope = "login";
                shoppingbag.app.setPreviousHash(scope);
                shoppingbag.app.routes.routeMap[scope].create(scope);
            }
        }).trigger('hashchange');
        //shoppingbag.app.setUpUI();
    };

    shoppingbag.app.setUpUI = function(){
        shoppingbag.app.showheader();
        shoppingbag.app.showFooter();
    };

    shoppingbag.app.showheader = function(){
        var header = $(body).find('header.main-header');
        var userName;
        var userId;
        var userType;
        if(localStorage.getItem('user-details')){
            var userDetails = JSON.parse(localStorage.getItem('user-details'));
            userName = userDetails.userName;
            userId = userDetails.id;
        }

        $(header).empty();
        $(header).header({
            userId:userId,
            userName:userName,
            userType:userType
        });
        
    };

    shoppingbag.app.showFooter = function(){
        var footer = $(body).find('footer.main-footer');
        $(footer).empty();
        $(footer).footer();
    };

    shoppingbag.app.getState = function () {
        var hashValues = window.location.hash.substring(1).split("/"); // Skip the starting "#"
        console.log('get State:', hashValues[0]);
        return hashValues[0];
    };

    shoppingbag.app.setState = function (state) {
        window.location.hash = state;
    };

    shoppingbag.app.setPreviousHash = function(hashValue){
        shoppingbag.app.previousHash = hashValue;
    };

    shoppingbag.app.getPreviousHash = function(hashValue){
        return shoppingbag.app.previousHash;
    };

    shoppingbag.app.getTemplate = function(path){
        return $.ajax({
            url: path,
            cache: true
        });
    };

    //move this to routes.js
    shoppingbag.app.hashRoutes = function(){
        shoppingbag.app.routes = {
            routeMap: {
                "login":{
                    create:function(currentState){
                        console.log('Create login widget');
                    },
                    destroy:function(previousState){
                        console.log('destroy login widget');
                    }
                },
                "home":{
                    create:function(currentState){
                        $(mainContainer).home({
                            title:'home'
                        });
                        
                    },
                    destroy:function(previousState){
                        $(mainContainer).home('destroy'); 
                    }
                },
                "cart":{
                    create:function(currentState){
                        $(mainContainer).cart({
                            title:'Cart'
                        });
                        
                    },
                    destroy:function(previousState){
                        $(mainContainer).cart('destroy'); 
                    }
                },
                "logout":{
                    create:function(){

                    },
                    destroy:function(){

                    }
                }
            }
        };
    }();
})(this.shoppingbag, jQuery);
