define(['./director'], function (director) {

	return function() {
		var _attribute = [];

		this.set = function(attr, value) {
			_attribute[attr] = value;
		};

		this.get = function(attr) {
			return _attribute[attr] ? _attribute[attr] : null; 
		};
	};	
}
);