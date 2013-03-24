/**
 * Module dependencies
 */
var util = require('util');

module.exports = Search;
function Search() {
  this.init();
}

/**
 * Initialize on-memory database
 */
Search.prototype.init = function() {
  this.data = {
    summary : {},
    terms   : {},
    index   : {}
  }
}

/**
 * Return summary
 */
Search.prototype.getSummary = function() {
  return this.data.summary;
}

/**
 * Return the number of docs
 */
Search.prototype.getCountAll = function() {
  return Object.keys(this.data.summary).length || 0;
}

/**
 * Return n-gram tokens
 */
Search.prototype.tokenize = function(text, n) {
  n = (!isNaN(n)) ? n : 1;
  var results = [];
  text.split(' ').forEach(function(chunk) {
    if (chunk.length >= n) {
      var i, len = chunk.length;
      for (i = 0; i < len - n + 1; i++) {
        results.push(chunk.substring(i, i + n));
      }
    } else {
      results.push(chunk);
    }
  });
  return results;
}

/**
 * Term frequency
 *
 * The number of times a term occurs in a document.
 */
Search.prototype.tf = function(id, terms) {
  var data = this.data;

  // Total words in the document
  var total = 0;
  for (var key in data.terms[id]) {
    total += data.terms[id][key];
  }

  // // Words matches
  var match = 0;
  if (util.isArray(terms)) {
    terms.forEach(function(term) {
      for (var key in data.terms[id]) {
        if (term == key) match++;
      }
    });
  }

  // TODO: Handle zero division
  return match / total;
}

/**
 * Inverse document frequency
 *
 * Measure of whether the term is common or rare across all documents.
 * This factor diminishes the weight of terms that occur very frequently 
 * in the collection and increases the weight of terms that occur rarely.  
 */
Search.prototype.idf = function(terms) {
  var data = this.data;

  var matches = []
  if (util.isArray(terms)) {
    terms.forEach(function(term) {
      for (var key in data.index) {
        if (term == key) {
          data.index[key].forEach(function(id) {
            if (matches.indexOf(id) < 0) matches.push(id);
          });
        }
      }
    });
  }
  var x = this.getCountAll() / matches.length;
  return Math.log(this.getCountAll() / matches.length);
}

/**
 * Term frequency - Inverse document frequency
 */
Search.prototype.tfidf = function(id, terms) {
  var tf = this.tf(id, terms);
  var idf = this.idf(terms);
  return tf * idf;
}

/**
 * Create new index
 */
Search.prototype.index = function(id, text) {
  this.delete(id);
  this.add(id, text);
}

/**
 * Add document
 */
Search.prototype.add = function(id, text) {
  var data = this.data;

  // summary
  data.summary[id] = text;

  var terms = this.tokenize(text, 2);

  // term count
  data.terms[id] = {};
  terms.forEach(function(t) {
    if (!data.terms[id][t]) data.terms[id][t] = 0;
    data.terms[id][t]++;
  });

  // inverted index
  terms.forEach(function(t) {
    if (!data.index[t]) data.index[t] = [];
    if (data.index[t].indexOf(id) < 0) {
      data.index[t].push(id);
    }
  });
}

/**
 * Delete document
 */
Search.prototype.delete = function(id) {
  var data = this.data;

  if (data.summary[id]) {
    // summary
    delete data.summary[id];

    // term count
    if (data.terms[id]) delete data.terms[id];

    // inverted index
    for (var key in data.index) {
      var i = data.index[key].indexOf(id);
      if (i >= 0) data.index[key].splice(i, 1);
      if (data.index[key].length == 0) delete data.index[key];
    }
    return true;
  }
  return false;
}

/**
 * Search document
 */
Search.prototype.search = function(text) {
  var data = this.data;

  // scan inverted index
  var matches = [];
  var keys = Object.keys(data.index);
  var terms = this.tokenize(text, 2);
  terms.forEach(function(t) {
    if (keys.indexOf(t) >= 0) {
      data.index[t].forEach(function(id) {
        if (matches.indexOf(id) < 0) matches.push(id);
      });
    }
  });

  // create return docs
  var i, len = matches.length, docs = [];
  for (i = 0; i < len; i++) {
    var id = matches[i];
    var doc = {
      id: id,
      summary: data.summary[id],
      score: this.tfidf(id, terms)
    }
    docs.push(doc);
  }

  // sort docs by score
  docs.sort(function(a, b) {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });

  return docs;
}