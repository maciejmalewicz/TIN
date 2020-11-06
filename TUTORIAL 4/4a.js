function factorialIterative(n){
    if (n < 2){
        return 1;
    }
    fac = 1;
    for (i = n; i > 1; i--){
        fac = fac * i;
    }
    return fac;
}

const factorialRecursive = function(n){
    if (n < 2){
        return 1;
    }
    return n * factorialRecursive(n-1);
}

console.log(factorialIterative(6));
console.log(factorialRecursive(6));