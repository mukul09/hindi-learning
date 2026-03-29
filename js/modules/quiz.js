const Quiz = {
  state: null,

  init() {
    this._renderSelectionScreen();
  },

  _renderSelectionScreen() {
    const grid = $('#quiz-selection-grid');
    if (!grid) return;
    grid.innerHTML = '';

    QUIZ_SETS.forEach(set => {
      const bestScore = Progress.getState().quizBestScores[set.id];
      const card = document.createElement('div');
      card.className = 'quiz-option-card';
      card.innerHTML = `
        <div class="quiz-icon">${set.icon}</div>
        <h3>${set.title}</h3>
        <p>${set.description}</p>
        <div class="quiz-meta">
          <span>${set.questionCount} questions</span>
          ${bestScore != null ? `<span class="best-score">Best: ${bestScore}%</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm" style="margin-top:var(--space-sm)">Start</button>
      `;
      card.querySelector('button').addEventListener('click', () => this.startQuiz(set));
      grid.appendChild(card);
    });
  },

  startQuiz(quizSet) {
    const questions = buildQuizQuestions(quizSet);
    this.state = {
      quizSet,
      questions,
      currentIndex: 0,
      score: 0,
      xpEarned: 0,
      streak: 0,
      answered: false,
      missedItems: [],
      startTime: Date.now()
    };

    hide($('#quiz-selection'));
    show($('#quiz-active'));
    hide($('#quiz-summary'));

    this._renderQuestion();
  },

  _renderQuestion() {
    const { questions, currentIndex } = this.state;
    const q = questions[currentIndex];
    const total = questions.length;

    // Update progress bar
    const pct = Math.round((currentIndex / total) * 100);
    const barFill = $('#quiz-progress-fill');
    if (barFill) barFill.style.width = pct + '%';

    $('#quiz-counter').textContent = (currentIndex + 1) + ' / ' + total;
    $('#quiz-score-badge').textContent = 'Score: ' + this.state.score + '/' + currentIndex;

    this.state.answered = false;
    this.state.questionStartTime = Date.now();

    const container = $('#question-container');
    container.innerHTML = '';
    container.className = 'question-container animate-fade-in';

    if (q.promptType === 'match') {
      this._renderMatchQuestion(q, container);
    } else if (q.promptType === 'fill') {
      this._renderFillQuestion(q, container);
    } else {
      this._renderMCQuestion(q, container);
    }

    // Check / Next buttons
    const checkBtn = $('#quiz-check-btn');
    const nextBtn  = $('#quiz-next-btn');
    if (checkBtn) { show(checkBtn); checkBtn.disabled = false; }
    if (nextBtn)  { hide(nextBtn); }
  },

  _renderMCQuestion(q, container) {
    const promptDiv = document.createElement('div');
    promptDiv.className = 'question-prompt';
    promptDiv.textContent = q.prompt;

    const charDiv = document.createElement('div');
    if (q.promptType === 'script') {
      charDiv.className = 'question-char';
      charDiv.textContent = q.promptScript;
    } else {
      charDiv.className = 'question-text';
      charDiv.innerHTML = `<span style="font-family:var(--font-devanagari)">${q.promptScript}</span>`;
      if (q.promptSubtext) {
        charDiv.innerHTML += `<br><span style="font-size:1rem;color:var(--color-text-muted);font-family:var(--font-ui)">${q.promptSubtext}</span>`;
      }
    }

    const optGrid = document.createElement('div');
    optGrid.className = 'mc-options';

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mc-option';
      btn.dataset.id = opt.id;

      if (q.promptType === 'script') {
        btn.textContent = opt.label;
      } else {
        btn.textContent = opt.label;
      }

      btn.addEventListener('click', () => {
        if (this.state.answered) return;
        this._submitMCAnswer(opt.id, q, optGrid);
      });

      optGrid.appendChild(btn);
    });

    container.appendChild(promptDiv);
    container.appendChild(charDiv);
    container.appendChild(optGrid);
  },

  _submitMCAnswer(selectedId, q, optGrid) {
    this.state.answered = true;
    const correct = selectedId === q.answer;
    const elapsed = (Date.now() - this.state.questionStartTime) / 1000;
    const pts = this._calcPoints(correct, elapsed);

    if (correct) {
      this.state.score++;
      this.state.streak++;
    } else {
      this.state.streak = 0;
      this.state.missedItems.push(q);
    }
    this.state.xpEarned += pts;

    // Visual feedback on buttons
    optGrid.querySelectorAll('.mc-option').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === q.answer) btn.classList.add('reveal-correct');
      if (btn.dataset.id === selectedId && !correct) btn.classList.add('wrong');
      if (btn.dataset.id === selectedId && correct) {
        btn.classList.remove('reveal-correct');
        btn.classList.add('correct');
        btn.classList.add('animate-correct-pulse');
      }
    });

    this._showExplanation(q, correct, optGrid.parentElement);

    hide($('#quiz-check-btn'));
    show($('#quiz-next-btn'));
  },

  _renderMatchQuestion(q, container) {
    const promptDiv = document.createElement('div');
    promptDiv.className = 'question-prompt';
    promptDiv.textContent = q.prompt;

    const colsDiv = document.createElement('div');
    colsDiv.className = 'match-columns';

    const leftCol = document.createElement('div');
    leftCol.className = 'match-col';
    leftCol.innerHTML = '<div class="match-col-label">Hindi</div>';

    const rightCol = document.createElement('div');
    rightCol.className = 'match-col';
    rightCol.innerHTML = '<div class="match-col-label">English</div>';

    const shuffledLeft  = shuffleArray([...q.pairs]);
    const shuffledRight = shuffleArray([...q.pairs]);

    let selectedLeft  = null;
    let selectedRight = null;
    let matchedCount  = 0;

    shuffledLeft.forEach(pair => {
      const item = document.createElement('div');
      item.className = 'match-item';
      item.dataset.id = pair.id;
      item.innerHTML = `<span class="devanagari-match">${pair.left}</span>`;
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;
        leftCol.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedLeft = pair.id;
        tryMatch();
      });
      leftCol.appendChild(item);
    });

    shuffledRight.forEach(pair => {
      const item = document.createElement('div');
      item.className = 'match-item';
      item.dataset.id = pair.id;
      item.textContent = pair.right;
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;
        rightCol.querySelectorAll('.match-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedRight = pair.id;
        tryMatch();
      });
      rightCol.appendChild(item);
    });

    function tryMatch() {
      if (!selectedLeft || !selectedRight) return;

      const lEl = leftCol.querySelector(`[data-id="${selectedLeft}"]`);
      const rEl = rightCol.querySelector(`[data-id="${selectedRight}"]`);

      if (selectedLeft === selectedRight) {
        lEl.classList.remove('selected');
        rEl.classList.remove('selected');
        lEl.classList.add('matched');
        rEl.classList.add('matched');
        matchedCount++;

        if (matchedCount === q.pairs.length) {
          // All matched
          const quiz = Quiz;
          quiz.state.answered = true;
          quiz.state.score++;
          quiz.state.xpEarned += 15;
          hide($('#quiz-check-btn'));
          show($('#quiz-next-btn'));
        }
      } else {
        lEl.classList.add('wrong-pair');
        rEl.classList.add('wrong-pair');
        setTimeout(() => {
          lEl.classList.remove('wrong-pair', 'selected');
          rEl.classList.remove('wrong-pair', 'selected');
        }, 600);
      }

      selectedLeft  = null;
      selectedRight = null;
    }

    colsDiv.appendChild(leftCol);
    colsDiv.appendChild(rightCol);
    container.appendChild(promptDiv);
    container.appendChild(colsDiv);

    // Hide check button for match (auto-advances when done)
    hide($('#quiz-check-btn'));
  },

  _renderFillQuestion(q, container) {
    const promptDiv = document.createElement('div');
    promptDiv.className = 'question-prompt';

    const wrapper = document.createElement('div');
    wrapper.className = 'fill-blank-wrapper';

    const sentence = document.createElement('div');
    sentence.className = 'fill-blank-sentence';
    sentence.textContent = q.prompt;

    const inputRow = document.createElement('div');
    inputRow.className = 'fill-blank-input-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'fill-blank-input';
    input.placeholder = 'Type your answer…';
    input.autocomplete = 'off';

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !this.state.answered) {
        this._submitFillAnswer(input.value, q, input, container);
      }
    });

    inputRow.appendChild(input);
    wrapper.appendChild(sentence);
    wrapper.appendChild(inputRow);
    container.appendChild(promptDiv);
    container.appendChild(wrapper);

    // Check button submits fill blank
    const checkBtn = $('#quiz-check-btn');
    if (checkBtn) {
      const newBtn = checkBtn.cloneNode(true);
      checkBtn.parentNode.replaceChild(newBtn, checkBtn);
      newBtn.id = 'quiz-check-btn';
      newBtn.addEventListener('click', () => {
        if (!this.state.answered) {
          this._submitFillAnswer(input.value, q, input, container);
        }
      });
    }

    setTimeout(() => input.focus(), 100);
  },

  _submitFillAnswer(userInput, q, inputEl, container) {
    this.state.answered = true;
    const correct = this._validateFill(userInput, q.answer, q.altAnswer);
    const elapsed = (Date.now() - this.state.questionStartTime) / 1000;
    const pts = this._calcPoints(correct, elapsed);

    if (correct) {
      this.state.score++;
      this.state.streak++;
      inputEl.classList.add('correct');
    } else {
      this.state.streak = 0;
      inputEl.classList.add('wrong');
      this.state.missedItems.push(q);
    }
    this.state.xpEarned += pts;

    this._showExplanation(q, correct, container);
    hide($('#quiz-check-btn'));
    show($('#quiz-next-btn'));
  },

  _validateFill(input, answer, altAnswer) {
    const normalize = s => s.normalize('NFC').toLowerCase().trim().replace(/\s+/g, ' ');
    const u = normalize(input);
    const a = normalize(answer);
    const b = altAnswer ? normalize(altAnswer) : null;
    return u === a || (b && u === b) || (u.length > 0 && a.startsWith(u) && u.length >= a.length - 1);
  },

  _showExplanation(q, correct, parentEl) {
    const box = document.createElement('div');
    box.className = 'explanation-box ' + (correct ? 'correct' : 'wrong');
    box.textContent = (correct ? '✓ Correct! ' : '✗ Not quite. ') + q.explanation;
    parentEl.appendChild(box);
  },

  _calcPoints(correct, elapsedSec) {
    if (!correct) return 0;
    let pts = 10;
    if (elapsedSec <= 5) pts += 5;
    if (this.state.streak >= 3) pts = Math.round(pts * 1.5);
    return pts;
  },

  nextQuestion() {
    this.state.currentIndex++;
    if (this.state.currentIndex >= this.state.questions.length) {
      this._endQuiz();
    } else {
      this._renderQuestion();
    }
  },

  _endQuiz() {
    const { quizSet, score, questions, xpEarned, missedItems } = this.state;
    const total = questions.length;
    const pct   = Math.round((score / total) * 100);

    const result = {
      quizId:    quizSet.id,
      quizTitle: quizSet.title,
      score,
      total,
      xpEarned,
      date: new Date().toLocaleDateString()
    };

    Progress.saveQuizResult(result);
    this._renderSelectionScreen(); // update best scores

    hide($('#quiz-active'));
    show($('#quiz-summary'));

    let title, subtitle;
    if (pct === 100)      { title = 'Perfect Score! 🎉'; subtitle = 'Amazing! You got everything right!'; }
    else if (pct >= 80)   { title = 'Great job! 🌟';     subtitle = 'You\'re doing really well!'; }
    else if (pct >= 60)   { title = 'Good effort! 👍';   subtitle = 'Keep practicing to improve!'; }
    else                  { title = 'Keep going! 💪';    subtitle = 'Practice makes perfect!'; }

    $('#quiz-summary').innerHTML = `
      <div class="summary-score-circle">
        <span class="score-num">${score}</span>
        <span class="score-denom">/ ${total}</span>
      </div>
      <div class="summary-title">${title}</div>
      <div class="summary-subtitle">${subtitle}</div>
      <div class="summary-xp">+${xpEarned} XP earned</div>

      ${missedItems.length > 0 ? `
        <div class="missed-items">
          <h3>Review These (${missedItems.length})</h3>
          ${missedItems.slice(0, 6).map(q => `
            <div class="missed-item">
              ${q.promptScript ? `<span class="missed-hindi">${q.promptScript}</span>` : ''}
              <span>${q.explanation}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="summary-actions">
        <button class="btn btn-primary" id="quiz-retry-btn">Try Again</button>
        <button class="btn btn-secondary" id="quiz-back-btn">All Quizzes</button>
      </div>
    `;

    $('#quiz-retry-btn').addEventListener('click', () => this.startQuiz(quizSet));
    $('#quiz-back-btn').addEventListener('click', () => {
      hide($('#quiz-summary'));
      show($('#quiz-selection'));
    });

    animateXP(xpEarned);
  }
};
