class ProductList {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container');
    this.productService = new ProductsService();
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let productListDomString = '';
    const products = await this.productService.getProducts();
    products.forEach(product => {
      productListDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title text-truncate">${product.title}</h4>
                      <h5 class="category">${product.category}</h5>
                      <p class="card-text flex-fill text-truncate">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-toggle="modal"
                          data-target="#productInfoModal" data-id="${product.id}">Інфо
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          ${product.price} грн. - Купити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = productListDomString;
  }
  addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    document
      .getElementById('sort-by-category-for-men')
      .addEventListener('click', () => this.sortByCategoryForMen());
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} грн. - Купити`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Товар додано до кошика');
  }
  async sortByCategoryForMen() {
    this.productService = new ProductsService();
    const products = await this.productService.getProducts();
    products.sort((a, b) => a.price - b.price);
    this.renderProducts();
    this.addEventListeners();
  }
}