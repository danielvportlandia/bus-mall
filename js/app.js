'use strict';

//image array
var productOne = document.getElementById('product1');
var productTwo = document.getElementById('product2');
var productThree = document.getElementById('product3');
// var getTarget = event.target;
var totalClicks = [];
var totalViews = [];
Product.allProducts = [];

//constructor
function Product(name, filepath) {
  this.name = name;
  this.totalClicks = totalClicks;
  this.totalViews = totalViews;
  this.filepath = filepath;

  Product.allProducts.push(this);
}

//instances
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

//randomizer functions
function randomProductOne() {
  var randomProductOne = Math.floor(Math.random() * Product.allProducts.length);
  productOne.src = Product.allProducts[randomProductOne].filepath;
  productOne.alt = Product.allProducts[randomProductOne].name;
  productOne.title = Product.allProducts[randomProductOne].name;
}

function randomProductTwo() {
  var randomProductTwo = Math.floor(Math.random() * Product.allProducts.length);
  productTwo.src = Product.allProducts[randomProductTwo].filepath;
  productTwo.alt = Product.allProducts[randomProductTwo].name;
  productTwo.title = Product.allProducts[randomProductTwo].name;
}

function randomProductThree() {
  var randomProductThree = Math.floor(Math.random() * Product.allProducts.length);
  productThree.src = Product.allProducts[randomProductThree].filepath;
  productThree.alt = Product.allProducts[randomProductThree].name;
  productThree.title = Product.allProducts[randomProductThree].name;
}

randomProductOne();
randomProductTwo();
randomProductThree();


