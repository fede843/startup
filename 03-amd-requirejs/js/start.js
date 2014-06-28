requirejs.config({
    baseUrl: 	"js/lib",
    paths: {
        app: 	"../app",
        jquery: "jquery-1.11.1.min", 
    }
});

/*
 jQuery itself registers as an AMD module and
 can easily be loaded. Most plugins, however,
 do not register as AMD modules, and therefore,
 require.js doesn't know that the plugins need
 jQuery to be loaded.
 If the plugins you use all call define() to 
 declare their dependencies you don't need the
 the shim config, like this very case.
 */

requirejs(['app/main']);