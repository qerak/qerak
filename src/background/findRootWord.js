const findRootWord = function(word) {
  word = word.replace(/ $/, '');
  const exaptions = function(word) {
    /*
    Այս ֆունկցիան պետք է ստուգի բավառիկ դեպքերը։ Քանի որ այս ֆունկցիան մեծ մասմաբ գուշակելու փոխարեն պարզապես գիտի
    իր տված տարբերակը, սկզբում կաշխատեցնենք այն և չգտնելու դեպքում միայն կաշխատեցնենք գուշակող ֆունկցիաները
    */

    if((/^հոր(ից|ով)ը?$/i).test(word)) {
      return 'հայր';
    }
    if((/^մոր(ից|ով)ը?$/i).test(word)) {
      return 'մայր';
    }
    if((/^եղբոր(ից|ով)ը?$/i).test(word)) {
      return 'եղբայր';
    }

    // .replace('տան', 'տուն')
    // .replace('շան', 'շուն')
    // .replace('ձյան', 'ձյուն')
    // .replace('սյան', 'սյուն')
    // .replace('արյան', 'արյուն')
    // .replace('անկյան', 'անկյուն')
    // .replace('անվան', 'անուն')
    // .replace(/գրք(ի|ից|ով|ում|երը?|երի|||)/, 'գիրք')
    // .replace('լեզվի', 'լեզու') աղջիկ-աղջկա, սեր-սիրո, դուստր-դստեր, Աստված բառը՝ Աստծո
  };

  const _case = function(word) {
    if(dictionary[word] === null) {
      return word;
    }
    word = word.replace(/ության$/, 'ություն');

    if(dictionary[word.replace(/^ամենա/, '')] === null) {
      return word.replace(/^ամենա/, '');
    }

    if(dictionary[word.replace(/ու$/, 'ի')] === null) {
      return word.replace(/ու$/, 'ի');
    }

  };

  const tryWithouLast = function(word) {
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
  };
  if(exaptions(word)) {
    return exaptions(word);
  } else if(_case(word.charAt(0).toUpperCase() + word.slice(1))) {
    return _case(word.charAt(0).toUpperCase() + word.slice(1));
  } else if (_case(word.charAt(0).toLowerCase() + word.slice(1))) {
    return _case(word.charAt(0).toLowerCase() + word.slice(1));
  } else if (_case(word.toUpperCase())) {
    return _case(word.toUpperCase());
  } else if(tryWithouLast(word.charAt(0).toUpperCase() + word.slice(1))) {
    return tryWithouLast(word.charAt(0).toUpperCase() + word.slice(1));
  } else if (tryWithouLast(word.charAt(0).toLowerCase() + word.slice(1))) {
    return tryWithouLast(word.charAt(0).toLowerCase() + word.slice(1));
  } else if (tryWithouLast(word.toUpperCase())) {
    return tryWithouLast(word.toUpperCase());
  }
  return word;
};
