define(function () {

	return function(name) {
		var _attribute = [];

		_attribute["name"] = name;

		this.addName = function(newName) {
			_attribute["name"] = newName;
		};

		this.set = function(attr, value) {
			_attribute[attr] = value;
		};

		this.get = function(attr) {
			return _attribute[attr] ? _attribute[attr] : null; 
		};

		this.speak = function() {
			return _attribute["quotes"] ? _attribute["quotes"] : null;
			/*
			var quotes = _attribute["quotes"];
			if (quotes) {
				console.log(_attribute["name"] + " says:");
				for (var q in quotes) {
					console.log("\"" + quotes[q] + "\"");
				};
			};
			*/
		};
	};
});
