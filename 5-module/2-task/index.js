function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");
  let count = 0;

  button.onclick = ( (event) => {
    if (count % 2 == 0) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
    count++;
  });
}
