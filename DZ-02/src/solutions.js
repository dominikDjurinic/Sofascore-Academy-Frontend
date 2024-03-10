module.exports = {
  /**
   * Returns an empty object without prototype. There is object creation type that creates object without prototype
   */
  createPrototypelessObject() {
    const objProtoLess = Object.create(null);           //stvaramo objekt bez prototype

    return objProtoLess;
  },

  /**
   * Returns an object with prototype set to given `proto`.
   * @param {Object} proto Prototype object
   */
  createObjectWithPrototype(proto) {
    const objProto = {};
    Object.setPrototypeOf(objProto,proto);            //definiramo prototype za novi objekt na objekt proto

    return objProto;
  },

  /**
   * Returns an object with `value` property set to the given `value` and `getValue` method.
   * Be careful, if `value` changes, `getValue` should return changed `value`.
   * @param {any} value
   */
  createObjectWithMethod(value) {
    const objValue = {
      value: value,
      getValue: function(){                          //property kao funkcija
        return objValue.value;
      }
    }

    return objValue;
  },

  /**
   * Returns an object with the `getValue` and `setValue` methods, having `value` hidden from the outside.
   */
  createEncapsulatedObject() {
    let hiddenValue;                  

    const objEncap = {
      getValue: function(){                         //closures - omogucuje pristup varijabli hiddenValue iz vanjske funkcije
        return hiddenValue;                         //cak i kada je vanjska funkcija zavrsila (return)
      },
      setValue: function(value){
        hiddenValue = value;
      }
    }

    return objEncap;
  },

  /**
   * Returns the shallow copy of the given `obj`. HINT: This **operator** will be used later.
   * @param {Object} obj
   */
  shallowCopy(obj) {                                 //shallow copy - dijeli reference s izvornim objektom od kojeg nastaje
    //moze i ovako const shaCopy = Object.create(obj);
    const shaCopy = {...obj};                         //spread sytax {...} - nabraja properties objekta obj 
                                                     //te dodaje sve properties objektu koji stvaramo - shaCopy
    return shaCopy;
  },

  /**
   * Returns the deep copy of the given `obj`.
   * @param {Object} obj
   */
  deepCopy(obj) {                                     //deep copy - ne dijele reference s izvornim objektom, koristimo kod ugnjezdivanja objekata
    const depCopy = structuredClone(obj);             //promjena vrijednosti na property od kopije ne mijenja vrijednost property izvornog objekta
    //moze i ovako const depCopy = JSON.parse(JSON.stringify(obj));

    return depCopy;
  },

  /**
   * Returns an array containing 2 elements which are
   * loosely equal, but strictly unequal.
   */
  looselyTrue() {                                   //loose equal - **==**, strict equal - **===** (provjerava i tip podataka)
    let array = ['8', 8];                           //'8' == 8, '8' !== 8 jer je pri tipa string, a drugi tipa number

    return array;
  },

  /**
   * Returns a string that is loosely equal to boolean `true`. This one is tricky :)
   */
  stringLooselyEqualToTrue() {  
    let str = '1';                                //1 obicno oznacuje true, a 0 false

    return str;
  },

  /**
   * Returns correct sum of a and b.
   */
  safeSum(a, b) {
    let sum = Number(a) + Number(b);              //pretvaramo parametre u tip number kako bismo osigurali tocnu sumu brojeva, a ne concat stringa

    return sum;
  },

  /**
   * Returns formatted string for the given date.
   * Format should be `{day}-{month}-{fullYear}` (all numbers).
   * @param {Date} date
   */
  formatDate(date) {
    let month = date.getMonth() + 1;                //getMonth() vraca indeks mjeseca od 0-11 za svih 12 mjeseci, pa treba + 1 za pravu vrijednost
    let formDate = date.getDate() + "-" + month + "-" + date.getFullYear();

    return formDate;
  },

  /**
   * Sorts the given `numberArray` in ascending order.
   * Use array `.sort` method. Sort is done in place so there is no need to return anything.
   * @param {number[]} numberArray
   */
  sortNumberArray(numberArray) {
    numberArray.sort((a,b) => a - b);                //sort funkcija sortira niz stringova po abecednom poretku
                                                    //mi zelimo sortiranje po vrijednosti broja te koristimo compare function
                                                    //ako je razlika (a-b) negativna onda a ispred b, ako pozitivna onda b ispred a
  },

  /**
   * Multiplies all the elements in the array by 2 _in place_
   * (edits the given array) and returns it.
   * @param {number[]} numberArray
   */
  multiplyArrayByTwo(numberArray) {
    numberArray.forEach((elem, ind) => numberArray[ind] *= 2);      //za svaki element iz polja uvecaj vrijednost 2 puta, izvrsava na postojecem polju

    return numberArray;
  },

  /**
   * Multiplies all the elements in the array by 2 and returns them
   * in a new array.
   * @param numberArray
   */
  multiplyArrayByTwoNew(numberArray) {
    let mulArray = numberArray.map((elem) => elem *= 2);            //map funkcija stvara novo polje s elementima iz postojeceg polja 
                                                                    //na koje je primjenjena odredena funkcija

    return mulArray;
  },

  /**
   * Returns first `n` Fibonacci numbers in an array. https://en.wikipedia.org/wiki/Fibonacci_sequence
   * If the n is <= 0, return `undefined`
   * @param n
   */
  fibonacciNumbers(n) {
    let fibonacciArray = [];

    if(n > 0){
      for(i=0;i<n;i++){
        if(i == 0){
          fibonacciArray[i] = 0;        //F_0=0
        }else if(i == 1){
          fibonacciArray[i] = 1;        //F_1=1
        }else{
          fibonacciArray[i] = fibonacciArray[i-1] + fibonacciArray[i-2];      //Fibonaccijev niz - 0,1,1,2,3,5,8,13,21,.. F_n = F_n-1 + F_n-2
        }
      }
      return fibonacciArray;
    }

    return undefined;
  },

  /**
   *
   * EXTRA CREDIT TASK (no points):
   *
   * Create two classes: `Person` and `Programmer`. `Programmer` class extends `Person`.
   * Person class has `name` property (set via constructor) and `getName` method (calls `callGetName` with name`).
   * Programmer class has `language` property provided to constructor (and `name` inherited from `Person`) and `getLanguage` method (calls `callGetLanguage` with `language`)
   * Return object with created classes, `return { Person, Programmer }`.
   *
   * NOTE: class methods should use `bind`, function expression syntax might not work here because code isn't transpiled.
   *
   * @param {Function} callGetName
   * @param {Function} callGetLanguage
   */
  classInheritance(callGetName, callGetLanguage) {
    class Person{
      constructor(name) {
        this.name = name;
      }

      getName() {
        callGetName(this.name);
      }
    }

    class Programmer extends Person{                //nasljedivanje nam omogucuje pristup svim metodama iz roditeljske klase
      constructor(name, language) {
        super(name);                                //super - poziva roditeljski konstruktor i pristupa properties iz roditeljske klase
        this.language = language;
      }

      getLanguage() {
        callGetLanguage(this.language);
      }
    }

    return {Person, Programmer};
  },

  /**
   * **This is variant of probably most common "big firm" interview question with closures.**
   *
   * If you can't find a solution yourself, you can Google and paste it, and try to understand why it works like that.
   * We will also explain it in the nearest lecture.
   *
   * This task has easier solutions (e.g. using `let` instead of `var`), but desired solutions included Closures.
   *
   * Call the `consumer` function once every second three times giving it loop iterator as argument.
   * Use the provided for loop, do not change for loop, but feel free to modify setTimeout.
   * @param {Function} consumer
   */
  timeoutIncrement(consumer) {
    for (var i = 1; i <= 3; i += 1) {                    //var - functional scope
      setTimeout(() => {                                 //JS ne ceka zavrsetak timera vec nastvalja dalje s for petljom
      }, 1000)                                          //da je funkcija consumer unutar setTimeout() - setTimeout (tvori closures) bi spremio referencu na i, a ne vrijednost od i
      consumer(i);                                      //kada zavrsi 1 sec for petlja se vec izvrtila 3 puta i na i je spremljeno 4 (i++) te consumer koristi uvijek 4
    }
  },
}
