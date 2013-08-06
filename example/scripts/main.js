(function() {

	window.onload = function() {
		(function rot() {
			$({deg: 0}).animate({deg: 360}, {
				duration: 1000,
				complete: rot,
				easing: 'linear',
				step: function(now) {
					$('img').css({
						transform: 'rotate(' + now + 'deg)'
					});
				}
			});
		})();

		Bonobo('monkey')
			.task(function(msg) {
				Bonobo.log(JSON.stringify(msg));
				var arr = [];
				for (var i = 0, n=1, a=1; i < 16750000; i++, a+=4, n++) {
					arr.push(i * a / n);
				}
				Bonobo.done('I\'ve finished my task!');
			})
			.error(function(msg) {
				console.log('Error from Bonobo(\'' + this.ref + '\'): ' + msg);
			})
			.done(function(msg) {
				console.log('Response from Bonobo(\'' + this.ref + '\'): ' + msg);
				this.destroy();
			})
			.begin('Start your task!');
	};

})();