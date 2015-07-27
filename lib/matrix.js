'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, matrix, lambda )
*	Evaluates the quantile function for a Poisson distribution with mean parameter `lambda` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} lambda - mean parameter
* @returns {Matrix} output matrix
*/
function quantile( y, x, lambda ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'quantile()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( lambda );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
