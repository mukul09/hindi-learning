const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500];

const BADGES = [
  { id: 'first_lesson',   icon: '🌱', label: 'First Steps',    condition: s => s.completedLessons.length >= 1 },
  { id: 'vowel_master',   icon: '🅰️', label: 'Vowel Master',   condition: s => s.completedLessons.includes('vowels') },
  { id: 'consonant_pro',  icon: '🔤', label: 'Consonant Pro',  condition: s => s.completedLessons.includes('consonants') },
  { id: 'matra_expert',   icon: '✍️', label: 'Matra Expert',   condition: s => s.completedLessons.includes('matras') },
  { id: 'vocab_25',       icon: '📚', label: 'Word Collector', condition: s => s.learnedWords.length >= 25 },
  { id: 'quiz_5',         icon: '🎯', label: 'Quiz Taker',     condition: s => s.quizHistory.length >= 5 },
  { id: 'perfect_quiz',   icon: '⭐', label: 'Perfect Score',  condition: s => Object.values(s.quizBestScores).some(v => v >= 100) },
  { id: 'streak_7',       icon: '🔥', label: 'Week Warrior',   condition: s => s.streakCount >= 7 },
  { id: 'level_3',        icon: '📖', label: 'Rising Scholar', condition: s => s.level >= 3 },
  { id: 'level_6',        icon: '🏆', label: 'Hindi Master',   condition: s => s.level >= 6 }
];

