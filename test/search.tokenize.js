var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.tokenize()', function() {
  it('should support uni-gram', function() {
    var terms = search.tokenize('hello', 1)
    terms.should.include('h').with.lengthOf(5);
  });

  it('should support bi-gram', function() {
    var terms = search.tokenize('hello', 2)
    terms.should.include('he').with.lengthOf(4);
  });

  it('should support text with space', function() {
    var terms = search.tokenize('hello world', 2)
    terms.should.include('he').with.lengthOf(8);
  });
});