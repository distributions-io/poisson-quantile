/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	search = require( './../lib/search.js' );

// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'search quantile', function tests() {

	it( 'correctly performs a search to the left', function test() {
		assert.strictEqual( search.left( 6, 0.5, 3 ), 3 );
	});

	it( 'correctly performs a search to the right', function test() {
		assert.strictEqual( search.right( 0, 0.5, 3 ), 3 );
	});

});
