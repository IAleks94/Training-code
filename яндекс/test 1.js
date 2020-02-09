module.exports = function (explorers) {
    let setToponym  = new Set()
    for (let explorer of explorers){
        explorer.slice(1).map( (item) => setToponym.add(item))
    }
    let arr = []
    for (let toponym of setToponym) {
        arr.push([toponym])
    }

    for (let i = 0; i < explorers.length; i++) {
       let explorer = explorers[i]
       for (let i = 0; i < arr.length; i++)
       //explorer.includes(arr[i][0], 1)
       //console.log(explorer.includes(arr[i][0], 1),arr[i][0], explorer[0])
       if (explorer.includes(arr[i][0], 1)){
           arr[i].push(explorer[0]) 
           continue
       }
       
    }
    return arr
  
};


