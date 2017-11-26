const findRootWord = function(word) {
    word = word.replace(/ $/, '');
    const _case = function(word) {
        if(dictionary[word] === null) {
            return word;
        }
        if(dictionary[word.replace(/ու$/, 'ի')] === null) {
            return word.replace(/ու$/, 'ի');
        }
        /* 
            Փորձում ենք տառ-տառ հանել և փորձել, մինչև որոնելի բառը գտնելը,
            շատ դեպքերում գործընթացը կհեշտացնի (երկար if-եր գրելու կարիք չի լինի,
            մեզ կմնա ներքին հոլովների հարցը)
        */
        for(let i = word.length - 1; i > 2; i--) {
            if(dictionary[word.substring(0, i)] === null) {
                return word.substring(0, i);
            }
        }
    
        word = word.replace(/ության$/, 'ություն');
        return word;
    };

    if (_case(word.charAt(0).toLowerCase() + word.slice(1))) {
        return _case(word.charAt(0).toLowerCase() + word.slice(1));
    } else if(_case(word.charAt(0).toUpperCase() + word.slice(1))) {
        return _case(word.charAt(0).toUpperCase() + word.slice(1));
    } else if (_case(word.toUpperCase())) {
        return _case(word.toUpperCase());
    }
    return word;
};