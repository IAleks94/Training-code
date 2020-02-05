const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms));
};

const url = "https://jsonplaceholder.typicode.com/todos";

// function fetchTodos() {
//   console.log('Начинаем Фетчить')
//   return delay(2000)
//     .then(() =>  fetch(url))
//     .then(response => response.json())
// }

// //console.log(fetchTodos())

// fetchTodos().then(data =>console.log('Data:', data))
// .catch(e => console.error(e))

async function fetchAsinkTodos() {
  console.log('Начинаем Фетчить')
  try {
    await delay(2000);
  const response =  await fetch(url);
  const data = await response.json()
  console.log('Data:', data)
  } catch (e) {
    console.error(e);
  } finally {
    
  }
  
}

fetchAsinkTodos()