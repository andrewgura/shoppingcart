var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');
var Cart = require('../models/cart')

router.get('/', function(req, res) {
  Product.find(function(err, docs) {
    res.render('index', {
      products: docs
    });
  })
});

router.get('/add-to-cart/:id', function(req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/')
  })
})

module.exports = router;