// import { FetchApi } from "./fetchApi";

// let storageId = window.localStorage.getItem(storageId);
// let storageId = window.localStorage.key()
// console.log(storageId);
window.addEventListener("load", retrieveKeysFromStorage);
let cartList = [];
let cartFetchApi = new FetchApi();

let keyList = [];
function retrieveKeysFromStorage() {
  for(let i=0; i < localStorage.length; i++) {
    let keyId = window.localStorage.key(i);
    console.log(keyId);
    keyList.push(keyId);
  }
  
}


function getAndDisplayCartProducts() {
  cartFetchApi.getAllProducts()
      .then(products => {
        console.log(products)
        
        // cartList = products;
        // productsList.forEach(product => addProductsToDom(product));
      });
  };