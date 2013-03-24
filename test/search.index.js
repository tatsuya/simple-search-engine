var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.index(id, text)', function() {
  beforeEach(function() {
    search.init();
  });

  it('should create new index', function() {
    search.index(1, 'test');
    search.data.should.eql({
      summary: {
        '1': 'test'
      },
      terms: {
        '1': { te: 1, es: 1, st: 1 }
      },
      index: {
        te: [ 1 ], es: [ 1 ], st: [ 1 ]
      }
    });

  });

  it('should stack index', function() {
    search.index(1, 'test1');
    search.index(2, 'test2');
    search.index(3, 'test3');
    search.data.should.eql({
      summary: {
          '1': 'test1'
        , '2': 'test2'
        , '3': 'test3'
      },
      terms: {
        '1': { te: 1, es: 1, st: 1, t1: 1 },
        '2': { te: 1, es: 1, st: 1, t2: 1 },
        '3': { te: 1, es: 1, st: 1, t3: 1 }
      },
      index: {
        te: [ 1, 2, 3 ],
        es: [ 1, 2, 3 ],
        st: [ 1, 2, 3 ],
        t1: [ 1 ],
        t2: [ 2 ],
        t3: [ 3 ]
      }
    });
  });

  it('should overwrite if the id already exists', function() {
    search.index(1, 'foo');
    search.index(1, 'bar');
    search.data.summary.should.eql({
      '1': 'bar'
    });
  });
});