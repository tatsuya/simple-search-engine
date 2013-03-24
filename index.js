var connect = require('connect')
  , router = require('./middleware/router')
  , Search = require('./lib/search')
  , search = new Search();

var routes = {
  GET: {
    '/': function(req, res) {
      var docs = search.getSummary();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(docs));
      res.end();
    }
  },
  POST: {
    '/index/:id': function(req, res, id) {
      var text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        text += chunk;
      });
      req.on('end', function() {
        search.index(id, text);
        res.end('OK!\n');
      });       
    },
    '/search': function(req, res) {
      var text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        text += chunk;
      });
      req.on('end', function() {
        var docs = search.search(text);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(docs));
        res.end();
      });
    }
  },
  DELETE: {
    '/:id': function(req, res, id) {
      if (!search.delete(id)) {
        res.statusCode = 404;
        res.end('Document not found\n');
      } else {
        res.end('OK!\n');
      }
    }
  }
};

connect()
  .use(router(routes))
  .listen(3000);