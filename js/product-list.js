class ProductList {
    constructor(cart) {
        this.cart = cart;
        this.container = document.querySelector(".products-container");
        this.productService = new ProductsService();
        this.productService.getProducts().then(()=>this.renderProducts()).then(()=>this.addEventListeners());
    }
    async renderProducts() {
        let productListDomString = "";
        const products = await this.productService.getProducts();
        products.forEach(product=>{
            productListDomString += `<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-7">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.category}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-outline-info rounded-lg" data-toggle="modal"
                          data-target="#productInfoModal" data-id="${product.id}">Інфо
                        </button>
                        <button class="btn btn-outline-primary buy rounded-lg" data-id="${product.id}">
                          ${product.price} грн. - Купити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
        }
        );
        this.container.innerHTML = productListDomString;
    }
    addEventListeners() {
        document.querySelectorAll('.product .btn-outline-info').forEach(button=>button.addEventListener('click', event=>this.handleProductInfoClick(event)));
        document.querySelectorAll('.card.product button.buy, #productInfoModal button.buy').forEach(button=>button.addEventListener('click', event=>this.handleProductBuyClick(event)));
        document.getElementById('sort-by-category-for-women').addEventListener('click', ()=>this.sortByCategoryWomen());
        document.getElementById('sort-by-category-for-men').addEventListener('click', ()=>this.sortByCategoryMen());
        document.getElementById('sort-by-category-unisex').addEventListener('click', ()=>this.sortByCategoryUnisex());
    }

    async handleProductInfoClick(event) {
        const button = event.target;
        // Button that triggered the modal
        const id = button.dataset.id;
        // Extract info from data-* attributes
        const product = await this.productService.getProductById(id);
        const modal = document.querySelector("#productInfoModal");
        const productImg = modal.querySelector(".modal-body .card-img-top");
        productImg.setAttribute("src", "img/products/" + product.image);
        productImg.setAttribute("alt", product.title);
        modal.querySelector(".modal-body .card-title").innerText = product.title;
        modal.querySelector(".modal-body .card-text").innerText = product.description;
        const btnBuy = modal.querySelector("button.buy");
        btnBuy.innerText = `${product.price} грн. - Купити`;
        btnBuy.dataset.id = id;
    }
    handleProductBuyClick(event) {
        const button = event.target;
        const id = button.dataset.id;
        this.cart.addProduct(id);
        window.showAlert('Товар додано до кошика');
    }
   async sortByCategoryWomen() {
    this.productService = new ProductsService();
    const products = await this.productService.getProducts();
    products.sort((a, b) => a.category - b.category);
    this.renderProducts();
    this.addEventListeners();
  }
     async sortByCategoryMen() {
    this.productService = new ProductsService();
    const products = await this.productService.getProducts();
    products.sort((a, b) => b.category - a.category);
    this.renderProducts();
    this.addEventListeners();
  }
     async sortByCategoryUnisex() {
    this.productService = new ProductsService();
    const products = await this.productService.getProducts();
    products.sort((a, b) => a.category - b.category);
    this.renderProducts();
    this.addEventListeners();
  }
}
