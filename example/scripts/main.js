(function() {

	window.addEventListener('DOMContentLoaded', function() {

		var transferringObj = [
			0,1,2,3,4,5,6,7,8,9,10,
			11,12,13,14,15,16,17,18,19,20,
			21,22,23,24,25,26,27,28,29,30,
			31,32,33,34,35,36,37,38,39,40,
			41,42,43,44,45,46,47,48,49,50,
			51,52,53,54,55,56,57,58,59,60,
			61,62,63,64,65,66,67,68,69,70,
			71,72,73,74,75,76,77,78,79,80,
			81,82,83,84,85,86,87,88,89,90,
			91,92,93,94,95,96,97,98,99,100
		];

		Bonobo('monkey')
			.require('scripts/modules/bigint.js')
			.hoist(function() {
				var obj;
			})
			.define(function calculate(data) {
				function lucasLehmer(p) {
					p = bigInt(p);
					if (p.equals(2)) {
						return true;
					}

					var s = bigInt(4);
					var M = bigInt(2).pow(p).minus(1);

					var index = bigInt(-1);
					while ((index = index.next()).lesser(p.minus(2))) {
						s = s.pow(2).minus(2).mod(M);
					}

					return s.equals(0);
				}
				
				obj = data;

				var llresults = obj.map(function(num) {
					return lucasLehmer(num);
				});

				Bonobo.emit('event', llresults);
				//Bonobo.done(obj);
			})
			.on('event', function(data) {
				console.log(data);
			})
			.error(function(msg) {
				console.log('Error from Bonobo(\'' + this.ref + '\'): ', msg);
			})
			.done(function(msg) {
				console.log('Response from Bonobo(\'' + this.ref + '\'): ', msg);
				//this.destroy();
			})
			.compile().then(function() {
				this.calculate(transferringObj);
			});

	});

})();