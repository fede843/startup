$().ready(function() {
	var connection = new WebSocket("ws://echo.websocket.org");
	var $received = $("#received");
	var $send = $("#send");
	var $input = $("#input");

	connection.onopen = function () {
	  console.log("WebSocket Opened");
	};

	connection.onerror = function (error) {
	  console.log('WebSocket Error ' + error);
	};

	connection.onmessage = function (e) {
	  $received.val(e.data);
	};

	$send.on("click", function() {
		connection.send($input.val());
		$input.val("");
	});
});
