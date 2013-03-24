var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.delete(id)', function() {
  beforeEach(function() {
    search.init();
    search.add(1, 'test1');
    search.add(2, 'test2');
    search.add(3, 'test3');
  });

  it('should delete summary', function() {
    search.data.summary.should.eql({
        '1': 'test1'
      , '2': 'test2'
      , '3': 'test3'
    });
    search.delete(2);
    search.data.summary.should.eql({
        '1': 'test1'
      , '3': 'test3'
    })
  });

  it('should delete terms', function() {
    search.data.terms.should.eql({
        '1': { te: 1, es: 1, st: 1, t1: 1 }
      , '2': { te: 1, es: 1, st: 1, t2: 1 }
      , '3': { te: 1, es: 1, st: 1, t3: 1 }
    });
    search.delete(2);
    search.data.terms.should.eql({
        '1': { te: 1, es: 1, st: 1, t1: 1 }
      , '3': { te: 1, es: 1, st: 1, t3: 1 }
    });
  });

  it('should delete index', function() {
    search.data.index.should.eql({
        te: [ 1, 2, 3 ]
      , es: [ 1, 2, 3 ]
      , st: [ 1, 2, 3 ]
      , t1: [ 1 ]
      , t2: [ 2 ]
      , t3: [ 3 ]
    });
    search.delete(2);
    search.data.index.should.eql({
        te: [ 1, 3 ]
      , es: [ 1, 3 ]
      , st: [ 1, 3 ]
      , t1: [ 1 ]
      , t3: [ 3 ]
    });
  });

  it('should ignore unused id', function() {
    var before = search.data;
    search.delete(4);
    var after = search.data;
    before.should.eql(after);
  });

  it('should delete twice', function() {
    search.delete(2);
    search.delete(1);
    search.data.should.eql({
      summary: { '3': 'test3' },
      terms: { '3': { te: 1, es: 1, st: 1, t3: 1 } },
      index: { te: [ 3 ], es: [ 3 ], st: [ 3 ], t3: [ 3 ] }
    });
  });
});