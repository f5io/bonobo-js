#Bonobo (v2.0)

##A lightweight wrapper for the HTML5 Web Worker API.

**Author:** *Joe Harlow* (<joe@f5.io>)

---
`Bonobo` provides a simple wrapper for the HTML5 Web Worker API. It is library agnostic and has no dependencies.

`Bonobo` allows you to define `workers` inline, negating the need for seperate JavaScript files.

###Version 2.0
---

`Bonobo v2.0` adds a completely revised set of methods. Please make sure to read the docs if you wish to start using `v2.0`.

###Browser Support
---

`Bonobo` is built on the `Web Worker` and `Blob` APIs. When these are not available it will purely run the `task` in the main thread by creating a fake `worker`. This should allow the usage of `Bonobo` in a *Progressive Enhancement* environment.

For full capabilities, the following browsers are supported:

- Microsoft Internet Explorer 10+
- Mozilla Firefox 21.0+
- Google Chrome 27.0+
- Apple Safari 5.1+
- Opera 15.0+

###Installation
---

`Bonobo` can be installed with either `npm` or `bower`, by running:

`npm install bonobo` or `bower install bonobo` respectively.

###Usage
---

`Bonobo` can be loaded using `CommonJS`-style module definitions using `browserify`, if the package has been installed via `npm`.

    var Bonobo = require('bonobo');

If loaded with a `<script>` tag, `Bonobo` can be accessed using either `Bonobo` or `bN` on the `window` object.

From here on out, we will refer to it as `Bonobo`.

`Bonobo` has two sets of methods. One relates to methods available in your `main` JavaScript file/thread, the other relates to methods available from within your `worker`.

###Transferable Objects
---

`Bonobo` has built in systems to deal with Transferable Objects intelligently. If the content being transferred between threads can be automatically converted into an `ArrayBuffer` then it will be transferred as such. This allows for transferring of large `Strings`, `Objects` or `Arrays` to happen quickly and efficiently. **Please be aware:** This will not allow you to transfer `prototype` chains or `Function`s between threads, plain objects only.

###Main Thread
---

####`Bonobo`(`reference /* String */`)

Calling `Bonobo('monkey')` creates and returns a new `Employee` with a reference of `'monkey'`. The created `Employee` can be retrieved at any time using the same method.

The returned `Employee` has the following methods, which are chainable:

- #####`hoist`(`fn /* Function */`)
	As of `Bonobo v2.0`, employees can have multiple defined functions which are reusable. The contents of the `Function` passed to `hoist` will be hoisted to the top of you worker, allowing you to define reused variables or functions globally across the `Employee`.

	_Example_:
	
	    Bonobo('monkey')
	        .hoist(function() {
			    var MAX_NUMBER = 123456,
			    	MIN_NUMBER = 1;

			    function double(num) {
				    return num * 2;
			    }

			    var triple = function(num) {
				    return num * 3;
			    }
	        });

- #####`require`(`...args /* String */`)
	This method is an `alias` for the `importScripts` function that is available within the `Web Worker` API. It will import the supplied scripts at the top of your worker.
	
	_Example_:
	
	    Bonobo('monkey')
		    .require('scripts/script1.js', 'scripts/script2.js');

