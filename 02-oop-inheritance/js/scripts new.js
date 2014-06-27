/*Movie Module*/
var Movie = function() {
  var _attribute = [];

  this.play = function() {
      $(this).trigger("playing");
  };

  this.stop = function() {
    $(this).trigger("stopped");
  };

  this.set = function(attr, value) {
    _attribute[attr] = value;
  };

  this.get = function(attr) {
    return _attribute[attr] ? _attribute[attr] : null; 
  };
};




/*Movie Observer Module*/
var MovieObserver = function() {

  this.addMovie = function(movie) {
    $(movie).on("playing", function() {
      console.log("Playing: " + movie.get("title"));
    });
    $(movie).on("stopped", function() {
      console.log("Stopped: " + movie.get("title"));
    });
  };

  this.removeMovie = function(movie) {
    $(movie).off("playing");
    $(movie).off("stopped");
  };
};




/*Downloadable Movie Class*/
var DownloadableMovie = function() {
  Movie.call(this);
  this.donwload = function() {
    console.log("Downloading: " + this.get("title"));
  };
};





/*Social Mixin*/
var Social = {
  share: function (friendName) {
    console.log("Sharing with " + friendName + " the movie " + this.get("title"));
  },

  like: function() {
    console.log("Like:" + this.get("title"));
  }
};




/*Actor Class*/
var Actor = function(actor) {
  this.name = actor.name;
  this.nationality = actor.nationality;
}




/*Testing*/
var matrix = {},
    terminator = {},
    psycho = {},
    myObserver = {};

Movie.call(matrix);
DownloadableMovie.call(terminator);
Movie.call(psycho);

MovieObserver.call(myObserver);

matrix.set("title", "Matrix");
terminator.set("title", "Terminator");
psycho.set("title", "Psycho");

matrix.set("year", "2003");
terminator.set("year", "1984");
psycho.set("year", "1991");

myObserver.addMovie(matrix);
myObserver.addMovie(terminator);
myObserver.addMovie(psycho);

matrix.play();
terminator.play();
psycho.play();

matrix.stop();
terminator.stop();
psycho.stop();

myObserver.removeMovie(terminator);

matrix.play();
terminator.play();
psycho.play();

terminator.donwload();

_.extend(matrix, Social);
_.extend(terminator, Social);
matrix.like();
terminator.like();
matrix.share("Cristian");
terminator.share("Leopoldo");

var a1 = new Actor({name: "pocho", nationality: "la matanza"});
var a2 = new Actor({name: "T200", nationality: "skynet"});
var a3 = new Actor({name: "ted", nationality: "usa"});
terminator.set("casting", [a1,a2,a3]);
var check = terminator.get("casting");
for (var property in check) {
  console.log(check[property]);
};
