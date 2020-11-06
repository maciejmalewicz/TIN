function binarySearch(arr, key){
    let l = arr[0];
    let r = arr[arr.length-1];

    while (l < r){
        let m = Math.floor((l + r) / 2);
        if (arr[m] === key){
            return m;
        }
        if (arr[m] > key){
            r = m;
        } else {
            l = m;
        }
    }
    return -1;
}

console.log(binarySearch([1, 3, 4, 5, 6, 7, 9, 10], 3));