define(['backbone'], function(Backbone) {

	var Movie = Backbone.Model.extend ({
		defaults: {
			title: "No title",
			cover: "img/default.jpg",
			director: "Unknown",
			year: "Unknown",
			country: "Unknown",
			storyline: "None"
		},

		inicialize: function() {}
	});

	return Movie;
});