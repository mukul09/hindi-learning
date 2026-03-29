const Vocabulary = {
  currentCategory: 'greetings',
  searchQuery: '',

  init() {
    this._renderCategoryTabs();
    this._renderWordGrid();
    this._initSearch();
  },

  _renderCategoryTabs() {
    const tabBar = $('#vocab-tab-bar');
    if (!tabBar) return;

    const labels = {
      greetings:  'Greetings',
      numbers:    'Numbers',
      colors:     'Colors',
      food:       'Food',
      family:     'Family',
      body:       'Body',
      time:       'Time',
      animals:    'Animals',
      verbs:      'Verbs',
      adjectives: 'Adjectives',
      phrases:    'Phrases'
    };

    VOCAB_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (cat === this.currentCategory ? ' active' : '');
      btn.textContent = labels[cat] || cat;
      btn.dataset.cat = cat;
      btn.addEventListener('click', () => {
        this.currentCategory = cat;
        this.searchQuery = '';
        const searchInput = $('#vocab-search');
        if (searchInput) searchInput.value = '';
        $$('#vocab-tab-bar .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._renderWordGrid();
      });
      tabBar.appendChild(btn);
    });
  },

  _initSearch() {
    const searchInput = $('#vocab-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      this.searchQuery = searchInput.value.trim().toLowerCase();
      this._renderWordGrid();
    });
  },

  _renderWordGrid() {
    const grid = $('#word-grid');
    if (!grid) return;

    let words = WORDS.filter(w => w.category === this.currentCategory);

    if (this.searchQuery) {
      words = WORDS.filter(w =>
        w.hindi.includes(this.searchQuery) ||
        w.romanized.toLowerCase().includes(this.searchQuery) ||
        w.english.toLowerCase().includes(this.searchQuery)
      );
    }

    grid.innerHTML = '';

    if (words.length === 0) {
      grid.innerHTML = '<p style="color:var(--color-text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">No words found.</p>';
      return;
    }

    words.forEach(word => {
      const card = this._createWordCard(word);
      grid.appendChild(card);
    });
  },

  _createWordCard(word) {
    const isLearned = Progress.isWordLearned(word.id);
    const card = document.createElement('div');
    card.className = 'word-card' + (isLearned ? ' learned' : '');
    card.dataset.id = word.id;
    card.innerHTML = `
      <div class="word-hindi">${word.hindi}</div>
      <div class="word-roman">${word.romanized}</div>
      <div class="word-english">${word.english}</div>
      <div class="word-actions">
        <button class="btn btn-icon btn-ghost btn-speak" title="Pronounce">🔊</button>
        <button class="btn btn-icon btn-ghost btn-speak-slow" title="Pronounce slowly">🐢</button>
        <button class="btn btn-icon btn-ghost btn-learn${isLearned ? ' is-learned' : ''}" title="${isLearned ? 'Unmark' : 'Mark as learned'}">
          ${isLearned ? '★' : '☆'}
        </button>
      </div>
    `;

    card.querySelector('.btn-speak').addEventListener('click', function() {
      Audio.speak(word.hindi, { btn: this, file: 'audio/w_' + word.id + '.mp3' });
    });
    card.querySelector('.btn-speak-slow').addEventListener('click', function() {
      Audio.speak(word.hindi, { btn: this, slow: true, file: 'audio/w_' + word.id + '.mp3' });
    });

    card.querySelector('.btn-learn').addEventListener('click', e => {
      const btn = e.currentTarget;
      const nowLearned = Progress.markWordLearned(word.id);
      btn.textContent = nowLearned ? '★' : '☆';
      btn.classList.toggle('is-learned', nowLearned);
      card.classList.toggle('learned', nowLearned);
      if (nowLearned) animateXP(5, btn);
    });

    return card;
  },

  refreshLearnedState() {
    $$('.word-card').forEach(card => {
      const wordId   = card.dataset.id;
      const isLearned= Progress.isWordLearned(wordId);
      const btn      = card.querySelector('.btn-learn');
      if (btn) {
        btn.textContent = isLearned ? '★' : '☆';
        btn.classList.toggle('is-learned', isLearned);
      }
      card.classList.toggle('learned', isLearned);
    });
  }
};
