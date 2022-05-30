import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.counter = 0;

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.getBoundingClientRect().width) {
      return;
    }

    if (this.counter == 0) {
      this.initialY = this.elem.getBoundingClientRect().y + window.pageYOffset;
      this.counter = null;
    }

    const leftSide = document.querySelector(".heading").getBoundingClientRect().right + 20;
    const rightSide = document.documentElement.clientWidth - 10 - this.elem.getBoundingClientRect().width;


    if (window.pageYOffset > this.initialY) {
      const position = Math.min(leftSide, rightSide);
      Object.assign(this.elem.style, {
        zIndex: "100",
        left: `${position}px`,
        position: "fixed",
      });
    } else {
      Object.assign(this.elem.style, {
        zIndex: "",
        left: ``,
        position: "",
      });
    }

    if (document.documentElement.clientWidth <= 768) {
      Object.assign(this.elem.style, {
        zIndex: "",
        left: ``,
        position: "",
      });
    }
  }
}
