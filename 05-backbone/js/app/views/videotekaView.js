define(["models/movie", "views/movieView", "backbone", "jquery"], function(Movie, MovieView, Backbone, $) {
  var VideotekaView = Backbone.View.extend ({
    
    el: "#appContainer",

    events: {
      "click #addMovie":      "addMovieClick",
      "keypress #newMovie":   "addMovieEnter"
    },

    initialize: function() {
      this.$form = $("#newMovie");
      this.emptyForm();
      this.$movieSection = $("#movies");

      this.listenTo(this.model, "add", this.addMovie);

      this.model.fetch();
    },

    emptyForm: function() {
      this.$form.find("input[name='addTitle']").val("");
      this.$form.find("input[name='addYear']").val("");
      this.$form.find("input[name='addDirector']").val("");
      this.$form.find("input[name='addCountry']").val("");
      this.$form.find("textarea[name='addStoryline']").val("");
      this.$form.find("input[name='addCover']").val("");
    },

    addMovieClick: function() {

      var data = {};

      data.title = this.$form.find("input[name='addTitle']").val();
      data.year = this.$form.find("input[name='addYear']").val();
      data.director = this.$form.find("input[name='addDirector']").val();
      data.country = this.$form.find("input[name='addCountry']").val();
      data.storyline = this.$form.find("textarea[name='addStoryline']").val();

      var aux = this.$form.find("input[name='addCover']").val();  //fakepath problem
      if (aux) {
        data.cover = aux;
      };

      if (data.title && data.year && data.director && data.country && data.storyline) {
        var newMovie = new Movie(data);
        this.model.create(newMovie); 
      }
    },

    addMovie: function(newMovie) {
      var newMovieView = new MovieView({model: newMovie});
      this.$movieSection.append(newMovieView.render().el);
      this.emptyForm();
    },


    addMovieEnter: function (e) {
      if (e.keyCode == 13) { //enter
        this.addMovieClick();
      }
    }
  });

  return VideotekaView;
});
