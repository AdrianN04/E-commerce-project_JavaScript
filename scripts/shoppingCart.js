// import { FetchApi } from "./fetchApi";


window.addEventListener("load", retrieveKeysFromStorage);
window.addEventListener("load", getAndDisplayCartProducts);

let cartFetchApi = new FetchApi();
let cartList = [];
let keyList = [];
let indexNumber = 0;
let listOfPrices = [];

function retrieveKeysFromStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let keyId = localStorage.key(i);
    keyList.push(keyId)
  }
}


function getAndDisplayCartProducts() {
  for (let i = 0; i < keyList.length; i++) {
    let keyId = keyList[i];
    if (keyId !== undefined) {
      cartFetchApi.getProduct(keyId)
        .then(response => {
          response.id = keyId;
          cartList.push(response);
          addProductsToCart(response);
        })
        .then(() => {
          let sumOfPrices = listOfPrices.reduce(function(a, b){
            return a + b;
          }, 0);
          document.getElementById("totalPrice").innerHTML =`Total:  <i class="fas fa-dollar-sign"></i> ${sumOfPrices}`;
        });
    };
  };
};


function addProductsToCart(product) {
  // console.log(product)
  indexNumber++;
  let tableBody = document.getElementById("cartTableBody");

  //Table row
  let tableRow = document.createElement("tr");
  tableRow.setAttribute("id", product.id);
  tableRow.setAttribute("class", "mt-3 align-middle container-fluid");

  //Table td for index number
  let tableIndex = createTableIndex(indexNumber);
  tableRow.appendChild(tableIndex);

  //Table td for image
  let tableImg = document.createElement("td");
  tableImg.innerHTML = `<img id="img-${product.id}" class="img-fluid" src="${DEFAULT_IMG}">`;
  tableImg.setAttribute("class", "text-center");
  tableRow.appendChild(tableImg);

  //Table td for product name
  let tableProductName = createNameTd(product);
  //button to go to details page
  let detailsButton = createDetailsButton(product);

  tableProductName.appendChild(detailsButton);
  tableRow.appendChild(tableProductName);
  //EventListener to got to the details page
  detailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToDetailsPage(product.id);
  });

  //Table td for product price
  let tableProductPrice = createPriceTd(product)
  tableRow.appendChild(tableProductPrice);

  //Table td for quantity from localStorage
  let tableProductQuantity = document.createElement("td");
  tableProductQuantity.setAttribute("class", "text-center");
  tableProductQuantity.setAttribute("id", "quantity-" + product.id);
  //Button to reduce the quantity from shopping cart
  let decreaseBtn = document.createElement("button");
  decreaseBtn.setAttribute("class", "btn col-lg-4 col-sm-12");
  decreaseBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`;
  //Quantity added to the cart
  let cartQty = localStorage.getItem(product.id);
  let productQty = document.createElement("span");
  productQty.setAttribute("class", "col-lg-4 col-sm-12 ms-2 me-2");
  productQty.setAttribute("id", "qty-"+product.id);
  productQty.innerText = cartQty;
  //Button to increase the quantity from shopping cart
  let increaseBtn = document.createElement("button");
  increaseBtn.setAttribute("class", "btn col-lg-4 col-sm-12");
  increaseBtn.innerHTML = `<i class="fas fa-plus-circle"></i>`;

  // tableProductQuantity.innerHTML =`<button class="btn container-fluid" onclick="decreaseQty(${product})"><i class="fas fa-minus-circle"></i></button> <span class="container-fluid">${cartQty}</span> <button class="btn container-fluid"><i class="fas fa-plus-circle"></i></button>`;

  tableProductQuantity.appendChild(decreaseBtn);
  tableProductQuantity.appendChild(productQty);
  tableProductQuantity.appendChild(increaseBtn);
  tableRow.appendChild(tableProductQuantity);

  //Event Listener to decrease the quantity of the cart
  decreaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    decreaseQty(product);
  });
  //Event Listener to decrease the quantity of the cart
  increaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    increaseQty(product);
  });

  //Table td for subtotal price
  let tableProductSubTotal = document.createElement("td");
  let subTotalPrice = parseInt(product.price) * cartQty;
  tableProductSubTotal.innerHTML = '<i class="fas fa-dollar-sign"></i> ' + subTotalPrice;
  tableProductSubTotal.setAttribute("class", "text-center");
  tableProductSubTotal.setAttribute("id", "subTotal-" + product.id);
  tableRow.appendChild(tableProductSubTotal);
  listOfPrices.push(subTotalPrice);

  let buttonsContainer = createRemoveButton(tableRow);
  let removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', "btn btn-primary ms-3 bg-danger");
  removeBtn.innerText = "Remove";
  buttonsContainer.appendChild(removeBtn);

  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeItemFromCart(product.id);
  });

  tableBody.appendChild(tableRow);

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

}

function createPriceTd(product) {
  let tableProductPrice = document.createElement("td");
  tableProductPrice.innerHTML = `<i class="fas fa-dollar-sign"></i> ${product.price}`;
  tableProductPrice.setAttribute("class", "text-center");
  tableProductPrice.setAttribute("id", "price-" + product.id);
  return tableProductPrice;
};

function createNameTd(product) {
  let tableProductName = document.createElement("td");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("id", "name-" + product.id);
  return tableProductName;
};

function createDetailsButton(product) {
  let detailsButton = document.createElement("button");
  detailsButton.innerText = product.name;
  detailsButton.setAttribute("class", "btn text-info");
  detailsButton.setAttribute("id", "button-" + product.id);
  return detailsButton;
};

function createRemoveButton(tableRow) {
  let buttonsColumn = document.createElement("td");
  buttonsColumn.setAttribute("class", "text-center");
  tableRow.appendChild(buttonsColumn);
  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "btn-group");
  buttonsContainer.setAttribute("role", "group");
  buttonsContainer.setAttribute("aria-label", "Basic example");
  buttonsColumn.appendChild(buttonsContainer);

  return buttonsColumn;
  
};


function createTableIndex(indexNumber) {
  let tableIndex = document.createElement("th");
  tableIndex.setAttribute("scope", "row");
  tableIndex.setAttribute("class", "text-center");
  tableIndex.innerText = indexNumber;

  return tableIndex;
};


function goToDetailsPage(id) {
  window.location.href = "detailsPage.html?id=" + id;
}

function removeItemFromCart(id) {
  for(let i=0; i< cartList.length; i++){
    if(cartList[i].id === id) {
      localStorage.removeItem(id);
      cartList.splice(i, 1);
      let node = document.getElementById(id);
      node.parentNode.removeChild(node);
    };
  };
};

function decreaseQty(product) {
  let storedQuantity = localStorage.getItem(product.id);
  let decreasedProductQty = parseInt(storedQuantity) - 1;
  if (decreasedProductQty >= 1) {
    localStorage.setItem(product.id, decreasedProductQty);
    document.getElementById("qty-"+ product.id).innerText = decreasedProductQty;
      // showAction(message, `${newQty} x ${product.name} added to your shopping cart &#128513;`, true);
    } else {
      // showAction(message, "The quantity you want is bigger than the actual stock! please check your cart!", true);
      console.log("You cannot go under 1");
    };
};

function increaseQty(product) {
  let storedQuantity = localStorage.getItem(product.id);
  let increasedProductQty = parseInt(storedQuantity) + 1;
  console.log(increasedProductQty)
  if (increasedProductQty <= product.quantity) {
    localStorage.setItem(product.id, increasedProductQty);
    document.getElementById("qty-"+ product.id).innerText = increasedProductQty;
    // showAction(message, `${newQty} x ${product.name} added to your shopping cart &#128513;`, true);
  } else {
    // showAction(message, "The quantity you want is bigger than the actual stock! please check your cart!", true);
    console.log("You cannot exceed stock quantity");
  };
};