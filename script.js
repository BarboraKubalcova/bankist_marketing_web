'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  */
  // scroll to section
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation
// 1. Add event listener to common parent element
// 2. Determine what elemet originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    // only buttons with class nav__link selected
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
/*
const allButtons = document.getElementsByTagName('button');
// select all buttons. It returns HTML colection = live colection
// if DOM changes, HTML colection updates automaticaly
// NODE colection dont update
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));
// also creates HTML colection

console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));
console.log(document.getElementById('section--1'));
*/
// creating and inserting elements
// .insertAdjacementHTML
/*
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improve functionality';
message.innerHTML =
  'We use cookies for improve functionality.<button class="btn btn--close--cookie">Got it!</button>';
// header.prepend(message); // first child - on begining
header.append(message); // last child
// it cant be on 2 places at once - now its only in the end
// DOM element is unique

// header.append(message.cloneNode(true));
// we have to clone element to be in 2 places

// header.before(message);
// header.after(message);
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// inline styles ^

console.log(message.style.height); // hidden
console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// style which we didnt changed or added in DOM is hidden so we cant read it in console
// inline styles = we write it ourselves
console.log(getComputedStyle(message).color); // return all style
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// we change css :root property
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful logo';

// non standart
console.log(logo.desingner); // undefined - because its not standart property
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist'); // we can add atribute

console.log(logo.getAttribute('src')); // if we want just link to img

// links

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://...../?#
console.log(link.getAttribute('href')); // #

// data atributes - it has to start with data
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
*/

// TYPES OF EVENTS AND EVENT HANDLER
/*
const alertH1 = function (e) {
  alert('addEventListener: Great');
  //h1.removeEventListener('mouseenter', alertH1); // remove event handler
};
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//  h1.onmouseenter = function (e) {
//   alert('addEventListener: Perfect');
// };
*/
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link ', e.target, e.currentTarget);
  // stop propagation
  // e.stopPropagation(); // not good in practise
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container ', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav ', e.target, e.currentTarget);
});
*/
