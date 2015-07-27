'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, arr, lambda )
*	Evaluates the quantile function for a Poisson distribution with mean parameter `lambda` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} lambda - mean parameter
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function quantile( y, x, lambda ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial( lambda );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = fcn( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
