function getSecondMinAndSecondMax(arr){
    sorted = arr.sort();
    return [ sorted[1], sorted[sorted.length-2] ]
}

console.log(getSecondMinAndSecondMax([4, 2, 5, 8, 7]))