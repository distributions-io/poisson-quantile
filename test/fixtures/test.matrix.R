options( digits = 16 )
library( jsonlite )

lambda = 1
probs = 0:24 / 25
y = qpois( probs, lambda )

cat( y, sep = ",\n" )

data = list(
	lambda = lambda,
	data = probs,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
