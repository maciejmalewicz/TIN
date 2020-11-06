function amountToCoins(amount, coins){
    coins = coins.sort((a, b) => {return a < b});
    accumulator = [];

    for (i = 0; i < coins.length; i++){
        let coin = coins[i];
        let coinCount = Math.floor(amount / coin);
        
        for (j = 0; j < coinCount; j++){
            accumulator.push(coin);
        }
        amount -= coin * coinCount;
    }
    return accumulator;
}

console.log(amountToCoins(438, [50, 20, 10, 5, 2, 1]))