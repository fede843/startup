/*Movie Module*/
var Movie = function() {

  var attribute= {};

  var movie = function() {};

  movie.prototype = {
    play: function() {
      //console.log("Playing: " + attribute["title"]);
      $(this).trigger("playing");
    },  
    stop: function() {
      //console.log("Stopping: " + attribute["title"]););
      $(this).trigger("stopped");
    },  
    set: function(attr, value) {
      attribute[attr] = value;
    }, 
    get: function(attr) {
      return attribute[attr] ? attribute[attr] : null; 
    },
    constructor: movie,
  };

  return new movie();
};



/*MovieObserver Module*/
var MovieObserver = (function() {

  var addMovie = function(movie) {
    $(movie).on("playing", function() {
      console.log("Playing: " + movie.get("title"));
    });
    $(movie).on("stopped", function() {
      console.log("Stopped: " + movie.get("title"));
    });
  };

  var removeMovie = function(movie) {
    $(movie).off("playing");
    $(movie).off("stopped");
  };

  var movieObserver = function() {};

  movieObserver.prototype = {
    add: addMovie,
    remove: removeMovie,
    constructor: movieObserver
  };

  return movieObserver;
}());



/*DownloadableMovie Class*/
var DownloadableMovie = function() {};
DownloadableMovie.prototype = new Movie();
DownloadableMovie.prototype.constructor = DownloadableMovie;
DownloadableMovie.prototype.donwload = function() {
  console.log("Downloading: " + this.get("title"));
};



/*Social Mixin*/
var Social = {
  share: function (friendName) {
    console.log("Sharing");
  },
  like: function() {
    console.log("Like");
  }
};

function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}

extend(Movie.prototype, Social);



/*Actor Class*/
var Actor = function(actor) {
  this.name = actor.name;
  this.nationality = actor.nationality;
}


/*Testing*/
var movieObserver = new  MovieObserver();

var matrix = new DownloadableMovie(),
    terminator = new Movie(),
    psycho = new Movie();

matrix.set("title", "Matrix");
terminator.set("title", "Terminator");
psycho.set("title", "Psycho");

matrix.set("year", "2003");
terminator.set("year", "1984");
psycho.set("year", "1991");

movieObserver.add(matrix);
movieObserver.add(terminator);
movieObserver.add(psycho);

matrix.play();
terminator.play();
psycho.play();

matrix.stop();
terminator.stop();
psycho.stop();

movieObserver.remove(terminator);

matrix.play();
terminator.play();
psycho.play();

matrix.donwload();

var a1 = new Actor({name: "pocho", nationality: "la matanza"});
var a2 = new Actor({name: "T200", nationality: "skynet"});
var a3 = new Actor({name: "ted", nationality: "usa"});
terminator.set("casting", [a1,a2,a3]);
var check = terminator.get("casting");
for (var property in check) {
  console.log(check[property]);
}
