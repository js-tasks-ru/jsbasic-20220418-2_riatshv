import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  constructor(products) {
    this.products = products;
    this.filters = {};
<<<<<<< HEAD
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
=======
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);

    this.renderContent();
  }

  renderContent() {
    this.sub('inner').innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;}

      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }

      let card = new ProductCard(product);
      this.sub("inner").append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderContent();
  }

  sub(ref) {
    return this.elem.querySelector(`.products-grid__${ref}`);
  }

}
>>>>>>> 33b087d159e201ba30d37a78916d92fff7b090bd
