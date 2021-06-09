function createPriceTd(product) {
  let tableProductPrice = document.createElement("td");
  tableProductPrice.innerHTML = `<i class="fas fa-dollar-sign"></i> ${product.price}`;
  tableProductPrice.setAttribute("class", "text-center");
  tableProductPrice.setAttribute("id", "price-" + product.id);
  return tableProductPrice
}

function createNameTd(product) {
  let tableProductName = document.createElement("td");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("class", "text-center");
  tableProductName.setAttribute("id", "name-" + product.id);
  return tableProductName;
}

function createDetailsButton(product) {
  let detailsButton = document.createElement("button");
  detailsButton.innerText = product.name;
  detailsButton.setAttribute("class", "btn text-info");
  detailsButton.setAttribute("id", "button-" + product.id);
  return detailsButton;
}

function createRemoveButton(tableRow) {
  let buttonsColumn = document.createElement("td");
  buttonsColumn.setAttribute("class", "text-center");
  tableRow.appendChild(buttonsColumn);
  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "btn-group");
  buttonsContainer.setAttribute("role", "group");
  buttonsContainer.setAttribute("aria-label", "Basic example");
  buttonsColumn.appendChild(buttonsContainer);

  let removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', "btn btn-primary ms-3 bg-danger");
  removeBtn.innerText = "Remove";
  buttonsContainer.appendChild(removeBtn);
}


function createTableIndex(indexNumber) {
  let tableIndex = document.createElement("th");
  tableIndex.setAttribute("scope", "row");
  tableIndex.setAttribute("class", "text-center");
  tableIndex.innerText = indexNumber;

  return tableIndex;
}


function goToDetailsPage(id) {
  window.location.href= "detailsPage.html?id=" + id;
}

export {
  createTableIndex,
  goToDetailsPage,
  createNameTd,
  createPriceTd,
  createRemoveButton,
  createDetailsButton
}