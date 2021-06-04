class Product {
  constructor(imageUrl, name, price, quantity,description, id) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.name = name;
    
  }

  static fromServerProductModel(productsFromServer, id) {
    return new Product( //actual id from server
      productsFromServer.imageUrl, 
      productsFromServer.name,
      productsFromServer.price,
      productsFromServer.quantity,     
      productsFromServer.description,       
      id);  
  }
}