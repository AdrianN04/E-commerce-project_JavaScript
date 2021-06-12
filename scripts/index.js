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
  // console.log(product);
  let container = document.createElement('div');
  container.setAttribute("id", product.id);
  container.setAttribute("class", "text-center mt-3 col-lg-3 col-md-4 col-sm-6");
  container.innerHTML = `<img id="img-${product.id}" class="img-fluid h-100" src="${DEFAULT_IMG}">
  <h2 class="fs-3">${product.name}</h2>
  <p class="fs-3"><i class="fas fa-dollar-sign"></i> ${product.price}</p> `;
  let buttonsContainer = document.createElement("p");
  buttonsContainer.setAttribute("class", "text-center")
  let detailsButton = document.createElement("button");
  detailsButton.innerText = "Details";
  detailsButton.setAttribute("class", "btn bg-success me-2");
  let cartButton = document.createElement("button");
  cartButton .innerText = "Add to cart";
  cartButton .setAttribute("class", "btn bg-primary");
  container.appendChild(buttonsContainer);
  buttonsContainer.appendChild(detailsButton);
  buttonsContainer.appendChild(cartButton );
  detailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToDetailsPage(product.id);
  });

  rowContainer.appendChild(container);

  if(product.quantity === "0") {
    document.getElementById("img-"+product.id).setAttribute('src', OUT_OF_STOCK_IMG);
  }else {
    fetch(product.imageUrl)
    .then(response => {
        if(response.ok) {
          document.getElementById("img-"+product.id).setAttribute('src', product.imageUrl);
        }else {
          throw new Error("Img error");
        };
    })
    .catch(error => {
      console.log(error, "Url not found");
    });
  };
};

function goToDetailsPage(id) {
  // window.open("detailsPage.html?id=" + id);
  window.location.href= "HTML/detailsPage.html?id=" + id;
}