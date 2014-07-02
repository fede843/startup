requirejs.config({
    baseUrl: 	"js/lib",
    paths: {
        app: 			"../app",
        collections: 	"../app/collections",
        models:   		"../app/models",
        views:  		"../app/views" ,
        jquery: 		"jquery-1.11.1.min",
        underscore:  	"underscore-min",
        backbone:  		"backbone-min",
        localstorage:   "backbone.localStorage-min"
    },
	shim: {
	    "backbone": {
	      deps: ["jquery", "underscore"],
	      exports: "Backbone"
	    },
	    "underscore": {
	      exports: "_"
	    }
  	}
});

//Kick off
requirejs(['app/main']);