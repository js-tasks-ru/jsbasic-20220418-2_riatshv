import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    
    const template = createElement(
      `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.slides.map( (slide) => {
            return `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
            `
          } ).join(" ")}
        </div>
      </div>
      `
    )

    this.elem = template;

    const carouselSlide = this.elem.querySelectorAll(".carousel__slide");

    
    this.slides.forEach( (slide, ndx) => {
      const btn = carouselSlide[ndx].querySelector(".carousel__button");

      btn.addEventListener("click", () => {
        let event = new CustomEvent("product-add", {
          detail: slide.id,
          bubbles: true
        })

        this.elem.dispatchEvent(event);
      })
    })

    this.arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.arrowRight = this.elem.querySelector(".carousel__arrow_right");

    this.arrowLeft.style.display = "none";
    this.arrowRight.style.display = "";

    let count = 0;

    this.arrowLeft.addEventListener("click", (event) => {
      count--;
      this.carouselMove(count);
    })

    this.arrowRight.addEventListener("click", (event) => {
      count++;
      this.carouselMove(count);
    })
    
  }

  carouselMove(count) {
    const carousel = this.elem.querySelector(".carousel__inner");

    switch(count) {
      case 0: 
        this.arrowLeft.style.display = "none";
        break; 
      case 3: 
        this.arrowRight.style.display = "none";
        break;
      default: 
        this.arrowLeft.style.display = "";
        this.arrowRight.style.display = "";
    }

    const width = carousel.offsetWidth;
    carousel.style.transform = `translateX(-${width*count}px)`;
  }
}
