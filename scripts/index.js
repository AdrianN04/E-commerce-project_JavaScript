//global variables 
var fetchApi = new FetchApi();
var productsList = [];


//Event Listener to get all products from server
window.addEventListener("load", getAndDisplayProducts);

function getAndDisplayProducts() {
  fetchApi.getAllProducts()
  .then(games => {
    productsList = games;
    productsList.forEach(game => addProductsToDom(game));
  })
}

function addProductsToDom(game) {
  
}