const Progress = {
  state: null,

  init() {
    const today = new Date().toISOString().slice(0, 10);

    this.state = {
      xp:               Storage.get('xp', 0),
      level:            Storage.get('level', 1),
      streakCount:      Storage.get('streak_count', 0),
      streakLastDate:   Storage.get('streak_last_date', null),
      completedLessons: Storage.get('completed_lessons', []),
      learnedWords:     Storage.get('learned_words', []),
      quizHistory:      Storage.get('quiz_history', []),
      quizBestScores:   Storage.get('quiz_best_scores', {}),
      badges:           Storage.get('badges', [])
    };

    this.updateStreak();
    this._updateNavDisplay();
  },

  getState() {
    return this.state;
  },

  updateStreak() {
    const today     = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const last      = this.state.streakLastDate;

    if (last === today) {
      // Already counted today
    } else if (last === yesterday) {
      this.state.streakCount++;
      this.state.streakLastDate = today;
      this._save();
    } else {
      this.state.streakCount    = 1;
      this.state.streakLastDate = today;
      this._save();
    }
  },

  addXP(amount) {
    const oldLevel = this.state.level;
    this.state.xp += amount;
    this.state.level = this._getLevelFromXP(this.state.xp);
    this._save();
    this._updateNavDisplay();

    if (this.state.level > oldLevel) {
      APP.emit('level:up', { level: this.state.level });
    }

    APP.emit('xp:earned', { amount });
  },

  completeLesson(lessonId) {
    if (!this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons.push(lessonId);
      this._save();
      this.addXP(50);
      this.updateStreak();
      this.checkBadges();
      APP.emit('lesson:completed', { lessonId });
      showToast('Lesson complete! +50 XP', 'success');
    }
  },

  markWordLearned(wordId) {
    const idx = this.state.learnedWords.indexOf(wordId);
    if (idx === -1) {
      this.state.learnedWords.push(wordId);
      this.addXP(5);
      this.checkBadges();
    } else {
      this.state.learnedWords.splice(idx, 1);
    }
    this._save();
    return this.state.learnedWords.includes(wordId);
  },

  isWordLearned(wordId) {
    return this.state.learnedWords.includes(wordId);
  },

  saveQuizResult(result) {
    this.state.quizHistory.unshift(result);
    if (this.state.quizHistory.length > 50) {
      this.state.quizHistory = this.state.quizHistory.slice(0, 50);
    }

    const pct = Math.round((result.score / result.total) * 100);
    if (!this.state.quizBestScores[result.quizId] || pct > this.state.quizBestScores[result.quizId]) {
      this.state.quizBestScores[result.quizId] = pct;
    }

    this.addXP(result.xpEarned);
    this.updateStreak();
    this.checkBadges();
    this._save();
  },

  checkBadges() {
    const newBadges = [];
    BADGES.forEach(badge => {
      if (!this.state.badges.includes(badge.id) && badge.condition(this.state)) {
        this.state.badges.push(badge.id);
        newBadges.push(badge);
      }
    });

    if (newBadges.length) {
      this._save();
      newBadges.forEach(b => {
        showToast(b.icon + ' Badge earned: ' + b.label + '!', 'badge', 4000);
      });
    }
  },

  getLessonStatus(lessonId) {
    return this.state.completedLessons.includes(lessonId) ? 'complete' : 'active';
  },

  renderDashboard() {
    const s = this.state;
    const currentXP   = s.xp;
    const levelIdx    = s.level - 1;
    const nextLevelXP = LEVEL_THRESHOLDS[s.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const prevLevelXP = LEVEL_THRESHOLDS[levelIdx] || 0;
    const xpInLevel   = currentXP - prevLevelXP;
    const xpNeeded    = nextLevelXP - prevLevelXP;
    const xpPct       = s.level >= LEVEL_THRESHOLDS.length ? 100 : Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

    const totalLessons = 3; // vowels, consonants, matras
    const totalWords   = WORDS.length;

    $('#progress').innerHTML = `
      <div class="section-header">
        <h2>Your Progress</h2>
      </div>

      <div class="progress-hero">
        <div class="level-badge-large">
          <span class="level-num">${s.level}</span>
          <span class="level-label">Level</span>
        </div>
        <div class="level-xp-info">
          <div class="xp-label">${currentXP} XP total</div>
          <div class="xp-bar-white">
            <div class="bar-fill" style="width:${xpPct}%"></div>
          </div>
          <div class="xp-numbers">${s.level < 6 ? xpInLevel + ' / ' + xpNeeded + ' XP to Level ' + (s.level + 1) : 'Max Level!'}</div>
        </div>
        <div class="streak-hero">
          <span class="streak-num"><span class="streak-fire">🔥</span>${s.streakCount}</span>
          <span class="streak-label">Day Streak</span>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${s.completedLessons.length}<span style="font-size:1rem;color:var(--color-text-muted)">/${totalLessons}</span></div>
          <div class="stat-label">Lessons Done</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${s.learnedWords.length}<span style="font-size:1rem;color:var(--color-text-muted)">/${totalWords}</span></div>
          <div class="stat-label">Words Learned</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${s.quizHistory.length}</div>
          <div class="stat-label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Object.keys(s.quizBestScores).length > 0 ? Math.max(...Object.values(s.quizBestScores)) + '%' : '—'}</div>
          <div class="stat-label">Best Score</div>
        </div>
      </div>

      <div class="badges-section">
        <h3>Badges Earned</h3>
        <div class="badge-grid">
          ${BADGES.map(b => `
            <div class="badge-item ${s.badges.includes(b.id) ? 'earned' : 'locked'}">
              <span class="badge-icon">${b.icon}</span>
              <div class="badge-name">${b.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="lesson-map">
        <h3>Lesson Map</h3>
        <div class="lesson-nodes">
          ${[
            { id: 'vowels',      label: 'Vowels',      icon: '🅰️' },
            { id: 'consonants',  label: 'Consonants',  icon: '🔤' },
            { id: 'matras',      label: 'Matras',      icon: '✍️' }
          ].map(l => `
            <div class="lesson-node ${this.getLessonStatus(l.id)}">
              <div class="node-circle">${s.completedLessons.includes(l.id) ? '✓' : l.icon}</div>
              <div class="node-label">${l.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${s.quizHistory.length > 0 ? `
        <div class="quiz-history-section">
          <h3>Recent Quizzes</h3>
          <table class="history-table">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Score</th>
                <th>XP</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${s.quizHistory.slice(0, 10).map(r => {
                const pct = Math.round((r.score / r.total) * 100);
                return `<tr>
                  <td>${r.quizTitle}</td>
                  <td><span class="score-pct${pct < 60 ? ' low' : ''}">${pct}%</span> (${r.score}/${r.total})</td>
                  <td>+${r.xpEarned}</td>
                  <td>${r.date}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <div style="margin-top: var(--space-xl); text-align:center;">
        <button class="btn btn-secondary" onclick="if(confirm('Reset all progress?')) { Storage.clear(); location.reload(); }">Reset Progress</button>
      </div>
    `;
  },

  _getLevelFromXP(xp) {
    let level = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) { level = i + 1; break; }
    }
    return Math.min(level, 6);
  },

  _save() {
    Storage.set('xp',               this.state.xp);
    Storage.set('level',            this.state.level);
    Storage.set('streak_count',     this.state.streakCount);
    Storage.set('streak_last_date', this.state.streakLastDate);
    Storage.set('completed_lessons',this.state.completedLessons);
    Storage.set('learned_words',    this.state.learnedWords);
    Storage.set('quiz_history',     this.state.quizHistory);
    Storage.set('quiz_best_scores', this.state.quizBestScores);
    Storage.set('badges',           this.state.badges);
  },

  _updateNavDisplay() {
    const xpEl     = $('#xp-count');
    const streakEl = $('#streak-count');
    if (xpEl)     xpEl.textContent     = this.state.xp;
    if (streakEl) streakEl.textContent = this.state.streakCount;
  }
};
