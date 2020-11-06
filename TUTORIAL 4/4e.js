function findLongestWord(str){
    arr = str.split(' ');
    let maxWord = '';

    for (let word of arr){
        if (word.length > maxWord.length){
            maxWord = word;
        }
    }

    return maxWord;
}

console.log(findLongestWord('Ala ma kota i lubi wsuwac miensoko'));