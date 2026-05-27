/*
 * print
 */
var isStylePrint = false;

async function waitForStyle(ms = 0) {
  if (ms) await new Promise(r => setTimeout(r, ms));
  await new Promise(r => requestAnimationFrame(r));
}

async function stylePrint() {
  const link = document.getElementById('stylesheet');
  link.href = '../style/print.css';
  isStylePrint = true;
  await waitForStyle(500);
}

function triggerPrint() {
  window.print();
}

async function styleAndPrint() {
  await loadContents();
  await stylePrint();
  await waitForStyle();
  triggerPrint();
}

async function styleDefault() {
  await loadContents();
  document.getElementById('stylesheet').href = '../style/default.css';
  isStylePrint = false;
}

/*
 * briefcase
 */

function loadContents() {
  return fetch('src/contents.html')
    .then(r => r.text())
    .then(html => { document.querySelector('#torso').innerHTML = html; });
}

/*
 * fun hover
 */

var colorPairs = [
  ['#10b1fe', '#282c34'],
  ['#3fc56b', '#282c34'],
  ['#ce9887', '#282c34'],
  ['#f9c859', '#282c34'],
  ['#ff78f8', '#282c34'],
  ['#9f7efe', '#282c34'],
  ['#3691ff', '#282c34'],
  ['#ff936a', '#282c34'],
  ['#ff6480', '#282c34'],
  ['#7a82da', '#282c34']
];

function changeColors(el) {
  if (isStylePrint) return;
  var pair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
  el.style.backgroundColor = pair[0];
  el.style.color = pair[1];

  var links = el.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = pair[1];
  });
}

function resetColors(el) {
  if (isStylePrint) return;
  el.style.backgroundColor = '';
  el.style.color = '';

  var links = el.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = '';
  });
}

document.addEventListener('mouseover', (e) => {
  var funEl = e.target.closest && e.target.closest('fun');
  if (!funEl) return;
  changeColors(funEl);
});

document.addEventListener('mouseout', (e) => {
  var funEl = e.target.closest && e.target.closest('fun');
  if (!funEl) return;
  resetColors(funEl);
});

function excitedEmail() {
  const footer = document.getElementById('footer');
  footer.classList.remove('excited');
  void footer.offsetWidth;
  footer.classList.add('excited');
}
