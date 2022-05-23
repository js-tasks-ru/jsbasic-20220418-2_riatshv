import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  
  constructor() {
    this.modal = createElement(
      `
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
  
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
  
            <h3 class="modal__title">
              123
            </h3>
          </div>
  
          <div class="modal__body">
            <div>
              <div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
      `
      )

    this.#addEventListeners();
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(element) {
    const modalBody = this.modal.querySelector(".modal__body");
    modalBody.innerHTML = ""
    modalBody.append(element);
  }

  close = () => {
    const modal = document.body.querySelector(".modal");
    if (modal) {
      document.body.removeChild(this.modal);
      document.body.classList.remove("is-modal-open");
    }
  }

  #addEventListeners() {
    this.modal.querySelector(".modal__close").addEventListener("click", this.close);

    document.documentElement.onkeydown = (e) => {
      if (e.code == "Escape") {
        this.close();
        document.documentElement.onkeydown = null;
      }
    };
  }
}
