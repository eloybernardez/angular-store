const { Observable } = require("rxjs");
const { filter } = require("rxjs/operators");
// Promises: solo puedo emitir un valor, con el que se resuelve la promesa
const doSomething = () => {
  return new Promise((resolve) => {
    resolve("valor 1");
    setTimeout(() => {
      resolve("valor 3");
    }, 3000);
  });
};

// Observables: puedo emitir varios valores, maneja asincronismo, puedo cancelar la suscripción, puedo escuchar constantemente eventos, fetchs y responsive
const doSomething$ = () => {
  return new Observable((observer) => {
    observer.next("valor 1 $");
    observer.next("valor 2 $");
    observer.next("valor 3 $");
    observer.next(null);
    setTimeout(() => {
      observer.next("valor 4 $");
    }, 5000);
    setTimeout(() => {
      observer.next(null);
    }, 8000);
    setTimeout(() => {
      observer.next("valor 5 $");
    }, 10000);
  });
};

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

// en un Observable podemos aplicar pipes para filtrar los valores que emitimos
(() => {
  const obs$ = doSomething$();
  obs$
    .pipe(filter((value) => value != null))
    .subscribe((rta) => console.log(rta));
})();
