var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.init()', function() {
  it('should initialize data', function() {
    search.index(1, 'test');
    search.init();
    search.data.should.eql({
      summary: {}, terms: {}, index: {}
    });
  });
});

describe('search.getSummary()', function() {
  beforeEach(function() {
    search.init();
  });

  it('should get empty object', function() {
    var summary = search.getSummary();
    summary.should.eql({});
  });

  it('should get summary', function() {
    search.index(1, 'test1');
    search.index(2, 'test2');
    search.index(3, 'test3');
    var summary = search.getSummary();
    summary.should.eql({
        '1': 'test1'
      , '2': 'test2'
      , '3': 'test3'
    });
  });
});

describe('search.getCountAll()', function() {
  beforeEach(function() {
    search.init();
  });

  it('should get empty object', function() {
    var count = search.getCountAll();
    count.should.eql(0);
  });

  it('should get empty object', function() {
    search.index(1, 'test1');
    search.index(2, 'test2');
    search.index(3, 'test3');
    var count = search.getCountAll();
    count.should.eql(3);
  });
});