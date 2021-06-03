const addProductsBtn = document.getElementById("addProductsBtn");


let fetchApi = new FetchApi();
let productsList = [];
let indexNumber = 0;


window.addEventListener("load", loadallProducts);

function loadallProducts() {
  fetchApi.getAllProducts()
    .then(products => {
      productsList = products;
      productsList.forEach(product => addProductToTable(product));
    })
}

function addProductToTable(product) {
  console.log(product);
  indexNumber++;
  let tableBody = document.getElementById("tableBody");

  let tableRow = document.createElement("tr");
  tableRow.setAttribute("id", "row-" + product.id);
  tableRow.setAttribute("class", "mt-3");
  // tableRow.innerHTML = `<th scope="row">${indexNumber}</th>
  //                         <td><img src="${product.imageUrl}></td>
  //                         <td>${product.name}</td>
  //                         <td>${product.price}</td>
  //                         <td>${product.quantity}</td> 
  //                         <td>${product.description}</td>
  //                         <td>${product.price}</td>`;
  let tableIndex = document.createElement("th");
  tableIndex.setAttribute("scope", "row");
 
  // tableIndex.setAttribute("class", "d-flex justify-content-center");
  tableIndex.innerText = indexNumber;
  tableRow.appendChild(tableIndex);

  let tableImg = document.createElement("td");
  // tableImg.setAttribute("src", product.imageUrl);
  tableImg.innerHTML = `<img src="${product.imageUrl}">`;
  tableRow.appendChild(tableImg);

  let tableProductName = document.createElement("td");
  tableProductName.innerText = product.name;
  tableRow.appendChild(tableProductName);

  let tableProductPrice = document.createElement("td");
  tableProductPrice.innerText = product.price;
  tableRow.appendChild(tableProductPrice);

  let tableProductQuantity = document.createElement("td");
  tableProductQuantity.innerText = product.quantity;
  tableRow.appendChild(tableProductQuantity);

  let tableProductDescription = document.createElement("td");
  tableProductDescription.innerText = product.description;
  tableRow.appendChild(tableProductDescription);

  let editBtn = document.createElement('button');
  editBtn.setAttribute('class', "btn btn-primary me-3");
  editBtn.innerText = "Edit";
  // editBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   editGameById(product.id);
  // });

  let deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', "btn btn-primary");
  deleteBtn.innerText = "Delete";
  // deleteBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   if (gamesList.length < 3) {
  //     console.log("You cannot delete games")
  //   }else {
  //     deleteSelectedGame(game.id);
  //   };
  // });

  tableRow.appendChild(editBtn);
  tableRow.appendChild(deleteBtn);

  tableBody.appendChild(tableRow);

}

