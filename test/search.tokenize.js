var Search = require('../lib/search');
var search = new Search()
var assert = require('assert');

describe('search.tokenize()', function() {
  it('should support uni-gram', function() {
    var terms = search.tokenize('hello', 1);
    assert.deepEqual(terms, [ 'h', 'e', 'l', 'l', 'o' ]);
  });

  it('should support bi-gram', function() {
    var terms = search.tokenize('hello', 2);
    assert.deepEqual(terms, [ 'he', 'el', 'll', 'lo' ]);
  });

  it('should ignore spaces', function() {
    var terms = search.tokenize('hello world', 2);
    assert.deepEqual(terms, [ 'he', 'el', 'll', 'lo', 'wo', 'or', 'rl', 'ld' ]);
  });
});