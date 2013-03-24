var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

describe('search.search(text)', function() {
  beforeEach(function() {
    search.index(1, 'フグ田サザエ');
    search.index(2, '磯野カツオ');
    search.index(3, '磯野ワカメ');
    search.index(4, '磯野波平');
    search.index(5, '磯野フネ');
    search.index(6, 'フグ田マスオ');
    search.index(7, 'フグ田タラオ');
    search.index(8, '波野ノリスケ');
    search.index(9, '波野タイ子');
  });

  it('should hit one document', function() {
    var docs = search.search('サザエ');
    docs.should.eql([
      { id: 1, summary: 'フグ田サザエ', score: 0.8788898309344879 }
    ]);
  });

  it('should hit four document', function() {
    var docs = search.search('磯野');
    docs.should.eql([
      { id: 4, summary: '磯野波平', score: 0.27031007207210955 },
      { id: 5, summary: '磯野フネ', score: 0.27031007207210955 },
      { id: 2, summary: '磯野カツオ', score: 0.2027325540540822 },
      { id: 3, summary: '磯野ワカメ', score: 0.2027325540540822 }
    ]);
  });

  it('should not find any document', function() {
    var docs = search.search('タマ');
    docs.should.eql([]);
  });
});