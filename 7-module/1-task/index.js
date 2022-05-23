import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #arrowRight = null;
  #ribbon = null; 
  #arrowLeft = null;
  #links = null;

  constructor(categories) {
    this.categories = categories;

    this.#render();
    this.#addEventsListeners();
  }

  #render() {
    const template = createElement(
      `
      <div class = "ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map( ( {id, name} ) => {
            return `<a class = "ribbon__item" data-id = "${id}">${name}</a>`
          }).join("")}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      
      `
    )
    this.elem = template;
  }

  #addEventsListeners() {
    this.#arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    this.#ribbon = this.elem.querySelector(".ribbon__inner");
    this.#arrowLeft = this.elem.querySelector(".ribbon__arrow_left");

    //Клик по правой кнопке
    this.#arrowRight.addEventListener("click", (event) => {
      this.#sliderMove(event);
      
      this.#ribbon.addEventListener("scroll", ( ) => {
        this.#sliderHide();
      })
    });

    // Клик по левой кнопке
    this.#arrowLeft.addEventListener("click", (event) => {
      this.#sliderMove(event);
      
      this.#ribbon.addEventListener("scroll", ( ) => {
        this.#sliderHide();
      })
    });

    this.#links = this.elem.querySelectorAll(".ribbon__item")
    
    // Добавляем класс на активный элемент
    this.#links.forEach( (currentLink) => {
      currentLink.addEventListener("click", (event) => {
        event.preventDefault();
        this.#removeClasses(currentLink);
        currentLink.classList.add("ribbon__item_active");
      });
    });

    // Добавляем пользовательское событие по клику на элемент
    this.categories.forEach( (category, ndx) => {
      this.#links[ndx].addEventListener("click", () => {
        const event = new CustomEvent("ribbon-select", {
          detail: category.id,
          bubbles: true,
        });
  
        this.elem.dispatchEvent(event);
      })
    })
  }

  #sliderMove(event) {
    if (event.currentTarget == this.#arrowRight) {
      this.#ribbon.scrollBy(350, 0);
    }
    if (event.currentTarget == this.#arrowLeft) {
      this.#ribbon.scrollBy(-350, 0);
    }
  }

  #sliderHide() {
    const scrollLeft = this.#ribbon.scrollLeft;
    const width = this.#ribbon.offsetWidth;
    const scrollWidth = this.#ribbon.scrollWidth;
    const scrollRight = scrollWidth - width - scrollLeft;

    if (scrollRight < 1) {
      this.#arrowRight.classList.remove("ribbon__arrow_visible")
    } else {
      this.#arrowRight.classList.add("ribbon__arrow_visible")
    }

    if (scrollLeft < 1) {
      this.#arrowLeft.classList.remove("ribbon__arrow_visible")
    } else {
      this.#arrowLeft.classList.add("ribbon__arrow_visible")
    }
  }

  #removeClasses(currentLink) {
    this.#links.forEach( (link) => {
      if (link != currentLink) {
        link.classList.remove("ribbon__item_active")
      }
    })
  }
}
