'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( lambda )
*	Partially applies mean parameter `lambda` and returns a function for evaluating the quantile function for a Poisson distribution.
*
* @param {Number} lambda - mean parameter
* @returns {Function} quantile function
*/
function partial( lambda ) {

	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function for a Poisson distribution.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		if ( p !== p || p < 0 || p > 1 ) {
			return NaN;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
