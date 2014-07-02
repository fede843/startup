define(["backbone", "models/movie", "localstorage"], function(Backbone, Movie) {

	var Videoteka = Backbone.Collection.extend ({

		model: Movie,

		localStorage: new Backbone.LocalStorage("videotekaBackbone"),
	});

	return Videoteka;
});