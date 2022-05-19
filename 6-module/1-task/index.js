/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;

    const elem = `
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
        ${this.rows.map( (item) => {
          let temp = `<tr>`
          for (let key in item) {
            temp += `
            <td>${item[key]}</td>`
          }
          temp += `<td> <button>X</button> </td>`
          return temp + `</tr>`;
        } ).join(" ")}
      </tbody>
    `;
    
    const parent = document.createElement("table");
    parent.innerHTML = elem;

    this.elem = parent; 

    const tbody = this.elem.querySelector("tbody");

    
    tbody.querySelectorAll("tr").forEach( (row) => {
      const removeBtn = row.querySelector("button");

      removeBtn.addEventListener("click", () => {
        row.remove();
      });
    })
  }
}
