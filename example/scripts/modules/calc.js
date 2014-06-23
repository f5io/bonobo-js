var Calc = {
	calcX : function(x, y) {
		return Math.sin(x * y) * x;
	},
	calcY : function(x, y) {
		return Math.cos(y / x) * y;
	}
};