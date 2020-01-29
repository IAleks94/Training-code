let sortColumn = evt => {
  if (evt.target.tagName !== "TH") return;
  let type = evt.target.dataset.type;
  let index = evt.target.cellIndex;
  console.log(type, index);
  let tbody = document.querySelector("tbody");
  let rows = Array.from(tbody.rows);
  if (type === "number") {
    rows.sort((rowA, rowB) => rowA.cells[index].textContent - rowB.cells[index].textContent);
    tbody.append(...rows); //Важно добавить ... (распокавать) массив, иначе херня вставляеться
  }
  if (type === "string") {
    rows.sort((rowA, rowB) => (rowA.cells[index].textContent[0] > rowB.cells[index].textContent[0] ? 1 : -1));
    tbody.append(...rows); //Важно добавить ... (распокавать) массив, иначе херня вставляеться
  }
};

grid.addEventListener("click", sortColumn);
