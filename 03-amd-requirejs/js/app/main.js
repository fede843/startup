define(["app/movie", "app/director", "jquery"], function (Movie, Director, $) {

	var matrix = new Movie(),
	    terminator = new Movie(),
	    psycho = new Movie();

	matrix.set("title", "Matrix");
	terminator.set("title", "Terminator");
	psycho.set("title", "Psycho");

	matrix.set("year", "1999");
	terminator.set("year", "1984");
	psycho.set("year", "1991");

	var andy = new Director("Andy Wachowski");
	matrix.set("director", andy);
	var quotes = ["To deny our impulses is to deny the very thing that makes us human.",
		"We are told to remember the idea not the man, because a man can fail. After 400 yeas later an idea can still change the world.",
		"You take the blue pill, the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes.",
		"The body cannot live without the mind.",
		"After Bound, we were offered a lot of lesbian thrillers.",
		"We thought we'd write a good script for women, giving them the fun roles that generally men get.",
		"We've always loved going to the movies. Our mom and dad are big movie fans. They'd take us on these movie orgys where we'd see sometimes three movies in a day.",
		"There's something uniquely interesting about Buddhism and mathematics, particularly about quantum physics, and where they meet. That has fascinated us for a long time."
	];
	andy.set("quotes", quotes);
	quotes = matrix.get("director").speak();
	if (!quotes) {
		return;
	};

	$().ready( function() {
		var container = $("#cotainer");
		container.empty();
		container.append("<h1>" + matrix.get("director").get("name") + " says:" + "</h1>")
		for (var q in quotes) {
			container.append("<h3>\"" + quotes[q] + "\"</h3>").slideDown(500);
		};
	});
});