//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
// console.log(idRecieved);

// HTML variables
const detailsContainer = document.getElementById('detailsContainer');
let productInput = document.querySelector("input");
// cartButtonContainer = document.getElementById("cartButtonContainer");

//fetch
let fetchProductApi = new FetchApi();


//Event Listener
window.addEventListener('load', getResourcesFromPage);

//fetch API
function getResourcesFromPage() {
  fetchProductApi.getProduct(idRecieved)
    .then(responseItem => {
      displayProductDetails(responseItem);
    })
}

function displayProductDetails(product) {
  
  product.id = idRecieved;
  console.log(product);
  document.getElementById("imageContainer").innerHTML = `<img
  class="img-fluid"
  src="${product.imageUrl}"/>`;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDescription").innerText = product.description;
  document.getElementById("productPrice").innerHTML =`<i class="fas fa-dollar-sign"></i>  ${product.price}`;
  document.getElementById("productQuantity").innerText ="Products in stoc: " + product.quantity;
  
  //This is a backup for HTML
  /*
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
  Available products in stoc: ${product.quantity}</p>`;
*/
  // let goToCartButton = document.createElement("button");
  // goToCartButton.setAttribute("class", "btn btn-primary");
  // goToCartButton.innerText = "Add to Cart"
  // document.getElementById("cartButtonContainer").appendChild(goToCartButton);

  document.getElementById("cartButtonContainer").addEventListener("click", (e) => {
    e.preventDefault();
      let input = checkInput(product);
      console.log(input)
      // setProductsToLocalStorage(product);
  });
}


function checkInput(product) {
  let alert =  document.getElementById("alert");
  let message = document.getElementById("message");
  if(productInput.value === ""){
    showAction(message, `Please add the number of products &#128513;`, false);
  }else {
    let valueFromInput = parseInt(productInput.value);
    if(valueFromInput < 1) {
      showAction(alert, "Please insert a valid number!", false);
      message.classList.add("collapse");
    } 
    else if(valueFromInput > parseInt(product.quantity)) {
      showAction(alert, "Over stock limit!", false);
      message.classList.add("collapse");
    } 
    else {
      showAction(message, `${valueFromInput} x ${product.name} added to your shopping cart &#128513;`, true);
      return valueFromInput;
    };
  };
};


function showAction(element, text, value) {
  if (value === true) {
    // element.classList.add('success');
    element.classList.remove("collapse");
    element.innerHTML = text;
    productInput.value = '';
    // setTimeout(function () {
    //   element.classList.remove('success');
    //   // element.classList.add("collapse");
    // }, 2000)
  } else {
    element.classList.add('alert');
    element.classList.remove("collapse");
    element.innerHTML = text;
    productInput.value = '';
    setTimeout(function () {
      element.classList.remove('alert');
      element.classList.add("collapse");
    }, 2000)
  }
}
