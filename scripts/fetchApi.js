 class FetchApi {
   constructor() {
    //  this.baseUrl = "https://scoala-de-it-290fa-default-rtdb.europe-west1.firebasedatabase.app/";
    this.baseUrl = "https://ecommerceproject-4554b-default-rtdb.europe-west1.firebasedatabase.app/";
   }

   getAllProducts() {
     return fetch(this.baseUrl + ".json")
       .then(response => response.json())
       .then(productsListFromServer => {
         let convertedProducts = [];
         let productsIds = Object.keys(productsListFromServer);
         productsIds.forEach(productId => {
           convertedProducts.push(Product.fromServerProductModel(productsListFromServer[productId], productId));
         })
         return convertedProducts;
       });
   }

   getProduct(id) {
     return fetch(this.baseUrl + id + '.json')
       .then(response => response.json())
   }

   postProduct(product) {
     return fetch(this.baseUrl + '.json', {
         method: "POST",
         body: JSON.stringify(product)
       })
       .then(response => response.json())
   }

   updateProduct(product) {
     return fetch(this.baseUrl + product.id + '.json', {
         method: "PUT",
         body: JSON.stringify(product)
       })
       .then(response => response.json());
   }

   deleteProduct(id) {
     return fetch(this.baseUrl + id + '.json', {
         method: 'DELETE',
       })
       .then(response => response.json())
   }

 }