'use strict';

//links variables to DOM elements.
var productOne = document.getElementById('image1');
var productTwo = document.getElementById('image2');
var productThree = document.getElementById('image3');
var imageList = document.getElementById('imageList');
Product.list = document.getElementById('productList');
var totalClicks = 0;

//Instances array
Product.allProducts = [];
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//Product constructor
function Product(name) {
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.totalVotes = 0;
  this.totalViews = 0;
  Product.allProducts.push(this);
}

//random number generator
function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

//iterates through all names to generate each instance.
for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

/* This function displays the images on the page by creating an array to hold each displayed image (3 total), if the displayed image of index 1 matches index 0, it logs it as duplicate and generates a new random number for that index. The displayed image of index 2 does the same thing but compares to the result of both index 0 and 1.
*/
function displayImages() {
  var displayed = [];
  displayed[0] = getRandomNumber();
  displayed[1] = getRandomNumber();
  while (displayed[1] === displayed[0]) {
    console.log('duplicate image.');
    displayed[1] = getRandomNumber();
  }
  displayed[2] = getRandomNumber();
  while (displayed[2] === displayed[0] || displayed[2] === displayed[1]) {
    console.log('duplicate image.');
    displayed[2] = getRandomNumber();
  }
  Product.allProducts[displayed[0]].totalViews += 1;
  Product.allProducts[displayed[1]].totalViews += 1;
  Product.allProducts[displayed[2]].totalViews += 1;
  productOne.src = Product.allProducts[displayed[0]].filepath;
  productTwo.src = Product.allProducts[displayed[1]].filepath;
  productThree.src = Product.allProducts[displayed[2]].filepath;
  productOne.id = Product.allProducts[displayed[0]].name;
  productTwo.id = Product.allProducts[displayed[1]].name;
  productThree.id = Product.allProducts[displayed[2]].name;
}

//redisplays images once an image is clicked on.
function handleClick(e) {
  console.log(e.target.id);
  if (e.target.id === 'imageList') {
    alert('Invalid selection.');
    return;
  }
  totalClicks += 1;
  if (totalClicks >= 25) {
    imageList.removeEventListener('click', handleClick);
    imageList.style.display = 'none';
    showList();
  }
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (e.target.id === Product.allProducts[i].name) {
      Product.allProducts[i].totalVotes += 1;
      console.log(Product.allProducts[i].totalVotes);
    }
  }
  console.log('total clicks is ' + totalClicks);
  displayImages();
}

function showList() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    var conversion = (Product.allProducts[i].totalVotes / Product.allProducts[i].totalViews * 100).toFixed(1);
    liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].totalVotes + ' votes in ' + Product.allProducts[i].totalViews + ' views  for a click-through conversion rate of ' + conversion + '%';

    if (conversion > 49) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'green';
    }

    if (conversion < 30) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'red';
    }

    Product.list.appendChild(liEl);
  }
}

//initial display of images.
displayImages();
imageList.addEventListener('click', handleClick);