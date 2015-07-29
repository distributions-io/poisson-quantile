options( digits = 16 )
library( jsonlite )


lambda = 0.0093
probs = seq( 0, 1, 0.01 )
y = qpois( probs, lambda )

cat( y, sep = ",\n" )

data = list(
	lambda = lambda,
	data = probs,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/typedarray.json" )
