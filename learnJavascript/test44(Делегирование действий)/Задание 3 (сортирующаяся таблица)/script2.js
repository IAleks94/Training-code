 //скрипт из коментариев
function sortingtable(event) {
  let target = event.target;
  if (target.dataset.type) {
      let numberColumm = target.cellIndex;//номер столбца на который ткнули
      let tableContent = Array.from(grid.rows).slice(1);//получение данных таблицы и приведении ее к массиву
      // console.log('tableContent: ', tableContent);
  if (target.dataset.type == 'string'){//если строки, то сортируем строчно
      var sortRows = tableContent.sort((rowA, rowB) => rowA.cells[numberColumm].innerHTML >
      rowB.cells[numberColumm].innerHTML ? 1 : -1)

  }
  if (target.dataset.type == 'number'){//если числа, то сортируем как числвые значения
      var sortRows = tableContent.sort((rowA, rowB) => {
          return (rowA.cells[numberColumm].innerHTML - rowB.cells[numberColumm].innerHTML) }) 
  }
  grid.tBodies[0].append(...sortRows)//вставляем получившийся отсортированнй html
  
}
}


grid.addEventListener('click', sortingtable);