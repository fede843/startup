$().ready(function() {
//reset previous values, in case of refresh
	$(".alias").val("");
//Couldn't get the focus working with this approach
//	$(".search_box").addClass("fade_in");
	$(".search_box").fadeTo(1000, 1, function() {
		$(".alias").focus();
	});
});

//Click on search button gets the input and send it to an url.
//Also shows the response from it.
//
//Kwnow bugs: -	If you enter a string mactching the word "Welcome" 
//            	or a part of it, the highlighted bit in the showed
//			  	string will be wrong
//
//			  -	I don't know why the "!" gets highlighted.
$("#search_button").click( function() {
	$textInput 		= $(".alias").val();
	$responseText 	= $(".response_text");
	$responseBox 	= $(".response_box");

	$.ajax({
		url: "http://bootcamp.aws.af.cm/welcome/" + $textInput,
		type: "POST",
		dataType: "json",
		success: function($success) {
			$responseBox.removeClass("fail").addClass("success");
			$responseText.html($success.response);
//Create a function to highlight your name in the server response content.
//Call it right after setting the response inside the div.
			highlight($textInput, $(".response_text"));
		},
		error: function() {
			$responseBox.removeClass("success").addClass("fail");
			$responseText.html("ERROR! Something went worng");
		}
	});
});

function highlight(patern, data) {
	data.html(data.html().replace(patern, "<span class=\"highlight\"> " + patern +  '</spam>'));
}

//Click on tweet button gets and shows tweets containing "html5".
$("#tweet_button").click( function() {
	var $tweetSide = $(".tweet_side").empty();
	$tweetSide.append(
		"<div class=\"loading_icon\">"
		+ "	<img src=\"css\\loading.gif\" alt=\"Loading icon\"></img>"
		+ "</div>"
	);
	$tweetSide.removeClass("animation").addClass("loading");
	$.ajax({
		url: "http://tweetproxy.ap01.aws.af.cm/search",
		data: {q: "html5"},
		type: "POST",
		dataType: "jsonp",
		jsonpCallback: 'myJsonCallback',	
		success: function($success) {
			$tweetSide = $(".tweet_side").empty();
			var $tweet = {
				user: "",
				text: "",
				created: "",
				image: ""
			};
			$tweetSide.removeClass("loading").addClass("animation");
			$.each($success.statuses, function(index, val) {
				$tweet.user = val.user.name;
				$tweet.text= val.text;
				$tweet.created= val.created_at;
				$tweet.image= val.user.profile_image_url;
				$tweetSide.append(
					"<article class=\"tweet\">"
					+ "	<header>"
					+ "		<img src=\"" + $tweet.image + "\" alt=\"Tweets image\"></img>"
					+ "		<div>" + $tweet.user + "</div>"
					+ "	</header>"
					+ "	<section>"
					+ "		<div>" + $tweet.text + "</div>"
					+ "	</section>"
					+ "	<footer>"
					+ "		<div>" + $tweet.created + "</div>"
					+ "	</footer>"
					+ "</article>"
				);
			});
		},
		error: function($error) {
			alert("error");
		}

	});
});