//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
let fetchProductApi = new FetchApi();
// console.log(idRecieved);

// HTML variables
const detailsContainer = document.getElementById('detailsContainer');
let productInput = document.querySelector("input");
let alert = document.getElementById("alert");
let message = document.getElementById("message");
//fetch



//Event Listener
window.addEventListener('load', getResourcesFromPage);

//fetch API
function getResourcesFromPage() {
  fetchProductApi.getProduct(idRecieved)
    .then(responseItem => {
      displayProductDetails(responseItem);
    })
    .then(()=> {
      fetchProductApi.afterLoad();
    });
};

function displayProductDetails(product) {
  product.id = idRecieved;
  // console.log(product);
  document.getElementById("imageContainer").innerHTML = `<img id="img-${product.id}" class="img-fluid" src="${DEFAULT_IMG}">`;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDescription").innerText = product.description;
  document.getElementById("productPrice").innerHTML = `<i class="fas fa-dollar-sign"></i>  ${product.price}`;
  if(product.quantity === "0") {
    document.getElementById("productQuantity").innerText = "Out of stock";
    document.getElementById("productQuantity").classList.add("text-danger");
  }else {
    document.getElementById("productQuantity").innerText = "Products in stoc: " + product.quantity;
  };

  if(product.quantity === "0") {
    document.getElementById("cartButtonContainer").disabled = true;
  }else {
    document.getElementById("cartButtonContainer").addEventListener("click", (e) => {
      e.preventDefault();
      let input = checkInput(product);
      if (input !== undefined) {
        setProductsToLocalStorage(product.id, input, product);
      }
    });
  };
 
  setTimeout(() => {
    fetch(product.imageUrl)
    .then(response => {
        if(response.ok) {
          document.getElementById("img-"+product.id).setAttribute('src', product.imageUrl);
        }else {
          throw new Error("Img error");
        }
    })
    .catch(error => {
      console.log(error, "Url not found");
    });
  }, 500);
};

function setProductsToLocalStorage(id, qty, product) {
  let storedQuantity = localStorage.getItem(id);
  if (storedQuantity !== null) {
    let newQty = parseInt(storedQuantity) + qty;
    console.log(newQty)
    if (newQty <= parseInt(product.quantity)) {
      localStorage.setItem(id, newQty);
      showAction(message, `${newQty} x ${product.name} added to your shopping cart &#128513;`, true);
    } else {
      showAction(message, "The quantity you want is bigger than the actual stock! please check your cart!", true);
    };

  } else {
    localStorage.setItem(id, qty);
  };

};

function checkInput(product) {
 
  let valueFromInput = parseInt(productInput.value);
  if (valueFromInput < 1 || productInput.value === "") {
    showAction(alert, "Please insert a number!", false);
    message.classList.add("hidden");
  } else if (valueFromInput > parseInt(product.quantity)) {
    showAction(alert, "Over stock limit!", false);
    message.classList.add("hidden");
  } else {
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