define(["backbone", "jquery"], function(Backbone, $) {
  var MovieView = Backbone.View.extend ({
    
    tagName: "article",

    template: _.template( $('#movieTemplate').html() ),

    events: {
      "dblclick .view":   "edit",
      "keypress .edit":   "updateOnEnter",
      "keydown .edit":    "revertOnEscape",
      "click #save":      "save",
      "click #delete":    "deleteMovieClick"
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$edit = this.$(".edit");
      this.$view = this.$(".view");
      return this;
    },

    edit : function() {
      this.render(); //to clear previuos values on edit fields
      this.$view.removeClass("show").addClass("hide");
      this.$edit.removeClass("hide").addClass("show");
    },

    updateOnEnter: function (e) {
      if (e.keyCode == 13) { //enter
        this.closeEdit();
        this.save();
      }
    },

    revertOnEscape: function (e) {
      if (e.keyCode == 27) { //esc
        this.closeEdit();
      }
    },
    
    closeEdit : function() {
      this.$edit.removeClass("show").addClass("hide");
      this.$view.removeClass("hide").addClass("show");
    },

    save : function() {
      var data = {},
          aux = {};

      aux.title = this.$edit.find("input[name='editTitle']").val();
      aux.year = this.$edit.find("input[name='editYear']").val();
      aux.director = this.$edit.find("input[name='editDirector']").val();
      aux.country = this.$edit.find("input[name='editCountry']").val();
      aux.storyline = this.$edit.find("textarea[name='editStoryline']").val();
      aux.cover = this.$edit.find("input[name='editCover']").val(); //fakepath problem

      if (aux.title) data.title = aux.title;
      if (aux.year) data.year = aux.year;
      if (aux.director) data.director = aux.director;
      if (aux.country) data.country = aux.country;
      if (aux.storyline) data.storyline = aux.storyline;
      if (aux.cover) data.cover = aux.cover;

      this.model.save(data);
      this.closeEdit();
    },

    deleteMovieClick: function() {
      this.model.destroy();
    }
  });

  return MovieView;
});
