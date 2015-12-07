var test = require('tape')
var nock = require('nock')
var pelitweets = require('../')
var Client = require('../lib/client')

var endpoint = 'https://pelitweets.herokuapp.test'

test('should create a client', function (t) {
  t.ok(pelitweets.createClient, 'should exists')
  t.equals(typeof pelitweets.createClient, 'function', 'should be a function')

  var client = pelitweets.createClient()
  t.ok(client instanceof Client, 'should be a instace of Client')
  t.end()
})

test('should list movies', function (t) {
  var client = pelitweets.createClient({ endpoint: endpoint })
  t.equals(typeof client.movies, 'function', 'should be a function')

  nock(endpoint)
    .get('/api/movies')
    .reply(200, [])

  client.movies(function (err, movies) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(movies), 'should be an array')
    t.end()
  })
})

test('should fetch a movie by ID', function (t) {
  var client = pelitweets.createClient({ endpoint: endpoint })
  t.equals(typeof client.movie, 'function', 'should be a function')

  nock(endpoint)
    .get('/api/movie/123')
    .reply(200, {
      _id: 123,
      movie_runtime: '100 min.',
      movie_country: 'USA',
      movie_poster_link: 'http://pic',
      movie_original_title: 'Star Wars',
      movie_plot: 'lorem ipsum',
      movie_release_date: '2015-12-04',
      movie_rating_average: '9',
      movie_rating_score: '8',
      movie_rating_imdb: '9.5',
      movie_rating_fa: '8.5',
      movie_title: 'La Guerra de las Galaxias'
    })

  client.movie(123, function (err, movie) {
    t.error(err, 'should not be an error')
    t.ok(movie, 'should exist')
    t.equals(movie._id, 123)
    t.equals(movie.movie_runtime, '100 min.')
    t.equals(movie.movie_country, 'USA')
    t.equals(movie.movie_poster_link, 'http://pic')
    t.equals(movie.movie_original_title, 'Star Wars')
    t.equals(movie.movie_plot, 'lorem ipsum')
    t.equals(movie.movie_release_date, '2015-12-04')
    t.equals(movie.movie_rating_average, '9')
    t.equals(movie.movie_rating_score, '8')
    t.equals(movie.movie_rating_imdb, '9.5')
    t.equals(movie.movie_rating_fa, '8.5')
    t.equals(movie.movie_title, 'La Guerra de las Galaxias')
    t.end()
  })
})
