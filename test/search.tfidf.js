var Search = require('../lib/search')
  , search = new Search()
  , assert = require('assert');

function english() {
  search.index(1, 'the brown cow');
  search.index(2, 'the white horse');
  search.index(3, 'the white sheep');
}

function japanese() {
  search.index(1, 'フグ田サザエ');
  search.index(2, '磯野カツオ');
  search.index(3, '磯野ワカメ');
  search.index(4, '磯野波平');
  search.index(5, '磯野フネ');
  search.index(6, 'フグ田マスオ');
  search.index(7, 'フグ田タラオ');
  search.index(8, '波野ノリスケ');
  search.index(9, '波野タイ子');
}

/**
 * tf(id, terms)
 */
describe('search.tf(id, terms)', function() {
  it('should return term frequency', function() {
    search.index(1, 'test');
    var terms = search.tokenize('te', 2);
    var tf = search.tf(1, terms);
    tf.should.eql(0.3333333333333333);
  });

  it('should return 0 if the terms does not occurs in a document', function() {
    search.index(1, 'test');
    var terms = search.tokenize('t', 2);
    var tf = search.tf(1, terms);
    tf.should.eql(0);
  });
});

/**
 * idf(terms)
 */
describe('search.idf(terms)', function() {
  afterEach(function() {
    search.init();
  });

  it('should return idf', function() {
    english();
    var terms = search.tokenize('the', 2);
    var idf = search.idf(terms);
    idf.should.eql(0);
  });

  it('should return idf', function() {
    english();
    var terms = search.tokenize('white', 2);
    var idf = search.idf(terms);
    idf.should.eql(0.4054651081081644);
  });

  it('should return idf', function() {
    english();
    var terms = search.tokenize('cow', 2);
    var idf = search.idf(terms);
    idf.should.eql(1.0986122886681098);
  });

  it('should return idf', function() {
    english();
    var terms = search.tokenize('sheep', 2);
    var idf = search.idf(terms);
    idf.should.eql(0); // because the term 'he' occurs in all documents
  });

  it('should suppport double-byde', function() {
    japanese();
    var terms = search.tokenize('サザエ', 2);
    var idf = search.idf(terms);
    idf.should.eql(2.1972245773362196);
  });

  it('should suppport double-byde', function() {
    japanese();
    var terms = search.tokenize('磯野', 2);
    var idf = search.idf(terms);
    idf.should.eql(0.8109302162163288);
  });
});

/**
 * tfidf(id, terms)
 */
describe('search.tfidf(id, terms)', function() {
  it('should return tf-idf', function() {
    english();
    var terms = search.tokenize('cow', 2);
    var tfidf = search.tfidf('1', terms);
    tfidf.should.eql(0.27465307216702745);
  });

  it('should return tf-idf', function() {
    english();
    var terms = search.tokenize('white', 2);
    var tfidf = search.tfidf('2', terms);
    tfidf.should.eql(0.16218604324326577);
  });

  it('should support dobule-byte', function() {
    japanese();
    var terms = search.tokenize('サザエ', 2);
    var tfidf = search.tfidf('1', terms);
    tfidf.should.eql(0.8788898309344879);
  });

  it('should support dobule-byte', function() {
    japanese();
    var terms = search.tokenize('磯野', 2);
    var tfidf = search.tfidf('2', terms);
    tfidf.should.eql(0.2027325540540822);
  });
});