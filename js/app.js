'use strict';

//links variables to DOM elements.
var productOne = document.getElementById('image1');
var productTwo = document.getElementById('image2');
var productThree = document.getElementById('image3');
var imageList = document.getElementById('imageList');
var imagesTitle = document.getElementById('imagesTitle');
var resultsTitle = document.getElementById('resultsTitle');
resultsTitle.style.display = 'none';
var productChart = document.getElementById('productChart');
productChart.style.display = 'none';
var totalClicks = 0;
Product.all = [];
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//Product constructor
function Product(name) {
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  this.previous = false;
  Product.all.push(this);
}

//checks local storage upon page load.
function checkLocal() {
  if (localStorage && localStorage.getItem('Product.all')) {
    Product.all = JSON.parse(localStorage.getItem('Product.all'));
  } else {
    for (var i = 0; i < names.length; i++) {
      new Product(names[i]);
    }
  }
}

//random number generator
function getRandomNumber() {
  return Math.floor(Math.random() * Product.all.length);
}

/* This function displays the images on the page by creating an array to hold each displayed image (3 total), if the displayed image of index 1 matches index 0, it logs it as duplicate and generates a new random number for that index. The displayed image of index 2 does the same thing but compares to the result of both index 0 and 1.
*/
function displayImages() {
  var displayed = [];
  displayed[0] = getRandomNumber();
  while (Product.all[displayed[0]].previous) {
    displayed[0] = getRandomNumber();
  }
  displayed[1] = getRandomNumber();
  while (displayed[1] === displayed[0] || Product.all[displayed[1]].previous) {
    console.log('duplicate image.');
    displayed[1] = getRandomNumber();
  }
  displayed[2] = getRandomNumber();
  while (displayed[2] === displayed[0] || displayed[2] === displayed[1] || Product.all[displayed[2]].previous) {
    console.log('duplicate image.');
    displayed[2] = getRandomNumber();
  }
  Product.all[displayed[0]].views += 1;
  Product.all[displayed[1]].views += 1;
  Product.all[displayed[2]].views += 1;
  Product.all[displayed[0]].previous = true;
  Product.all[displayed[1]].previous = true;
  Product.all[displayed[2]].previous = true;
  productOne.src = Product.all[displayed[0]].filepath;
  productTwo.src = Product.all[displayed[1]].filepath;
  productThree.src = Product.all[displayed[2]].filepath;
  productOne.id = Product.all[displayed[0]].name;
  productTwo.id = Product.all[displayed[1]].name;
  productThree.id = Product.all[displayed[2]].name;
  for (var i = 0; i < Product.all.length; i++){
    if (!(displayed.includes(i))) {
      Product.all[i].previous = false;
    }
  }
}

//redisplays images once an image is clicked on.
function handleClick(e) {
  console.log(e.target.id);
  if (e.target.id === 'imageList') { // invalid selection indicator.
    alert('Invalid selection.');
    return;
  }
  totalClicks += 1;
  for (var i = 0; i < Product.all.length; i++) { //increments the votes property on the clicked image.
    if (e.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(Product.all[i].votes);
    }
  }
  if (totalClicks >= 25) { //Ends click EventListener and hides image display w/ header.
    imageList.removeEventListener('click', handleClick);
    localStorage.setItem('Product.all', JSON.stringify(Product.all));
    imageList.style.display = 'none';
    imagesTitle.style.display = 'none';
    resultsTitle.style.display = 'block';
    productChart.style.display = 'block';
    makeChart();
  }
  console.log('total clicks is ' + totalClicks);
  displayImages();
}

function makeChart () {
  var votes = [];
  for (var i = 0; i < Product.all.length; i++) {
    votes[i] = Product.all[i].votes;
  }
  var ctx = document.getElementById('productChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor:
        'rgba(68, 131, 206, 0.5)',
        borderColor:
        'rgba(251, 205, 0, 1)',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

checkLocal();
displayImages();
imageList.addEventListener('click', handleClick);