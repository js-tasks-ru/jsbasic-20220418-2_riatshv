export default class StepSlider {
  //Конструктор класса
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
  
    //Создаем верстку
    this.#templateUpdate(); 
    
    //Добавляем события
    this.#addEventListeners();
  }

  //Метод для создания верстки
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
  }


  //Метод для динамического изменения верстки
  #sliderUpdate(event) {
    //Получаем все элементы span внутри элемента с классом slider__steps
    const spans = this.elem.querySelector(".slider__steps").querySelectorAll("span");

    //Получаем характерные размеры и величины для корневого эл-та (слайдера)
    const sliderDim = this.elem.getBoundingClientRect();
    
    //Текущее значение координаты x курсора в системе координат, центр которой совпадает с левой границей слайдера
    const currentClientX = event.clientX - sliderDim.x;

    this.sliderThumb = this.elem.querySelector(".slider__thumb");
    this.sliderProgress = this.elem.querySelector('.slider__progress');

    //Определяем между какими двумя эл-тами span распологается курсор
    for (let i = 1; i < spans.length; i++) {
      //Кордината x текущего эл-та span
      const spanWidth = spans[i].getBoundingClientRect().x +spans[i].getBoundingClientRect().width - sliderDim.x;
      if (currentClientX < spanWidth) {
        const spanWidthPrev = spans[i - 1].getBoundingClientRect().x - sliderDim.x;
        const halfWidth = Math.floor(spanWidth - spanWidthPrev)/2;

        //Если разность текущей координаты x курсора и ширины предыдущего span меньше половины 
        if (currentClientX - spanWidthPrev > halfWidth) {
          this.value = i;
        } else {
          this.value = i - 1;
        }

        // Добавляем значение в эл-т с классом slider__value
        const sliderValue = this.elem.querySelector(".slider__value");
        sliderValue.textContent = this.value;

        let activeSpan = spans[this.value];
        // Убираем всем эл-там span активный класс
        spans.forEach( (span) => {
          if (span != activeSpan) {
            span.classList.remove("slider__step-active");
          }
        });
        // Добавляем текущему эл-ту span активный класс
        activeSpan.classList.add("slider__step-active");
        break;
      }
    }

    // Относительная координата x курсора
    let relCurrentClientX = currentClientX/sliderDim.width;

    if (relCurrentClientX < 0) {
      relCurrentClientX = 0;
    } else if (relCurrentClientX > 1) {
      relCurrentClientX = 1;
    }

    // Если клик или поднятие кнопки мыши, то определяем целые значения положения эл-тов slider__progress и slider__thumb
    if (event.type == "click" || event.type == "pointerup") {
      this.sliderThumb.style.left = `${this.value/(this.steps - 1)*100}%`;
      this.sliderProgress.style.width = `${this.value/(this.steps - 1)*100}%`;

    } else {
      this.sliderThumb.style.left = `${relCurrentClientX*100}%`;
      this.sliderProgress.style.width = `${relCurrentClientX*100}%`;
  
    }
  }


  // Метод кастомного события
  #onSliderChange () {
    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }


  // Метод события клика мыши
  #onMouseClick() {
    this.elem.addEventListener("click", (event) => {
      this.#sliderUpdate(event);
      this.#onSliderChange();
    });
  }


  // Метод Drag-and-drop
  #onDragAndDrop() {
    // Отменяем стандартное поведение drag-and-drop
    this.elem.querySelector(".slider__thumb").addEventListener("dragstart", (e) => {
      e.preventDefault();
    })
    // Добавляем событие при опускании кнопки мыши/пальца
    this.elem.querySelector(".slider__thumb").addEventListener("pointerdown", (e) => {
      e.preventDefault();
      // Создаем функцию, которая будет вызывать метод для обновления верстки каждый раз при движении мыши/пальца
      const moveThumb = (event) => {
        event.preventDefault();
        this.#sliderUpdate(event);
      }

      // Добавляем событие движения на документ, т.к. хотим, чтобы мышь/палец могли изменять положение slider__thumb в любом месте документа
      document.addEventListener("pointermove", moveThumb)
      this.elem.classList.add("slider_dragging");

      // Добаввляем событие поднятия мыши/пальца через метод объекта, чтобы потом его без проблем удалить
      document.onpointerup = (event) => {
        this.elem.classList.remove("slider_dragging");
        this.#sliderUpdate(event);
        this.#onSliderChange();
      
        // Убираем ненужные обработчики событий
        document.removeEventListener("pointermove", moveThumb);
        document.onpointerup = null;
      }
    })
  }

  // Метод для добавления событий
  #addEventListeners() {
    this.#onMouseClick();
    this.#onDragAndDrop();
  }
}
