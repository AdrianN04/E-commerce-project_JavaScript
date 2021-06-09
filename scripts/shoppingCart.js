// import { FetchApi } from "./fetchApi";


window.addEventListener("load", retrieveKeysFromStorage);
window.addEventListener("load", getAndDisplayCartProducts);

let cartFetchApi = new FetchApi();
let cartList = [];
let keyList = [];
let indexNumber =0;

function retrieveKeysFromStorage() {
  for(let i=0; i < localStorage.length; i++) {
    let keyId =  localStorage.key(i);
    keyList.push(keyId)
  }
}


function getAndDisplayCartProducts() {
    for(let i=0; i < keyList.length; i++) {      
      let keyId = keyList[i];   
      if(keyId !== undefined){
        cartFetchApi.getProduct(keyId)
        .then(response => {
          response.id = keyId;
          addProductsToCart(response)
        });
      };
    };
  };

  function addProductsToCart(product) {
    console.log(product)
    indexNumber++;
    let tableBody = document.getElementById("cartTableBody");
    
  
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("id", product.id);
    tableRow.setAttribute("class", "mt-3 align-middle container-fluid");
    tableBody.appendChild(tableRow);

    let tableIndex = document.createElement("th");
    tableIndex.setAttribute("scope", "row");
    tableIndex.setAttribute("class", "text-center");
    tableIndex.innerText = indexNumber;
    tableRow.appendChild(tableIndex);
  }

