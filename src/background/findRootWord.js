const findRootWord = function(word) {
    if(dictionary[word] === null) {
        return word;
    }
    //ուղղական հոլով
    if(dictionary[word.replace(/ն$/, '')] === null) {
        return dictionary[word.replace(/ն$/, '')]
    }
    if(dictionary[word.replace(/ը$/, '')] === null) {
        return dictionary[word.replace(/ը$/, '')]
    }

    //սեռական հոլով
    if(dictionary[word.replace(/ի$/, '')] === null) {
        return dictionary[word.replace(/ի$/, '')]
    }
    if(dictionary[word.replace(/ու$/, '')] === null) {
        return dictionary[word.replace(/ու$/, '')]
    }
    if(dictionary[word.replace(/վա$/, '')] === null) {
        return dictionary[word.replace(/վա$/, '')]
    }
    if(dictionary[word.replace(/ոջ$/, '')] === null) {
        return dictionary[word.replace(/ոջ$/, '')]
    }
    if(dictionary[word.replace(/ց$/, '')] === null) {
        return dictionary[word.replace(/ց$/, '')]
    }
    if(dictionary[word.replace(/ան$/, '')] === null) {
        return dictionary[word.replace(/ան$/, '')]
    }
    
    word = word.replace(/ության$/, 'ություն');
    return word;
};