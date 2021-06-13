const form = document.getElementById("product-form");
const addProductsBtn = document.getElementById("addProductsBtn");
let productNameInput = document.getElementById("productNameInput");
let productImageInput = document.getElementById("productImageURLInput");
let productPriceInput = document.getElementById("productPriceInput");
let productQuantityInput = document.getElementById("productQuantityInput");
let productDescriptionInput = document.getElementById("productDescriptionInput");
const resetFormBtn = document.getElementById("resetBtn");
const closeFormBtn = document.getElementById("closeBtn");
const showFormButton = document.getElementById("showFormButton");
const updateProductBtn = document.getElementById("updateBtn");


let fetchApi = new FetchApi();
let productsList = [];
let indexNumber = 0;


window.addEventListener("load", loadAllProducts);

addProductsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addAndSaveProducts();
});

showFormButton.addEventListener("click", resetForm);

resetFormBtn.addEventListener("click", emptyFormInputs);

function emptyFormInputs() {
  resetForm();
  updateProductBtn.classList.add("collapse");
  addProductsBtn.classList.remove("collapse");
  closeFormBtn.classList.remove("collapse");
  resetFormBtn.classList.add("collapse");
};

function loadAllProducts() {
  indexNumber = 0;
  document.getElementById("tableBody").innerHTML = "";
  fetchApi.getAllProducts()
    .then(products => {
      productsList = products;
      productsList.forEach(product => addProductToTable(product));
      // renderTable();
    })
    .then(()=> {
      setTimeout(() => {
        document.querySelector(".loader").classList.add("hidden");
        document.querySelector("main").classList.remove("hidden");
      }, 3000);
    });
};

function renderTable() {
  indexNumber = 0;
  document.getElementById("tableBody").innerHTML = "";
  for(let i=0; i<productsList.length; i++){
    addProductToTable(productsList[i]);
  }
}

function addProductToTable(product) {
  let tableBody = document.getElementById("tableBody");

  let tableRow = document.createElement("tr");
  tableRow.setAttribute("id", product.id);
  tableRow.setAttribute("class", "mt-3 align-middle container-fluid");

  let tableIndex = document.createElement("th");
  tableIndex.setAttribute("scope", "row");
  tableIndex.setAttribute("class", "text-center");
  tableIndex.innerText = indexNumber++;
  tableRow.appendChild(tableIndex);

  let tableImg = document.createElement("td");
  tableImg.innerHTML = `<img id="img-${product.id}" class="img-fluid" src="${product.imageUrl}">`;
  tableImg.setAttribute("class", "text-center");
  tableRow.appendChild(tableImg);

  let tableProductName = document.createElement("td");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("id", "name-" + product.id);
  //creating button for details page
  let detailsButton = document.createElement("button");
  detailsButton.innerText = product.name;
  detailsButton.setAttribute("class", "btn text-info");
  detailsButton.setAttribute("id", "button-" + product.id);
  tableProductName.appendChild(detailsButton);
  tableRow.appendChild(tableProductName);
  //EventListener to got to the details page
  detailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToDetailsPage(product.id);
  });

  let tableProductPrice = document.createElement("td");
  tableProductPrice.innerHTML = `<i class="fas fa-dollar-sign"></i> ${product.price}`;
  tableProductPrice.setAttribute("class", "text-center");
  tableProductPrice.setAttribute("id", "price-" + product.id);
  tableRow.appendChild(tableProductPrice);

  let tableProductQuantity = document.createElement("td");
  tableProductQuantity.innerText = product.quantity;
  tableProductQuantity.setAttribute("class", "text-center");
  tableProductQuantity.setAttribute("id", "quantity-" + product.id);
  tableRow.appendChild(tableProductQuantity);

  let buttonsColumn = document.createElement("td");
  buttonsColumn.setAttribute("class", "text-center");
  tableRow.appendChild(buttonsColumn);

  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "btn-group");
  buttonsContainer.setAttribute("role", "group");
  buttonsContainer.setAttribute("aria-label", "Basic example");
  buttonsColumn.appendChild(buttonsContainer);

  let editBtn = document.createElement('button');
  editBtn.setAttribute('class', "btn btn-primary  bg-success");
  editBtn.innerText = "Edit";
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showFormButton.click();
    editProductById(product.id);
  });

  let deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', "btn btn-primary ms-3 bg-danger");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (productsList.length < 3) {
      console.log("You cannot delete games")
    } else {
      deleteSelectedProduct(product.id);
    };
  });

  buttonsContainer.appendChild(editBtn);
  buttonsContainer.appendChild(deleteBtn);

  tableBody.appendChild(tableRow);
  
  if(product.quantity === "0") {
    document.getElementById("img-"+product.id).setAttribute('src', OUT_OF_STOCK_IMG);
  };

};

