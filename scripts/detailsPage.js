//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
console.log(idRecieved);

// HTML variables
const detailsContainer = document.getElementById('detailsContainer');

let fetchProductApi = new FetchApi();

window.addEventListener('load', getResourcesFromPage);

//fetch API
function getResourcesFromPage() {
  fetchProductApi.getProduct(idRecieved)
    .then(responseItem => {
      displayProductDetails(responseItem);
    })
}

function displayProductDetails(product) {
  console.log(product);
  // let imageContainer = document.createElement("div");
  // imageContainer.setAttribute("class", "mt-5 text-center col col-lg-4 col-md-6 col-sm-10");
  document.getElementById("imageContainer").innerHTML = `<img
  class="img-fluid"
  src="${product.imageUrl}"/>`;
 

  
  document.getElementById("productDetails").innerHTML = `<h2 id="productName" class="container-fluid text-center">
  ${product.name}
  </h2>
  <p id="productDescription" class="container-fluid text-center">
    ${product.description}
  </p>
  <p id="productPrice" class="container-fluid text-center mb-4 border-bottom">
    $${product.price}
  </p>
  <p id="productQuantity" class="container-fluid text-center">
  Available products in stoc: ${product.quantity}</p>
  <div class="col-sm-6 m-auto">
    <div class="input-group">
      <div class="input-group-text bg-info">Quantity</div>
      <input type="number" class="form-control"  min="1" id="" placeholder="7...">
    </div>
  </div>
  <div class="mt-5 text-center">
  <button type="button" class="btn btn-primary">Add to Cart</button>
  </div>`;

}