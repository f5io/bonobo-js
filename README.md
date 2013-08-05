#Bonobo

##A lightweight (~1kb gzipped) wrapper for the HTML5 Web Worker API.

**Author:** *Joe Harlow* (<joe@f5.io>)

---
`Bonobo` provides a simple wrapper for the HTML5 Web Worker API. It is library agnostic and has no dependencies.

`Bonobo` allows you to define `workers` inline, negating the need for seperate JavaScript files.

###Browser Support
---

`Bonobo` is built on the `Worker` and `Blob` APIs. Therefore it is only supported by modern browsers.

- Microsoft Internet Explorer 10+
- Mozilla Firefox 21.0+
- Google Chrome 27.0+
- Apple Safari 5.1+
- Opera 15.0+

###Installation
---

`Bonobo` can be installed with `bower`, by running:

`bower install bonobo`

###Usage
---

`Bonobo` can be accessed using either `Bonobo` or `bN`. From here on out, we will refer to it as `Bonobo`.

`Bonobo` has two sets of methods. One relates to methods available in your `main` JavaScript file/thread, the other relates to methods available from within your `worker`.

###Main Thread
---

####`Bonobo`(`reference /* String */`)

Calling `Bonobo('monkey')` creates and returns a new `Employee` with a reference of `'monkey'`. The created `Employee` can be retrieved at any time using the same method.

The returned `Employee` has the following methods, which are chainable:

- #####`task`(`fn /* Function */`)
	The `Function` passed into the `task` method will be executed on a new `thread`. The first `parameter` of the `Function` will be passed by the `begin` method.
	
	The `Function` can contain methods from `Bonobo`'s `Employee` *Thread* API.
	
	#####Example
        Bonobo('monkey')
    	    .task(function(data) {
    		    Bonobo.log('Received: ' + data); // can also use console.log
    		    // This computationally expensive code will run on a new thread
    		    var arr = [];
			    for (var i = 0, n=1, a=1; i < 16750000; i++, a+=4, n++) {
				    arr.push(i * a / n);
			    }
			    Bonobo.done('I\'ve finished my task!');
    	    });

- #####`done`(`fn /* Function */`)
	The `Function` passed into the `done` method will be executed when the `Employee` *Thread* calls its own `done` method. The first `parameter` of the `Function` will be what the `Employee` *Thread* passed through.
	
	#####Example

	    Bonobo('monkey')
	    	.done(function(data) {
	       		console.log('Response from Bonobo(\'' + this.ref + '\'): ' + data);
	       	});


- #####`error`(`fn /* Function */`)
	The `Function` passed into the `error` method will be executed when the `Employee` *Thread* calls its own `error` method OR when an error occurs. The first `parameter` of the `Function` will be what the `Employee` *Thread* passed through OR the error message.
	
	#####Example

	    Bonobo('monkey')
	    	.error(function(message) {
	       		console.log('Error from Bonobo(\'' + this.ref + '\'): ' + message);
	       	});

- #####`begin`(`data`)
	The `begin` method tells the `Employee` *Thread* to start running. The `data` can be of any type and will be passed through to the first `parameter` of the `task` you have defined.
	
	You cannot `begin` a `Employee` *Thread* if you have not defined it's `task`.

	#####Example

	    Bonobo('monkey')
	    	.task(function(data) {
	    		console.log(data); // will log '[Bonobo('monkey') : LOG] : Begin your task!'
	    	})
	    	.begin('Begin your task!');

- #####`stop`()
	This method will `stop` a `Employee` *Thread*.
	
	#####Example

	    Bonobo('monkey')
	    	.stop(); // will stop the Employee Thread with reference: 'monkey'

- #####`destroy`()
	This method will `stop` a `Employee` *Thread* and `destroy` the `Employee`.
	
	#####Example

	    Bonobo('monkey')
	    	.destroy(); // will stop the Employee Thread with reference: 'monkey' and destroy it



###`Employee` Thread
---
- #####`Bonobo`.`log`(`data`) OR `console`.`log`(`data`)
	This method will `log` to the `console` of the *Main Thread*. `console`.`log` in the `Employee` *Thread* is aliased to `Bonobo`.`log` for ease-of-use.

	#####Example

	    Bonobo('monkey')
	    	.task(function(data) {
	    		Bonobo.log('Hello'); // will log 'Hello' to the Main Thread
	    		console.log('World!'); // will log 'World!' to the Main Thread
	       	});
	
- #####`Bonobo`.`done`(`data`)
	This method will push the `data` provided to the *Main Thread*.
	
	#####Example

	    Bonobo('monkey')
	    	.task(function(data) {
	    		// This computationally expensive code will run on a new thread
	    		var arr = [];
				for (var i = 0, n=1, a=1; i < 16750000; i++, a+=4, n++) {
					arr.push(i * a / n);
				}
				Bonobo.done('I\'ve finished my task!');
	    	});


- #####`Bonobo`.`error`(`message`)
	This method will force an error with the value of `message` to the *Main Thread*.
	
	#####Example

	    Bonobo('monkey')
	    	.task(function(data) {
	    		if (data !== 'Hello World') {
	    			Bonobo.error('Wrong data!');
	    		} else {
	    			Bonobo.done('I\'ve finished my task!');
	    		}
	    	});

- #####`Bonobo`.`stop`()
	This method will stop the `Employee` *Thread* from within itself.
	
	#####Example

	    Bonobo('monkey')
	    	.task(function(data) {
	    		if (data !== 'Hello World') {
	    			Bonobo.stop();
	    		}
	    	});
	
###License
---

Copyright (C) 2013 Joe Harlow (Fourth of 5 Limited)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




