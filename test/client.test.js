var test = require('tape')
var pelitweets = require('../')

test('should create a client', function (t) {
  t.ok(pelitweets.createClient, 'should exists')
  t.equals(typeof pelitweets.createClient, 'function', 'should be a function')
  t.end()
})
