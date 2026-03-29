const APP = {
  _listeners: {},

  on(event, cb) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(cb);
  },

  emit(event, data) {
    (this._listeners[event] || []).forEach(cb => cb(data));
  },

  navigate(sectionId) {
    $$('.app-section').forEach(s => s.classList.add('is-hidden'));
    $$('.nav-links a').forEach(a => a.classList.remove('active'));

    const section = $('#' + sectionId);
    if (section) section.classList.remove('is-hidden');

    const navLink = $(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) navLink.classList.add('active');

    // Special rendering on navigate
    if (sectionId === 'progress') {
      Progress.renderDashboard();
    }

    // Update home strip
    if (sectionId === 'home') {
      this._updateHomeStrip();
    }

    // Save last visited
    sessionStorage.setItem('hindi_last_section', sectionId);
    window.location.hash = sectionId;
  },

  _updateHomeStrip() {
    const s = Progress.getState();
    const strip = $('#home-progress-strip');
    if (!strip) return;

    if (s.xp > 0 || s.completedLessons.length > 0) {
      show(strip);
      const xpEl     = $('#home-xp');
      const streakEl = $('#home-streak');
      const lessEl   = $('#home-lessons');
      if (xpEl)     xpEl.textContent     = s.xp + ' XP';
      if (streakEl) streakEl.textContent = s.streakCount + ' day streak';
      if (lessEl)   lessEl.textContent   = s.completedLessons.length + ' lessons done';
    }
  },

  init() {
    Progress.init();
    Audio.init();
    Lessons.init();
    Vocabulary.init();
    Quiz.init();

    // Hash-based routing
    const handleHash = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const valid = ['home', 'lessons', 'vocab', 'quiz', 'progress'];
      this.navigate(valid.includes(hash) ? hash : 'home');
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Level up modal
    this.on('level:up', ({ level }) => {
      const overlay = $('#modal-overlay');
      const box     = $('#modal-box');
      if (!overlay || !box) return;

      box.innerHTML = `
        <div class="level-up-content animate-level-up">
          <div class="level-number">🎉</div>
          <h2>Level Up!</h2>
          <div class="level-number" style="font-size:3rem;color:var(--color-primary)">${level}</div>
          <p>You've reached Level ${level}! Keep learning!</p>
          <button class="btn btn-primary" id="modal-close-btn">Continue</button>
        </div>
      `;

      show(overlay);
      overlay.querySelector('#modal-close-btn').addEventListener('click', () => hide(overlay));
      overlay.addEventListener('click', e => { if (e.target === overlay) hide(overlay); });
    });

    // Continue button on home
    const continueBtn = $('#home-continue-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const last = sessionStorage.getItem('hindi_last_section');
        this.navigate(last && last !== 'home' ? last : 'lessons');
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => APP.init());
