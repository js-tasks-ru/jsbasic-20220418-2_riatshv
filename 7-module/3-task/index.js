export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
  

    this.#templateUpdate();
    
    this.#addEventListeners();
  }

  #templateUpdate() {
    const stepArray = [];

    for (let i = 0; i < this.steps; i++) {
      stepArray.push(i);
    }

    const template = `
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: ${this.value/(this.steps-1)*100}%;">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${this.value/(this.steps-1)*100}%""></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${stepArray.map( (item, ndx) => {
          if (ndx == this.value) {
            return `<span class = "slider__step-active"></span>`
          }
          return `<span></span>`
        }).join("")}
      </div>
     </div>
    `
    const div = document.createElement("div");
    div.innerHTML = template;

    this.elem = div.firstElementChild;
    console.log(this.elem);
  }

  #sliderUpdate(event) {
    const spans = this.elem.querySelector(".slider__steps").querySelectorAll("span");
    const sliderDim = this.elem.getBoundingClientRect()
    const currentClientX = event.clientX - sliderDim.x;
    const sliderThumb = this.elem.querySelector(".slider__thumb");
    const sliderProgress = this.elem.querySelector('.slider__progress');


    for (let i = 1; i < spans.length; i++) {
      const spanWidth = spans[i].getBoundingClientRect().x +spans[i].getBoundingClientRect().width - sliderDim.x;
      if (currentClientX < spanWidth) {
        const spanWidthPrev = spans[i - 1].getBoundingClientRect().x - sliderDim.x;
        const halfWidth = Math.floor(spanWidth - spanWidthPrev)/2;

        if (currentClientX - spanWidthPrev > halfWidth) {
          this.value = i;
        } else {
          this.value = i - 1;
        }

        const sliderValue = this.elem.querySelector(".slider__value");
        sliderValue.textContent = this.value;

        let activeSpan = spans[this.value];

        sliderThumb.style.left = `${this.value/(this.steps - 1)*100}%`;
        sliderProgress.style.width = `${this.value/(this.steps - 1)*100}%`;

        spans.forEach( (span) => {
          if (span != activeSpan) {
            span.classList.remove("slider__step-active");
          }
        })
        activeSpan.classList.add("slider__step-active");
        
        break;
      }
    }
  }


  #addEventListeners() {
    this.elem.addEventListener("click", (event) => {
      this.#sliderUpdate(event);

      let customEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);

    });
  }
}
