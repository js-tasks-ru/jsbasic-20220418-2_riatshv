function makeDiagonalRed(table) {
  let i = 0;

  for (let row of table.rows) {
    let column = row.cells;
    column[i].style.backgroundColor = "red";
    i++;
  }
}
