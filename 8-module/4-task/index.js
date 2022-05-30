import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItemsProductName = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
		
    let cartProductName = product.name;
    let count = 1;
    

    if (!this.cartItemsProductName.includes(cartProductName)) {
      this.cartItemsProductName.push(cartProductName);
      
      this.cartItems.push({
        product,
        count: 1
      })
    } else {
      for (let i = 0; i < this.cartItemsProductName.length; i++) {
        if (cartProductName == this.cartItemsProductName[i]) {
          this.cartItems[i].count += 1;
          count = this.cartItems[i].count
          break;
        }
      }

    }
    
    let cartItem = {
      product,
      count
    }
    console.log(cartItem)
		this.onProductUpdate(cartItem)
  }  

  updateProductCount(productId, amount) {
    let index = 0;
     let cartItem = this.cartItems.find( (cartItem, ndx) => {
       index = ndx;
       console.log(cartItem.product.id);
       console.log(productId)
       return cartItem.product.id == productId;
     })


     switch (amount) {
       case 1: 
         cartItem.count++
         break;
       case -1: 
         cartItem.count--
     }
     if (cartItem.count == 0) {
        this.cartItems.splice(index, 1);
        this.cartItemsProductName.splice(index, 1);
     }
     console.log(this.cartItems);
     console.log(cartItem)
     this.onProductUpdate(cartItem)
   }

   isEmpty() {
    if (this.cartItems.length == 0) {
      return true;
    }
    return false;
  }

  getTotalCount() {
    let sum = 0;
    this.cartItems.forEach( (cart) => {
      sum += cart.count;
    })
    return sum;
  } 

  getTotalPrice() {
    let sum = 0;
    this.cartItems.forEach( (cart) => {
      sum += cart.product.price * cart.count;
    })
    return sum;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  onAddRemoveItem(modalBody) {
    const minusBtns = modalBody.querySelectorAll(".cart-counter__button_minus");
    const plusBtns = modalBody.querySelectorAll(".cart-counter__button_plus");
    minusBtns.forEach( (minusBtn) => {
      minusBtn.addEventListener("click", () => {
        let product = minusBtn.closest("[data-product-id]");
        let productId = product.dataset.productId;
        this.updateProductCount(productId, -1)
      })
    })

    plusBtns.forEach( (plusBtn) => {
      plusBtn.addEventListener("click", () => {
        let product = plusBtn.closest("[data-product-id]");
        let productId = product.dataset.productId;
        this.updateProductCount(productId, 1)
      })
    })
  }


  renderModal() {
    this.modal = new Modal();

    this.modalBody = createElement(`
    <div>

    </div>
    `)
    this.cartItems.forEach( (cartItem) => {
      this.modalBody.append(this.renderProduct(cartItem.product, cartItem.count));
    })
    this.modalBody.append(this.renderOrderForm());

    this.modal.setTitle("Your order");
    this.modal.setBody(this.modalBody);

    this.onAddRemoveItem(this.modalBody);

    this.modalBody.querySelector(".cart-form").addEventListener("submit", (event) => {
      this.onSubmit(event);
    })

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    if (document.body.className == "is-modal-open" && this.modalBody) {
      if (this.isEmpty()) {
        this.modal.close();
        return
      } else {
        if (cartItem.count == 0) {
          this.modal.close();
          this.renderModal();
        }
        if (cartItem.count != 0) {
          this.productId = cartItem.product.id; 
    
          // Элемент, который хранит количество товаров с таким productId в корзине
          let productCount = this.modalBody.querySelector(`[data-product-id="${this.productId}"] .cart-counter__count`);
    
          // Элемент с общей стоимостью всех единиц этого товара
          let productPrice = this.modalBody.querySelector(`[data-product-id="${this.productId}"] .cart-product__price`);
    
          // Элемент с суммарной стоимостью всех товаров
          let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);
          productCount.innerHTML = cartItem.count;
          productPrice.innerHTML = `€${(cartItem.product.price*cartItem.count).toFixed(2)}`;
  
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
      } 
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.modalBody.querySelector("[type = submit]").classList.add("is-loading");
    let form = this.modalBody.querySelector(".cart-form");
  
    let formData = new FormData(form);

    let promise = fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })

    promise.then( (responce) => {
      if (responce.ok) {
        this.modal.close();
        this.cartItems = [];
        this.renderModal();
        this.modal.setTitle("Success!");
        this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `
        ));
      }
    })
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

