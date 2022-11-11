/* asignacion de variables globales */
const palabras = ['ALURA', 'HTML', 'SCRIPT', 'JAVASCRIPT'];
let letrasUsadas = [];
let palabraAdivinar = [];
let innerpalabra = [];
let intentos = 4;
let palabraOculta = palabras[Math.floor(Math.random() * (palabras.length - 0))];

/* asignacion de id */
const evento = document.addEventListener;
const id = (str) => {
  return document.getElementById(str);
};
/* constantes del dom */
const palabraId = id('palabra');
const letrasUsadasId = id('letras_usadas');
const mensaje = id('mensaje');
const frase = id('frase');

const ahorcadoFigura = document.querySelectorAll('.ahorcado');
/* funcion refrescar pagina */
const actualizar = () => {
  location.reload(true);
};
/* Funciones de alertas  */

let succesAlert = () => {
  swal({
    title: 'Gano el Juego!',
    text: 'Desea seguir jugando!',
    icon: 'success',
    button: 'continuar!',
    timer: 1500000,
  });
  actualizar();
};

let errorAlert = () => {
  swal({
    title: 'Perdio El juego!',
    text: 'Siga intentando!',
    icon: 'error',
    button: 'continuar!',
    timer: 1500000,
  });
  actualizar();
};

/* funcion elegir palabra al azar */
const iniciar = () => {
  eventoTecla();
  console.log(palabraOculta);
  frase.innerHTML = `${palabraOculta
    .split('')
    .map(
      (letra) =>
        `<span class="letra">${
          palabraAdivinar.includes(letra) ? letra : ''
        }</span> `
    )
    .join('')}`;
  innerpalabra = frase.innerText.replace(/\n/g, '');
  console.log(innerpalabra);

  if (innerpalabra === palabraOculta) {
    console.log(`${innerpalabra}  =   ${palabraOculta}`);
    succesAlert();

    /* alert('Gano el juego'); */
  }
};

/* mostrar palabras usadas */

const palabrasUsadas = () => {
  eventoTecla();
  letrasUsadasId.innerHTML = `${letrasUsadas.length > 0 ? '<p> ' : ''}
  ${letrasUsadas.map((letra) => `<span>${letra}</span>`).join('')}`;
  /* mostrar partes del ahorcado */
  ahorcadoFigura.forEach((parte, indice) => {
    const errores = letrasUsadas.length;

    if (indice < errores) {
      parte.style.display = 'block';
    } else {
      parte.style.display = 'none';
    }
  });

  if (letrasUsadas.length === 6) {
    console.log(`${letrasUsadas.length}  =   ${ahorcadoFigura.length}`);
    errorAlert();

    /* alert('Perdiste el juego'); */
  }
};

/* captura de eventos de teclado */

const eventoTecla = () => {
  document.addEventListener('keyup', (e) => {
    let letra = e.key.toUpperCase();

    if (palabraOculta.includes(letra)) {
      if (!palabraAdivinar.includes(letra)) {
        palabraAdivinar.push(letra);
        iniciar();
      } /* else {
        alert('esa letra ya la uso');
      } */
    } else {
      if (!letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);
        palabrasUsadas();
      } /* else {
        alert('esa letra ya la uso');
      } */
    }
  });
};

const btn = document.querySelector('[data-form-btn]');

const palabra = (evento) => {
  /* evento.preventDefault(); */
  const input = document.querySelector('[data-form-input]');
  let value = input.value.toUpperCase();
  input.value = '';
  const agregarPalabra = palabras.push(`${value}`);
  const nuevoArreglo = localStorage.getItem('agregarPalabra');
  localStorage.setItem('palabras', JSON.stringify(nuevoArreglo));
};

btn.addEventListener('click', palabra);

const element = id('btn_iniciar');
element.addEventListener('click', () => {
  /* vaciar arrays */
  palabraAdivinar.splice(0);
  letrasUsadas.splice(0);

  palabraOculta = palabras[Math.floor(Math.random() * (palabras.length - 0))];

  /* eventoTecla(); */
  iniciar();
  /* palabrasUsadas(); */
});

/* iniciar(); */
