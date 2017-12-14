const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const Type = require('../models/type');

module.exports = (app) => {
  app.use('/', router);
};

const databaseName = 'mydb.db';

// Data sources placeholders
const brands = [];
const types = [];

// Aux functions
function initializeDataSourcesFromDB() {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(databaseName);

  db.each("SELECT * FROM brand", function(err, row) {
      brands.push(new Brand({name: row.name, class: row.class}))
  });

  db.each("SELECT * FROM type", function(err, row) {
     types.push(new Type({name: row.name, class: row.class})) 
  });
}

function searchKeywordIn(word, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].name.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
      return list[i].class;
    }
  }
  return null;
}

function compareKeyword(word) {
  let result = {
    keyword: word,
    class: null
  };

  if (!result.class) {
    result.class = searchKeywordIn(word, brands);
  }

  if (!result.class) {
    result.class = searchKeywordIn(word, types);
  }

  return result;
}

// Entry point
router.get('/', (req, res, next) => {
  initializeDataSourcesFromDB();

  let output = [];

  if (req.query.query) {
    /*
      • The algorithm should find the brand or clothing type with more relevance in reference
      to the words typed (the more words in a brand, the more relevant it is).
      --> I don't know how to achieve this since the styled string won't be any different :(
      */
      const words = req.query.query.split(' ');
      for (var i = 0; i < words.length; i++) {
          output.push(compareKeyword(words[i]));
      }
  }

  res.render('index', {
    title: 'BackEnd Test __ Rokk3rlabs',
    query: req.query.query,
    output: output,
  });
});


router.get('/init', (req, res, next) => {
  var sqlite3 = require('sqlite3').verbose();

  var db = new sqlite3.Database(databaseName);
  var check;
  db.serialize(function() {

    db.run("CREATE TABLE if not exists brand (name TEXT, class TEXT)");
    db.run("DELETE from brand");
    db.run("INSERT into brand(name,class) VALUES ('Gap','bold')");
    db.run("INSERT into brand(name,class) VALUES ('Banana Republic','bold')");
    db.run("INSERT into brand(name,class) VALUES ('Boss','bold')");
    db.run("INSERT into brand(name,class) VALUES ('Hugo Boss','bold')");
    db.run("INSERT into brand(name,class) VALUES ('Taylor','bold')");
    db.run("INSERT into brand(name,class) VALUES ('Rebecca Taylor','bold')");

    db.run("CREATE TABLE if not exists type (name TEXT, class TEXT)");
    db.run("DELETE from type");
    db.run("INSERT into type(name,class) VALUES ('Denim','italic')");
    db.run("INSERT into type(name,class) VALUES ('Pants','italic')");
    db.run("INSERT into type(name,class) VALUES ('Sweaters','italic')");
    db.run("INSERT into type(name,class) VALUES ('Skirts','italic')");
    db.run("INSERT into type(name,class) VALUES ('Dresses','italic')");
  });

  db.close();


  res.render('init', {
    msg: 'Completed',
  });
});
