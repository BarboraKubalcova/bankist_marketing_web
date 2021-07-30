'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

// TABBED COMPONENT
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // closest find the closest parent element with operations__tab classname

  //guard clause
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animations
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
/*
// passing argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  //console.log(window.scrollY);
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

////////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null, // element where the target is intersecting
  treshold: [0, 0.2], // percentage of intersecting
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
// sticky nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

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
/*
// DOM TRAVERSING
// H1 element
const h1 = document.querySelector('h1');
// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log();
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
//selected closest element with class header
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // receive query string
h1.closest('h1').style.background = 'var(--gradient-primary)'; // receive query string
// first child element finds children no matter how deep in DOM tree
// closest element finds closest parent element

// going sideways
// in js its possible to select just previous and next sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling); // h4

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if we want to select all siblings, we have to go to parent element
// and select all childrens

console.log(h1.parentElement.children); // html colection
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
