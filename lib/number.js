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


// QUANTILE //

/**
* FUNCTION: quantile( p, lambda )
*	Evaluates the quantile function for a Poisson distribution with mean parameter `lambda` at a probability `p`.
*
* @param {Number} p - input value
* @param {Number} lambda - mean parameter
* @returns {Number} evaluated quantile function
*/
function quantile( p, lambda ) {
	var guess,
		sigma, sigma_inv,
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
	sigma = sqrt( lambda );
	sigma_inv =  1 / sigma;
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
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
