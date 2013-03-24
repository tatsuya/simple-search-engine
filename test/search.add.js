var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.add(text)', function() {
  beforeEach(function() {
    search.init();
  });

  it('should create summary', function() {
    search.add('1', 'test');
    search.data.summary.should.eql({
      1: 'test'
    });
  });

  it('should create terms', function() {
    search.add('1', 'test');
    search.data.terms.should.eql({
      '1': { te: 1, es: 1, st: 1 }
    });
  });

  it('should create index', function() {
    search.add('1', 'test');
    search.data.index.should.eql({
        te: [ '1' ]
      , es: [ '1' ]
      , st: [ '1' ]
    });
  });

  it('should stack summary', function() {
    search.add('1', 'test');
    search.add('2', 'test');
    search.data.summary.should.eql({
        '1': 'test'
      , '2': 'test'
    });
  });

  it('should stack terms', function() {
    search.add('1', 'test');
    search.add('2', 'test');
    search.data.terms.should.eql({
        '1': { te: 1, es: 1, st: 1 }
      , '2': { te: 1, es: 1, st: 1 }
    });
  });

  it('should stack index', function() {
    search.add('1', 'test');
    search.add('2', 'test');
    search.data.index.should.eql({
        te: [ '1', '2' ]
      , es: [ '1', '2' ]
      , st: [ '1', '2' ]
    });
  });

  it('should support multi-byte chars', function() {
    search.add(1, 'フグ田サザエ');
    search.add(2, '磯野カツオ');
    search.add(3, '磯野ワカメ');
    search.add(4, '磯野波平');
    search.add(5, '磯野フネ');
    search.add(6, 'フグ田マスオ');
    search.add(7, 'フグ田タラオ');
    search.add(8, '波野ノリスケ');
    search.add(9, '波野タイ子');
    search.data.summary.should.eql({
        '1': 'フグ田サザエ'
      , '2': '磯野カツオ'
      , '3': '磯野ワカメ'
      , '4': '磯野波平'
      , '5': '磯野フネ'
      , '6': 'フグ田マスオ'
      , '7': 'フグ田タラオ'
      , '8': '波野ノリスケ'
      , '9': '波野タイ子'
    });
  });
});