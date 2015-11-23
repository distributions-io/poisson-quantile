Quantile Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) distribution [quantile function](https://en.wikipedia.org/wiki/Quantile_function).

The [quantile function](https://en.wikipedia.org/wiki/Quantile_function) for a [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) random variable returns for `0 <= p <= 1` the smallest non-negative integer for which

<div class="equation" align="center" data-raw-text="F(x;\lambda) \ge p" data-equation="eq:condition">
	<img src="https://cdn.rawgit.com/distributions-io/poisson-quantile/16c88ec6e70ad25ca4c4c7c1b3f9690ace087cd2/docs/img/eqn.svg" alt="Condition">
	<br>
</div>

where `F` is the cumulative distribution function (CDF) of a Poisson distribution with mean parameter `lambda > 0`.


## Installation

``` bash
$ npm install distributions-poisson-quantile
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var quantile = require( 'distributions-poisson-quantile' );
```

#### quantile( p[, options] )

Evaluates the [quantile function](https://en.wikipedia.org/wiki/Quantile_function) for the [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) distribution. `p` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) between `0` and `1`, an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = quantile( 0.25 );
// returns 0

x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];
out = quantile( x );
// returns [ 0, 0, 1, 1, 2, +Infinity ]

x = new Float32Array( x );
out = quantile( x );
// returns Float64Array( [0,0,1,1,2,+Infinity] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i / 6;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[   0  1/6
	  2/6  3/6
	  4/5  5/6 ]
*/

out = quantile( mat );
/*
	[ 0 0
	  0 1
	  1 2 ]
*/
```

The function accepts the following `options`:

*	__lambda__: mean parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Poisson](https://en.wikipedia.org/wiki/Poisson_distribution) distribution is a function of one parameter: `lambda > 0`(mean parameter). By default, `lambda` is equal to `1`. To adjust it, set the corresponding option.

``` javascript
var x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];

var out = quantile( x, {
	'lambda': 6
});
// returns [ 0, 4, 5, 6, 8, +Infinity ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.2],
	[2,0.4],
	[3,0.6],
	[4,0.8],
	[5,1]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = quantile( data, {
	'accessor': getValue
});
// returns [ 0, 0, 1, 1, 2, +Infinity ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.2]},
	{'x':[2,0.4]},
	{'x':[3,0.6]},
	{'x':[4,0.8]},
	{'x':[5,1]}
];

var out = quantile( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0]},
		{'x':[1,0]},
		{'x':[2,1]},
		{'x':[3,1]},
		{'x':[4,2]},
		{'x':[5,+Infinity]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Float32Array( [0.2,0.4,0.6,0.8] );

out = quantile( x, {
	'dtype': 'int32'
});
// returns Int32Array( [0,1,1,2] )

// Works for plain arrays, as well...
out = quantile( [0.2,0.4,0.6,0.8], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,1,1,2] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];

out = quantile( x, {
	'copy': false
});
// returns [ 0, 0, 1, 1, 2, +Infinity ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i / 6 ;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[   0  1/6
	  2/6  3/6
	  4/5  5/6 ]
*/

out = quantile( mat, {
	'copy': false
});
/*
	[ 0 0
	  0 1
	  1 2 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	For any `p` outside the interval `[0,1]`, the the evaluated [quantile function](https://en.wikipedia.org/wiki/Quantile_function) is `NaN`.

	```javascript
	var out;

	out = quantile( 1.1 );
	// returns NaN

	out = quantile( -0.1 );
	// returns NaN
	```

*	If an element is __not__ a numeric value, the evaluated [quantile function](https://en.wikipedia.org/wiki/Quantile_function) is `NaN`.

	``` javascript
	var data, out;

	out = quantile( null );
	// returns NaN

	out = quantile( true );
	// returns NaN

	out = quantile( {'a':'b'} );
	// returns NaN

	out = quantile( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = quantile( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = quantile( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = quantile( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var quantile = require( 'distributions-poisson-quantile' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = quantile( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = quantile( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = quantile( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = quantile( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = quantile( mat );

// Matrices (custom output data type)...
out = quantile( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-poisson-quantile.svg
[npm-url]: https://npmjs.org/package/distributions-poisson-quantile

[travis-image]: http://img.shields.io/travis/distributions-io/poisson-quantile/master.svg
[travis-url]: https://travis-ci.org/distributions-io/poisson-quantile

[codecov-image]: https://img.shields.io/codecov/github/distributions-io/poisson-quantile/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/poisson-quantile?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/poisson-quantile.svg
[dependencies-url]: https://david-dm.org/distributions-io/poisson-quantile

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/poisson-quantile.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/poisson-quantile

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/poisson-quantile.svg
[github-issues-url]: https://github.com/distributions-io/poisson-quantile/issues
