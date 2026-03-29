const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function show(el) {
  if (el) el.classList.remove('is-hidden');
}

function hide(el) {
  if (el) el.classList.add('is-hidden');
}

function animateXP(amount, anchorEl) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = '+' + amount + ' XP';

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (anchorEl) {
    const rect = anchorEl.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top;
  }

  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 1300);
}

function showToast(message, type = '', duration = 3000) {
  const container = $('#toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' toast-' + type : '');
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 300ms ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
