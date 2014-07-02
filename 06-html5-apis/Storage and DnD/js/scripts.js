/*Storage*/

var myDB = {};
myDB.db = null;
var local = {};

myDB.open = function() {
	var request = indexedDB.open("myDB", 1);

  	request.onsuccess = function(e) {
    	myDB.db = e.target.result;
   	};

   	request.onupgradeneeded = function(e) {
   		myDB.db = e.target.result;  //excecuted first time and when version is changed
    	if (!myDB.db.objectStoreNames.contains('input')) {
      		myDB.db.createObjectStore('input',{keyPath: "timestamp"});
    	};
   	};
   	onerror = function (e) {
        console.log("myError: ", e);       
    };
};


myDB.storage = function(time, data) {

        myDB.db.transaction(["input"], "readwrite")
	        .objectStore("input")
	        .add({ timestamp: time, text: data });
};
 
myDB.readAll = function() {
 
	var cursor = myDB.db.transaction(["input"], "readwrite")
				.objectStore("input")
				.openCursor();
 
	cursor.onsuccess = function(e) {
	    var res = e.target.result;
	    if(res) {
	        console.log("indexedDB Input:", res.value.text);
	        console.log("indexedDB Time", res.key);
	        console.log("localStorage Input:", localStorage.getItem(res.key));
	        console.log("localStorage Time", res.key);

	        res.continue();
		};
	};
};

myDB.clearAll = function() {

	var aux = myDB.db.transaction(["input"],"readwrite")
  				.objectStore("input");
  	if(aux){
    	aux.clear();
    };
};

local.storage = function(time, data) {
	localStorage.setItem(time, data);
}


local.clearAll = function(time, data) {
	localStorage.clear();
}

$().ready(function() {
	/*Storage*/
	myDB.open();

	var $textarea = $("#textarea");
	var $textareaDrag = $("#textareaDrag");

	$("#save").on("click", function() {
		var input = $textarea.val();
		var time = new Date().getTime();
		myDB.storage(time, input);
		local.storage(time, input)
		$textarea.val("");
	});

	$("#clear").on("click", function() {
		myDB.clearAll();
		local.clearAll();
	});

	$("#show").on("click", function() {
		myDB.readAll(); //also reads from local
	});

	/*DnD*/
	jQuery.event.props.push( "dataTransfer" );

	$textareaDrag.on("dragenter", function(e) {
		e.preventDefault();
		$textareaDrag.addClass("dragOver");
	});

	$textareaDrag.on("dragover", function(e) {
		e.preventDefault();
	});

	$textareaDrag.on("dragleave", function(e) {
		e.preventDefault();
		$textareaDrag.removeClass("dragOver");
	});

	$textareaDrag.on("drop", function(e) {
		e.preventDefault();
		$textareaDrag.removeClass("dragOver");

		var files = e.dataTransfer.files;
    	var reader = new FileReader();
   		reader.onloadend = function(e) {
        	$textarea.val(e.target.result);
      	};
      	reader.readAsText(files[0], "UTF-8");
	});
});
