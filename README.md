# simple-search-engine

Minimalist search engine, tf-idf text retrieval with an inverted index, written with Node.

## Installation

Clone the repo:

```
git clone https://github.com/tatsuyaoiw/search-engine.git
```

Install dependencies:

```
cd search-engine
npm install
```

Start the server:

```
node index.js
```

Now server should be running on `localhost:3000`.

## Usage

### Add a document

```
curl -X POST http://localhost:3000/index/1 -d @example/docs/sazae.txt
curl -X POST http://localhost:3000/index/2 -d @example/docs/katsuo.txt
curl -X POST http://localhost:3000/index/3 -d @example/docs/wakame.txt
```

### Show all documents

```
curl -X GET http://localhost:3000
```

### Search documents by keyword

```
curl -X POST http://localhost:3000/search -d 'サザエ'
curl -X POST http://localhost:3000/search -d 'ワカメ'
curl -X POST http://localhost:3000/search -d 'タマ'
```

### Delete a document

```
curl -X DELETE http://localhost:3000/1
curl -X DELETE http://localhost:3000/2
curl -X DELETE http://localhost:3000/3
```

## Running test

To run the test suite first invoke the following command within the repo, installing the development dependencies:

```
npm install
```

then run the tests:

```
make test
```
