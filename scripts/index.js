//global variables 
let fetchApi = new FetchApi();
let productsList = [];

//HTML variables
const rowContainer = document.getElementById("rowContainer");

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
  container.setAttribute("class", "mh-25 text-center mt-2 col col-lg-3 col-md-4 col-sm-6");
  container.innerHTML = `<img class=" img-fluid mh-50" src="${product.imageUrl}">
  <h2>${product.name}</h2>
  <p><i class="fas fa-dollar-sign"></i> ${product.price}</p> `;
  let detailsButton = document.createElement("button");
  detailsButton.innerText = "Details";
  detailsButton.setAttribute("class", "btn btn-primary");
  container.appendChild(detailsButton);
  detailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToDetailsPage(product.id);
  });

  rowContainer.appendChild(container);
}


function goToDetailsPage(id) {
  // window.open("detailsPage.html?id=" + id);
  window.location.href= "HTML/detailsPage.html?id=" + id;
}