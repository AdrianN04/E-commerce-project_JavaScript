//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
// console.log(idRecieved);

// HTML variables
const detailsContainer = document.getElementById('detailsContainer');
let productInput = document.querySelector("input");

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

  document.getElementById("cartButtonContainer").addEventListener("click", (e) => {
    e.preventDefault();
      let input = checkInput(product);
      if(input !== undefined) {
        console.log(input)
        setProductsToLocalStorage(product.id, input);
      }
  });
}

function setProductsToLocalStorage(id, qty) {
  localStorage.setItem(id, qty);
}

function checkInput(product) {
  let alert =  document.getElementById("alert");
  let message = document.getElementById("message");
 
    let valueFromInput = parseInt(productInput.value);
    if(valueFromInput < 1 || productInput.value === "") {
      showAction(alert, "Please insert a number!", false);
      message.classList.add("hidden");
    } 
    else if(valueFromInput > parseInt(product.quantity)) {
      showAction(alert, "Over stock limit!", false);
      message.classList.add("hidden");
    } 
    else {
      showAction(message, `${valueFromInput} x ${product.name} added to your shopping cart &#128513;`, true);
      return valueFromInput;
    };
    
};


function showAction(element, text, value) {
  if (value === true) {
    element.classList.remove("hidden");
    element.innerHTML = text;
    productInput.value = '';
  } else {
    element.classList.remove("hidden");
    element.innerHTML = text;
    productInput.value = '';
    setTimeout(function () {
      element.classList.add("hidden");
    }, 2000)
  }
}
