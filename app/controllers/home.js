const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const Type = require('../models/type');

module.exports = (app) => {
  app.use('/', router);
};

// Data sources
const brands = [
  new Brand({name: 'Gap'}),
  new Brand({name: 'Banana Republic'}),
  new Brand({name: 'Boss'}),
  new Brand({name: 'Hugo Boss'}),
  new Brand({name: 'Taylor'}),
  new Brand({name: 'Rebecca Taylor'})
];

const types = [
  new Type({name: 'Denim'}),
  new Type({name: 'Pants'}),
  new Type({name: 'Sweaters'}),
  new Type({name: 'Skirts'}),
  new Type({name: 'Dresses'})
];

// Aux functions
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
