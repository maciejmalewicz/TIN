//indexing starts from 1, producting 1, 1, 2, 3, 5, 8...

function fibonacci(n){
    if (n < 3){
        return 1;
    }
    let first = 1;
    let second = 1;
    for (i = 0; i < n - 2; i++){
        let helper = second;
        second = first + second;
        first = helper;
    }
    return second;
}

console.log(fibonacci(7));