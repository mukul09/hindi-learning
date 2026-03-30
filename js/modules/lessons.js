const Lessons = {
  init() {
    this._renderVowels();
    this._renderConsonants();
    this._renderMatras();
    this._initTabs();
    this._updateCompleteButtons();
  },

  _initTabs() {
    const tabs = $$('.lesson-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        $$('.lesson-panel').forEach(p => p.classList.remove('active'));
        const panel = $('#lesson-' + btn.dataset.panel);
        if (panel) panel.classList.add('active');
      });
    });
  },

  _renderLetterCard(item) {
    const card = document.createElement('div');
    card.className = 'letter-card';
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div class="card-devanagari">${item.devanagari}</div>
          <div class="card-ipa">[${item.ipa}]</div>
        </div>
        <div class="card-back">
          <div class="card-transliteration">${item.transliteration}</div>
          <div class="card-example">
            <div class="example-word">${item.example.word}</div>
            <div class="example-meaning">${item.example.meaning}</div>
          </div>
          <button class="btn-pronounce" title="Pronounce">▶ Pronounce</button>
        </div>
      </div>
    `;

    card.addEventListener('click', e => {
      if (e.target.classList.contains('btn-pronounce')) return;
      card.classList.toggle('flipped');
    });

    card.querySelector('.btn-pronounce').addEventListener('click', e => {
      e.stopPropagation();
      // prefix: vowels → v_, consonants → c_
      const prefix = item.ipa ? (VOWELS.includes(item) ? 'v_' : 'c_') : 'c_';
      Audio.speak(item.devanagari, { file: 'audio/' + prefix + item.id + '.mp3' });
    });

    return card;
  },

  _renderMatraCard(item) {
    const card = document.createElement('div');
    card.className = 'matra-card';
    card.innerHTML = `
      <div class="matra-anatomy">
        <span>${item.appliedTo}</span>
        <span class="matra-operator">+</span>
        <span>${item.symbol}</span>
        <span class="matra-operator">=</span>
        <span class="matra-combined">${item.result}</span>
      </div>
      <div class="matra-transliteration">${item.transliteration}</div>
      <div class="matra-example">
        <span class="example-hindi">${item.example.word}</span>
        <span> — ${item.example.meaning}</span>
      </div>
      <button class="btn-pronounce">▶ Pronounce</button>
    `;

    card.querySelector('.btn-pronounce').addEventListener('click', () => {
      Audio.speak(item.result, { file: 'audio/m_' + item.id + '.mp3' });
    });

    return card;
  },

  _renderVowels() {
    const grid = $('#vowel-grid');
    if (!grid) return;
    VOWELS.forEach(v => grid.appendChild(this._renderLetterCard(v)));
  },

  _renderConsonants() {
    const container = $('#consonant-groups');
    if (!container) return;

    CONSONANT_ROWS.forEach(row => {
      const group = document.createElement('div');
      group.className = 'consonant-group';
      group.innerHTML = `<div class="group-label">${row.group}</div>`;

      const grid = document.createElement('div');
      grid.className = 'card-grid';
      row.consonants.forEach(c => grid.appendChild(this._renderLetterCard(c)));
      group.appendChild(grid);
      container.appendChild(group);
    });
  },

  _renderMatras() {
    const grid = $('#matra-grid');
    if (!grid) return;
    MATRAS.forEach(m => grid.appendChild(this._renderMatraCard(m)));
  },

  _updateCompleteButtons() {
    const lessonIds = ['vowels', 'consonants', 'matras'];
    lessonIds.forEach(id => {
      const bar = $('#complete-bar-' + id);
      if (!bar) return;

      const isComplete = Progress.getState().completedLessons.includes(id);
      this._setCompleteBarState(bar, id, isComplete);
    });
  },

  _setCompleteBarState(bar, lessonId, isComplete) {
    if (isComplete) {
      bar.classList.add('completed');
      bar.innerHTML = `
        <p>✓ Lesson completed! Great work.</p>
        <span class="badge badge-xp">+50 XP earned</span>
      `;
    } else {
      bar.classList.remove('completed');
      bar.innerHTML = `
        <p>Finished studying this lesson?</p>
        <button class="btn btn-primary btn-sm" id="complete-btn-${lessonId}">Mark Complete ✓</button>
      `;
      const btn = bar.querySelector('#complete-btn-' + lessonId);
      if (btn) {
        btn.addEventListener('click', () => {
          Progress.completeLesson(lessonId);
          this._setCompleteBarState(bar, lessonId, true);
          animateXP(50, btn);
        });
      }
    }
  }
};