- #####`define`(`fn /* Named Function */` OR `name /* String */`, `fn /* Function */`)
	The `define` method takes either a *Named* `Function` **or** a `name` and `Function` combination. It allows you to define a function within your worker which can be called at a later time.
	
	This method will also expose the `Function` as a named variable of the `Employee` object if it is not already taken or reserved. It will also expose the function via the `run` method documented below.
	
	_Example_:
	
	    Bonobo('monkey')
	        .define(function calculate(data) {
	            /* Will expose the function 'calculate' on the Employee.
	             * For example, after compilation you will be able to run
	             * Bonobo('monkey').calculate(data); */
	        });
	    
	    // The following code achieves the same result
	    
	    Bonobo('monkey')
	        .define('calculate', function(data) {
	        	/* Exposes the function 'calculate' on the Employee.
	        });
	
- #####`run`(`method /* String */`[, `data`[, `transfer /* ArrayBuffer */`]])
	The `run` method will call the requested `method` on the the `Employee` *Thread* only once the worker has been **compiled**. As above, `data` that can be transferred as an `ArrayBuffer` will automatically be done so.
	
	_Example_:
	
	    Bonobo('monkey')
	    	.define(function calculate(data) {
	    		// Do something here.
	    	})
	    	.compile().then(function() {
	    		this.run('calculate', data);
	    	});

- #####`done`(`fn /* Function */`)
	The `Function` passed into the `done` method will be executed when the `Employee` *Thread* calls its own `done` method. The first `parameter` of the `Function` will be what the `Employee` *Thread* passed through.
	
	_Example_:

	    Bonobo('monkey')
	    	.done(function(data) {
	       		console.log('Response from Bonobo(\'' + this.ref + '\'): ' + data);
	       	});

- #####`on`(`event /* String */`, `fn /* Function */`)
	The `on` method allows `Bonobo` to listen out for custom events emitted from the `Employee` *Thread* using the `emit` method.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function refresh(data) {
	        	Bonobo.emit('refresh', 'Hello World!');
	    	})
	    	.on('refresh', function(data) {
	       		console.log('Data from Bonobo(\'' + this.ref + '\'): ' + data);
	       	});


- #####`error`(`fn /* Function */`)
	The `Function` passed into the `error` method will be executed when the `Employee` *Thread* calls its own `error` method OR when an error occurs. The first `parameter` of the `Function` will be what the `Employee` *Thread* passed through OR the error message.
	
	_Example_:

	    Bonobo('monkey')
	    	.error(function(message) {
	       		console.log('Error from Bonobo(\'' + this.ref + '\'): ' + message);
	       	});

- #####`build`() **OR** `compile`()
	Before using an 'Employee' *Thread*, it must be compiled. The `compile` or `build` methods return a simple `Promise` object containing a `then` Function.
	
	You cannot run any of the defined methods on a worker until it is compiled.
	
	_Example_:
	
	    Bonobo('monkey')
	    	.define(function calculate(data) {
	    		// Do something here.
	    	})
	    	.compile().then(function() {
	    		this.run('calculate', data);
	    	});

- #####`stop`()
	This method will `stop` an `Employee` *Thread*.
	
	_Example_:

	    Bonobo('monkey')
	    	.stop(); // will stop the Employee Thread with reference: 'monkey'

- #####`destroy`()
	This method will `stop` an `Employee` *Thread* and `destroy` the `Employee`.
	
	_Example_:

	    Bonobo('monkey')
	    	.destroy(); // will stop the Employee Thread with reference: 'monkey' and destroy it



###`Employee` Thread
---
- #####`Bonobo`.`log`(`data`) OR `console`.`log`(`data`)
	This method will `log` to the `console` of the *Main Thread*. `console`.`log` in the `Employee` *Thread* is aliased to `Bonobo`.`log` for ease-of-use.

	_Example_:

	    Bonobo('monkey')
	    	.define(function logs(data) {
	    		Bonobo.log('Hello'); // will log 'Hello' to the Main Thread
	    		console.log('World!'); // will log 'World!' to the Main Thread
	       	});
	
- #####`Bonobo`.`done`(`data`)
	This method will push the `data` provided to the *Main Thread*.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function compute(data) {
	    		// This computationally expensive code will run on a new thread
	    		var arr = [];
				for (var i = 0, n=1, a=1; i < 16750000; i++, a+=4, n++) {
					arr.push(i * a / n);
				}
				Bonobo.done({ message: 'I\'ve finished my task!', data: arr });
	    	});

- #####`Bonobo`.`emit`(`event /* String */`,`data`)
	This method will push the `data` provided to the *Main Thread* through the handler defined for the `event` name using the `on` method.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function refresh(data) {
	        	Bonobo.emit('refresh', 'Hello World!');
	    	})
	    	.on('refresh', function(data) {
	       		console.log('Data from Bonobo(\'' + this.ref + '\'): ' + data);
	       	});


- #####`Bonobo`.`error`(`message`)
	This method will force an error with the value of `message` to the *Main Thread*.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function helloWorld(data) {
	    		if (data !== 'Hello World') {
	    			Bonobo.error('Wrong data!');
	    		} else {
	    			Bonobo.done('I\'ve finished my task!');
	    		}
	    	});

- #####`Bonobo`.`importJS`(`...args`)
	This method is an `alias` for the `importScripts` function that is available within the `Web Worker` API.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function calc(data) {
	    		Bonobo.importJS('scripts/something.js','scripts/awesome.js');
	    		Bonobo.log(JSON.stringify(Something));
	    		Bonobo.log(JSON.stringify(Awesome));
	    	});

- #####`Bonobo`.`stop`()
	This method will stop the `Employee` *Thread* from within itself.
	
	_Example_:

	    Bonobo('monkey')
	    	.define(function calc(data) {
	    		if (data !== 'Hello World') {
	    			Bonobo.stop();
	    		}
	    	});
	
###License
---

Copyright (C) 2014 Joe Harlow (Fourth of 5 Limited)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




