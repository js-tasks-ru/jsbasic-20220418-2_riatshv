import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {

  }

  async render() {
    this.carousel = new Carousel(slides)
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
    
    this.stepSlider = new StepSlider({steps: 5, value: 3})
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    this.cartIcon = new CartIcon()
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    try {
      let response = await fetch("products.json");
      this.products = await response.json();
      this.productsGrid = new ProductsGrid(this.products);
      document.querySelector("[data-products-grid-holder]").innerHTML = "";
      document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      this.#addCustomEventListeners();

    } catch(error) {
      console.log(error);
    }

    
  }

  #addCustomEventListeners() {
    document.body.addEventListener("product-add", this.#onProductAdd);

    this.stepSlider.elem.addEventListener("slider-change", this.#onSliderChange);

    this.ribbonMenu.elem.addEventListener("ribbon-select", this.#onRibonSelect);

    document.querySelector("#nuts-checkbox").addEventListener("change", this.#onNutsChange)

    document.querySelector("#vegeterian-checkbox").addEventListener("change", this.#onVegeterianChange)
  }
  #onProductAdd = (event) => {
    let soughtProduct = this.products.find( (product) => {
      return product.id == event.detail
    });
    this.cart.addProduct(soughtProduct);
  }
  
  #onSliderChange = (event) => {
    this.productsGrid.updateFilter({maxSpiciness: event.detail})
  }
  #onRibonSelect = (event) => {
    this.productsGrid.updateFilter({category: event.detail})
  }
  #onNutsChange = (event) => {
    this.productsGrid.updateFilter({noNuts: event.target.checked})
  }
  #onVegeterianChange = (event) => {
    this.productsGrid.updateFilter({vegeterianOnly: event.target.checked})
  }
}

