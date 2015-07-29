'use strict';

// MODULES

var cdf = require( 'distributions-poisson-cdf/lib/number.js' );


// SEARCH LEFT //

/**
* FUNCTION search_left( x, p, lambda )
*	Performs a search to the right.
*
* @param {Number} x - starting guess
* @param {Number} p - probability
* @param {Number} lambda - mean parameter
* @returns {Number} `p` quantile of the specified distribution
*/
function search_left( x, p, lambda ) {
	while( true ) {
		if ( x === 0 || cdf( x - 1, lambda ) < p ) {
			return x;
		}
		x--;
	}
} // end FUNCTION search_left()


// SEARCH RIGHT //

/**
* FUNCTION search_right( x, p, lambda )
*	Performs a search to the right.
*
* @param {Number} x - starting guess
* @param {Number} p - probability
* @param {Number} lambda - mean parameter
* @returns {Number} `p` quantile of the specified distribution
*/
function search_right( x, p, lambda ) {
	while( true ) {
		x++;
		if ( cdf( x, lambda ) >= p ) {
			return x;
		}
	}
} // end FUNCTION search_right()


// EXPORTS //

module.exports = {
	'left': search_left,
	'right': search_right
};