function addAndSaveProducts() {
  let validation = validateForm();
  if (validation === true) {
    let addedProduct = getProductValuesFromForm();
    console.log(addedProduct);
    fetchApi.postProduct(addedProduct)
      .then(() => {
        productsList.push(addedProduct);
        resetForm();
        addProductToTable(addedProduct);
      })
      .then(()=> {
        loadAllProducts();
      });
  };
};


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
    inputField.classList.remove("invalid");
  };
  return validation;
};

//Function to reset the form after the form is submitted
function resetForm() {
  for (let i = 0; i < form.length; i++) {
    form[i].value = "";
    form[i].classList.remove("invalid");
  };
};

//Function to create a new product based on the values from the input fields
function getProductValuesFromForm() {
  let productImg = productImageInput.value.trim();
  let productName = productNameInput.value.trim();
  let productPrice = productPriceInput.value.trim();
  let productQuantity = productQuantityInput.value.trim();
  let productDescription = productDescriptionInput.value.trim();

  let newProduct = new Product(productImg, productName, productPrice, productQuantity, productDescription);

  return newProduct;
}


function editProductById(productId) {
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === productId) {
      displaySelectedProductToForm(productsList[i]);
      updateProductBtn.addEventListener("click", (e) => {
        e.preventDefault();
        saveUpdatedProduct(productsList[i]);
      });
    };
  };
};

//Function to fill the content of the inputs with the values from the stored product that we want to edit
function displaySelectedProductToForm(product) {
  productImageInput.value = product.imageUrl;
  productNameInput.value = product.name;
  productPriceInput.value = product.price;
  productQuantityInput.value = product.quantity;
  productDescriptionInput.value = product.description;
  updateProductBtn.classList.remove("collapse");
  addProductsBtn.classList.add("collapse");
  closeFormBtn.classList.add("collapse");
  resetFormBtn.classList.remove("collapse");
};


function saveUpdatedProduct(product) {
  let validation = validateForm();

  if (validation) {
    let updatedProductObj = getProductValuesFromForm();
    updatedProductObj.id = product.id;

    fetchApi.updateProduct(updatedProductObj)
      .then(() => {
        updateProductInterface(product, updatedProductObj);
        resetForm();
      });
  };
}

function updateProductInterface(product, updatedProductObj) {

  updateProductBtn.classList.add("collapse");
  addProductsBtn.classList.remove("collapse");
  closeFormBtn.classList.remove("collapse");
  resetFormBtn.classList.add("collapse");
  product.imageUrl = updatedProductObj.imageUrl;
  product.name = updatedProductObj.name;
  product.price = updatedProductObj.price;
  product.quantity = updatedProductObj.quantity;
  product.description = updatedProductObj.description;

  document.getElementById("img-" + product.id).setAttribute("src", product.imageUrl);
  document.getElementById("name-" + product.id).innerText = product.name;
  document.getElementById("price-" + product.id).innerText = product.price;
  document.getElementById("quantity-" + product.id).innerText = product.quantity;
};

function deleteSelectedProduct(productId) {
  fetchApi.deleteProduct(productId)
    .then((removeProductById(productId)));
};

function removeProductById(id) {
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      productsList.splice(i, 1);
      let node = document.getElementById(id);
      node.parentNode.removeChild(node);
      renderTable();
    };
  };
 
}


function goToDetailsPage(id) {
  // window.open("detailsPage.html?id=" + id);
  window.location.href= "detailsPage.html?id=" + id;
}