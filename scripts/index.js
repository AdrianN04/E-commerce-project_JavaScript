//global variables 
let fetchApi = new FetchApi();
let productsList = [];


//HTML variables
const rowContainer = document.getElementById("rowContainer");

//Event Listener to get all products from server
window.addEventListener("load", getAndDisplayProducts);

function getAndDisplayProducts() {
  
    fetchApi.getAllProducts()
      .then(products => {
        productsList = products;
        productsList.forEach(product => addProductsToDom(product));
      })
      .then(()=> {
        fetchApi.afterLoad();
      });
  };

  //Function to create the content of the page
function addProductsToDom(product) {
  // console.log(product);
  let container = document.createElement('div');
  container.setAttribute("id", product.id);
  container.setAttribute("class", "text-center mt-3 col-lg-3 col-md-4 col-sm-6 divHover");
  container.innerHTML = `<img id="img-${product.id}" class="img-fluid h-100" src="${DEFAULT_IMG}">
  <h2 class="mt-2 fs-3">${product.name}</h2>
  <p class="fs-3"><i class="fas fa-dollar-sign"></i> ${product.price}</p> `;
  let buttonsContainer = document.createElement("p");
  buttonsContainer.setAttribute("class", "text-center")
  let detailsButton = document.createElement("button");
  detailsButton.innerText = "Details";
  detailsButton.setAttribute("class", "btn bg-success me-2");
  let cartButton = document.createElement("button");
  // cartButton.innerHTML = `<button class="text-center btn bg-primary text-light">Add to Cart<i id="plusOnBtn-${product.id}" class="hidden ms-2 bg-success fas fa-plus-square"></i></button>`;
  cartButton.innerText = "Add to cart";
  cartButton.setAttribute("class", "btn bg-primary text-light");
  let plusOnBtn = document.createElement("i");
  plusOnBtn.setAttribute("id", "plusOnBtn-"+product.id);
  plusOnBtn.setAttribute("class", "hidden ms-2 bg-success fas fa-plus-square");
  container.appendChild(buttonsContainer);
  buttonsContainer.appendChild(detailsButton);
  buttonsContainer.appendChild(cartButton );
  buttonsContainer.appendChild(plusOnBtn);
  detailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToDetailsPage(product.id);
  });

  if(product.quantity >= 1) {
    cartButton.addEventListener("click", (e)=> {
      e.preventDefault();
      setProductsToLocalStorage(product.id);
    });
  } else {
    cartButton.disabled = true;
    
  };
  
  let message= document.createElement("p");
  message.setAttribute("id", "msg-"+product.id);
  message.setAttribute("class", "hidden");
  message.innerText ="Already in your cart";
  container.appendChild(message);
  rowContainer.appendChild(container);

  if(product.quantity === "0") {
    document.getElementById("img-"+product.id).setAttribute('src', OUT_OF_STOCK_IMG);
  }else {
    fetch(product.imageUrl)
    .then(response => {
        if(response.ok) {
          document.getElementById("img-"+product.id).setAttribute('src', product.imageUrl);
        }else {
          throw new Error("Img error");
        };
    })
    .catch(error => {
      console.log(error, "Url not found");
    });
  };
};

function goToDetailsPage(id) {
  window.location.href= "HTML/detailsPage.html?id=" + id;
};

//Function to add a product to the cart
function setProductsToLocalStorage(id) {
  let storedQuantity = localStorage.getItem(id);
  if (storedQuantity !== null) {
    document.getElementById("msg-"+id).classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("msg-"+id).classList.add("hidden")
    }, 1000);
    console.log("already in cart");
  } else {
    localStorage.setItem(id, 1);
    document.getElementById("plusOnBtn-"+id).classList.remove("hidden");
    document.getElementById("plusOnBtn-"+id).classList.add("transale");
    setTimeout(() => {
      document.getElementById("plusOnBtn-"+id).classList.add("hidden");
    }, 500);
    document.getElementById("plusSign").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("plusSign").classList.add("hidden");
      }, 1500);
  };
};