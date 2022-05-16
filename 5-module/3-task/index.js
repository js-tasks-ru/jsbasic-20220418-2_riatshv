function initCarousel() {
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const carousel = document.querySelector(".carousel__inner");

  arrowLeft.style.display = "none";

  let count = 0;

  function carouselMove(event) {
    if (event.currentTarget == arrowRight) {
      if (count < 3) {
        count++;
      }
    }

    if (event.currentTarget == arrowLeft) {
      if (count > 0) {
        count--;
      }
    }

    switch(count) {
      case 0: 
        arrowLeft.style.display = "none";
        break; 
      case 3: 
        arrowRight.style.display = "none";
        break;
      default: 
        arrowLeft.style.display = "";
        arrowRight.style.display = "";
    }

    const width = carousel.offsetWidth;
    carousel.style.transform = `translateX(-${width*count}px)`;
  }

  arrowLeft.addEventListener("click", (event) => {
    carouselMove(event);
  })

  arrowRight.addEventListener("click", (event) => {
    carouselMove(event);
  })

}
