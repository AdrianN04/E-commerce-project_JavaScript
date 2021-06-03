class Product {
  constructor( description, imageUrl, quantity, name, price, id) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  static fromServerProductModel(productsFromServer, id) {
    return new Product( //actual id from server
      productsFromServer.name, 
      productsFromServer.quantity,
      productsFromServer.price, 
      productsFromServer.description, 
      productsFromServer.imageUrl,       
      id);
  }
}