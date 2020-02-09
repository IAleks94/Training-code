module.exports = function(inputData, inputDictionary) {
  sortByCoordinates(inputData);

  const textMessages = inputData.map(item => {
    return item.text;
  });
  const resultMessage = textMessages.join(" ");

  for (obg of inputData) {
    if (!inputDictionary.includes(obg.text)) {
      return "Unreadable message";
    }
  }

    return resultMessage;
  
};

function sortByCoordinates(arr) {
  arr.sort((a, b) => a.geometry[0] - b.geometry[0]);
  return arr;
}
