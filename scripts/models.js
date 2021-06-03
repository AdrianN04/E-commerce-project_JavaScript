class Product {
  constructor( descriere, imageUrl, disponibilitate, nume, pret, id) {
    this.id = id;
    this.descriere = descriere;
    this.pret = pret;
    this.disponibilitate = disponibilitate;
    this.nume = nume;
    this.imageUrl = imageUrl;
  }

  static fromServerProductModel(productsFromServer, id) {
    return new Product( //actual id from server
      productsFromServer.nume, 
      productsFromServer.disponibilitate,
      productsFromServer.pret, 
      productsFromServer.descriere, 
      productsFromServer.imageUrl,       
      id);
  }
}