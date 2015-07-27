options( digits = 16 )
library( jsonlite )


lambda = 1
probs = c( 0, 0.25, 0.5, 0.75, 1 )
y = qpois( probs, lambda )

cat( y, sep = ",\n" )

data = list(
	lambda = lambda,
	data = probs,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
