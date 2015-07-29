'use strict';

// MODULES //

var cdf = require( 'distributions-poisson-cdf/lib/number.js' ),
	erfcinv = require( 'compute-erfcinv/lib/number.js' ),
	search = require( './search.js' );


// FUNCTIONS //

var round = Math.round,
	sqrt = Math.sqrt;


// CONSTANTS

var ROOT_TWO = sqrt( 2 );


// PARTIAL //

/**
* FUNCTION: partial( lambda )
*	Partially applies mean parameter `lambda` and returns a function for evaluating the quantile function for a Poisson distribution.
*
* @param {Number} lambda - mean parameter
* @returns {Function} quantile function
*/
function partial( lambda ) {

	var sigma,
		sigma_inv;

	sigma = sqrt( lambda );
	sigma_inv =  1 / sigma;

	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function for a Poisson distribution.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		var guess,
			corr,
			x, x2;

		if ( p !== p || p < 0 || p > 1 ) {
			return NaN;
		}
		if ( p === 0 ) {
			return 0;
		}
		if ( p === 1 ) {
			return Number.POSITIVE_INFINITY;
		}
		// Cornish-Fisher expansion
		if ( p < 0.5 ) {
			x = - erfcinv( 2 * p ) * ROOT_TWO;
		} else {
			x = erfcinv( 2 * ( 1 - p ) ) * ROOT_TWO;
		}
		x2 = x * x;
		// Skewness correction:
		corr = x + sigma_inv * ( x2 - 1 ) / 6;
		guess = round( lambda + sigma * corr );
		
		return ( cdf( guess, lambda ) >= p ) ? search.left( guess, p, lambda ) : search.right( guess, p, lambda );
	};
} // end FUNCTION partial()

// EXPORTS //

module.exports = partial;
