import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#gridUpdate();
  }

  #cardsUpdate(products) {
    this.gridInner = createElement(`     
    <div class="products-grid__inner">

    </div>`);

    for (let product of products) {
      const currentCard = new ProductCard(product);
      this.gridInner.append(currentCard.elem);
    }
    this.gridContainer.append(this.gridInner)

    this.elem = this.gridContainer;
  }

  #gridUpdate() {
    this.gridContainer = createElement(`
    <div class="products-grid">

    </div>
    `);

    this.#cardsUpdate(this.products)
  }

  #filterCard(filters) { 
    const {noNuts, vegeterianOnly, maxSpiciness, category} = filters;
    this.availableProducts = []

    this.availableProducts = this.products.filter( (currentProduct) => {
      if (noNuts && currentProduct.nuts) {
        return false;
      }
      if (vegeterianOnly && !currentProduct.vegeterian) {
        return false;
      }
      if (maxSpiciness < currentProduct.spiciness && maxSpiciness) {
        return false;
      }
      if (category != currentProduct.category && category) {
        return false;
      }
      return true;
    })
  }

  updateFilter(filters) {
    this.gridInner.remove();

    Object.assign(this.filters, filters)

    this.#filterCard(this.filters);

    this.#cardsUpdate(this.availableProducts);
  }
}
