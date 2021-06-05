//global variables 
let fetchApi = new FetchApi();
let productsList = [];

//HTML variables
const mainContainer = document.querySelector("main");

//Event Listener to get all products from server
window.addEventListener("load", getAndDisplayProducts);

function getAndDisplayProducts() {
    fetchApi.getAllProducts()
      .then(products => {
        productsList = products;
        productsList.forEach(product => addProductsToDom(product));
      });
  };
function addProductsToDom(product) {
  console.log(product);
  let container = document.createElement('div');
  container.setAttribute("id", product.id);
  container.setAttribute("class", "col col-lg-3 col-md-4 col-sm-6");
  // container.innerHTML = ``


  mainContainer.appendChild(container);

}