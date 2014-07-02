define(["views/videotekaView", "collections/videoteka"], function (VidetekaView, Videoteka) {
	
	var videoteka = new Videoteka();
	var videtekaView = new VidetekaView({model: videoteka});
});