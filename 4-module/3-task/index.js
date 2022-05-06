function highlight(table) {

  for (let row of table.rows) {

    let lastRow = row.lastElementChild
    console.log(lastRow);
    if ( lastRow.dataset.available == "true" ) {
      row.classList.add("available");
    } else if ( lastRow.dataset.available == "false" ) {
      row.classList.add("unavailable");
    } else {
      row.hidden = true;
    }


    let gender = lastRow.previousElementSibling;
    if ( gender.textContent == "m" ) {
      row.classList.add("male");
    } else if ( gender.textContent == "f" ) {
      row.classList.add("female");
    } 

    let age = gender.previousElementSibling;
    if ( parseInt(age.textContent) < 18 ) {
      row.style.textDecoration = "line-through"
    }
  }
}
