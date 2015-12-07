var request = require('client-request')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'https://pelitweets.herokuapp.com'
}

Client.prototype._request = function (path, method, fn) {
  var uri = this.endpoint + path
  request({
    uri: uri,
    method: method,
    json: true
  }, function (err, res, body) {
    if (err) return fn(err)

    if (res.statusCode !== 200) return fn(new Error('An error occured in the request'))

    fn(null, body)
  })
}

Client.prototype.movies = function (fn) {
  this._request('/api/movies', 'GET', fn)
}

Client.prototype.movie = function (movieId, fn) {
  this._request('/api/movie/' + movieId, 'GET', fn)
}

module.exports = Client
