const form = document.getElementById("product-form");
const inputFields = document.querySelector('input');
const addProductsBtn = document.getElementById("addProductsBtn");
let productNameInput = document.getElementById("productNameInput");
let productImageInput = document.getElementById("productImageURLInput");
let productPriceInput = document.getElementById("productPriceInput");
let productQuantityInput = document.getElementById("productQuantityInput");
let productDescriptionInput = document.getElementById("productDescriptionInput");
const reloadBtn = document.getElementById("reloadBtn");


let fetchApi = new FetchApi();
let productsList = [];
let indexNumber = 0;


window.addEventListener("load", loadAllProducts);

addProductsBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  addAndSaveProducts();
});


function loadAllProducts() {
  fetchApi.getAllProducts()
    .then(products => {
      productsList = products;
      productsList.forEach(product => addProductToTable(product));
    });
};



function addProductToTable(product) {
  console.log(product);
 
  indexNumber++;
  let tableBody = document.getElementById("tableBody");

  let tableRow = document.createElement("tr");
  tableRow.setAttribute("id", "row-" + product.id);
  tableRow.setAttribute("class", "mt-3 align-middle");
  // tableRow.innerHTML = `<th scope="row">${indexNumber}</th>
  //                         <td><img src="${product.imageUrl}></td>
  //                         <td>${product.name}</td>
  //                         <td>${product.price}</td>
  //                         <td>${product.quantity}</td> 
  //                         <td>${product.description}</td>
  //                         <td>${product.price}</td>`;
  let tableIndex = document.createElement("th");
  tableIndex.setAttribute("scope", "row");
  tableIndex.setAttribute("class", "text-center");
 
  // tableIndex.setAttribute("class", "d-flex justify-content-center");
  tableIndex.innerText = indexNumber;
  tableRow.appendChild(tableIndex);

  let tableImg = document.createElement("td");
  // tableImg.setAttribute("src", product.imageUrl);
  tableImg.innerHTML = `<img class src="${product.imageUrl}">`;
  tableImg.setAttribute("class", "text-center");
  tableRow.appendChild(tableImg);

  let tableProductName = document.createElement("td");
  tableProductName.innerText = product.name;
  tableProductName.setAttribute("class", "text-center");
  tableRow.appendChild(tableProductName);

  let tableProductPrice = document.createElement("td");
  tableProductPrice.innerText = product.price;
  tableProductPrice.setAttribute("class", "text-center");
  tableRow.appendChild(tableProductPrice);

  let tableProductQuantity = document.createElement("td");
  tableProductQuantity.innerText = product.quantity;
  tableProductQuantity.setAttribute("class", "text-center");
  tableRow.appendChild(tableProductQuantity);

 /*
  let tableProductDescription = document.createElement("td");
  tableProductDescription.innerText = product.description;
  tableRow.appendChild(tableProductDescription);
*/
  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "btn-group mt-3");
  buttonsContainer.setAttribute("role", "group");
  buttonsContainer.setAttribute("aria-label", "Basic example");
  
  let editBtn = document.createElement('button');
  editBtn.setAttribute('class', "btn btn-primary ms-3 bg-success");
  editBtn.innerText = "Edit";
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    document.getElementById("showFormButton").click();
    // editGameById(product.id);
  });

  let deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', "btn btn-primary bg-danger");
  deleteBtn.innerText = "Delete";
  // deleteBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   if (gamesList.length < 3) {
  //     console.log("You cannot delete games")
  //   }else {
  //     deleteSelectedGame(game.id);
  //   };
  // });

  buttonsContainer.appendChild(editBtn);
  buttonsContainer.appendChild(deleteBtn);
  tableRow.appendChild(buttonsContainer);

  tableBody.appendChild(tableRow);

}

function addAndSaveProducts() {
  let validation = validateForm();
  if(validation === true) {
    let addedProduct = getProductValuesFromForm();
    console.log(addedProduct);
    fetchApi.postProduct(addedProduct)
    .then(()=> {
      productsList.push(addedProduct);
      resetForm();
      addProductToTable(addedProduct);
    });
  }
}


//Function to check if the inputs are filled
function validateForm() {
  let validInput = true;
  for (let i = 0; i < form.length; i++) {
    let answer = inputIsValid(form[i]);
    if (answer === false) {
      validInput = false;
    };
  };
  return validInput;
}

//Function to validate input fields
function inputIsValid(inputField) {
  let validation;
  if (inputField.value === "") {
    validation = false;
    inputField.classList.add("invalid");
  } else {
    validation = true;
    inputField.classList.remove("invalid")
  };
  return validation;
};

//Function to reset the form after the form is submitted
function resetForm() {
  for (let i = 0; i < form.length; i++) {
    form[i].value = "";
  };
};

function getProductValuesFromForm() {
  let productImg = productImageInput.value.trim();
  let productName = productNameInput.value.trim();
  let productPrice = productPriceInput.value.trim();
  let productQuantity = productQuantityInput.value.trim();
  let productDescription = productDescriptionInput.value.trim();
 

  let newProduct = new Product(productImg, productName, productPrice, productQuantity, productDescription);

  return newProduct;
}