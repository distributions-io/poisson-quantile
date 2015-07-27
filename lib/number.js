'use strict';

// FUNCTIONS //


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
	if ( p !== p || p < 0 || p > 1 ) {
		return NaN;
	}
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
