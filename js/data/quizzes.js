const QUIZ_SETS = [
  {
    id: 'vowels_mc',
    title: 'Vowel Recognition',
    icon: '🔤',
    description: 'Identify Hindi vowels from their sound',
    type: 'multiple_choice',
    lessonContext: 'vowels',
    questionCount: 10,
    difficulty: 1
  },
  {
    id: 'consonants_mc',
    title: 'Consonant Recognition',
    icon: '🔠',
    description: 'Match Devanagari consonants to their pronunciation',
    type: 'multiple_choice',
    lessonContext: 'consonants',
    questionCount: 10,
    difficulty: 2
  },
  {
    id: 'matras_mc',
    title: 'Matra Practice',
    icon: '✍️',
    description: 'Identify vowel signs attached to consonants',
    type: 'multiple_choice',
    lessonContext: 'matras',
    questionCount: 8,
    difficulty: 2
  },
  {
    id: 'vocab_match',
    title: 'Vocabulary Match',
    icon: '🔗',
    description: 'Match Hindi words to their English meanings',
    type: 'match_script',
    lessonContext: 'vocab_mixed',
    questionCount: 5,
    difficulty: 1
  },
  {
    id: 'greetings_fill',
    title: 'Greetings Fill-In',
    icon: '👋',
    description: 'Complete common Hindi greetings',
    type: 'fill_blank',
    lessonContext: 'greetings',
    questionCount: 8,
    difficulty: 1
  },
  {
    id: 'numbers_mc',
    title: 'Number Challenge',
    icon: '🔢',
    description: 'Translate Hindi numbers to English',
    type: 'multiple_choice',
    lessonContext: 'numbers',
    questionCount: 10,
    difficulty: 1
  },
  {
    id: 'mixed_vocab_mc',
    title: 'Vocabulary Sprint',
    icon: '⚡',
    description: 'Quick-fire vocabulary across all categories',
    type: 'multiple_choice',
    lessonContext: 'vocab_all',
    questionCount: 12,
    difficulty: 2
  },
  {
    id: 'script_match',
    title: 'Script Matching',
    icon: '🎯',
    description: 'Match Devanagari letters to their transliterations',
    type: 'match_script',
    lessonContext: 'script_mixed',
    questionCount: 5,
    difficulty: 2
  }
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffleArray(arr).slice(0, n);
}

function getAllLetters() {
  const letters = [...VOWELS];
  CONSONANT_ROWS.forEach(row => letters.push(...row.consonants));
  return letters;
}

function generateMultipleChoiceQuestion(item, pool, type) {
  if (type === 'vowels' || type === 'consonants' || type === 'script_mixed') {
    // Show Devanagari → pick transliteration
    const wrong = shuffleArray(pool.filter(p => p.id !== item.id)).slice(0, 3);
    const options = shuffleArray([item, ...wrong]);
    return {
      prompt: 'What sound does this letter make?',
      promptScript: item.devanagari,
      promptType: 'script',
      options: options.map(o => ({ id: o.id, label: o.transliteration })),
      answer: item.id,
      explanation: `"${item.devanagari}" is pronounced "${item.transliteration}" [${item.ipa}]. Example: ${item.example.word} (${item.example.meaning})`
    };
  }

  if (type === 'matras') {
    const wrong = shuffleArray(pool.filter(p => p.id !== item.id)).slice(0, 3);
    const options = shuffleArray([item, ...wrong]);
    return {
      prompt: 'How is this matra combination read?',
      promptScript: item.result,
      promptType: 'script',
      options: options.map(o => ({ id: o.id, label: o.transliteration })),
      answer: item.id,
      explanation: `"${item.result}" = "${item.appliedTo}" + "${item.symbol}" = "${item.transliteration}". Example: ${item.example.word} (${item.example.meaning})`
    };
  }

  // Vocabulary: show Hindi → pick English
  const wrong = shuffleArray(pool.filter(p => p.id !== item.id)).slice(0, 3);
  const options = shuffleArray([item, ...wrong]);
  return {
    prompt: 'What does this word mean?',
    promptScript: item.hindi,
    promptSubtext: item.romanized,
    promptType: 'word',
    options: options.map(o => ({ id: o.id, label: o.english })),
    answer: item.id,
    explanation: `"${item.hindi}" (${item.romanized}) means "${item.english}"`
  };
}

function generateMatchQuestions(items) {
  // Returns a single "question" with 5 pairs for the match exercise
  const pairs = pickRandom(items, Math.min(5, items.length));
  return {
    prompt: 'Match each Hindi word to its English meaning',
    promptType: 'match',
    pairs: pairs.map(item => ({
      id: item.id,
      left: item.hindi || item.devanagari,
      leftLabel: item.romanized || item.transliteration,
      right: item.english || item.meaning
    })),
    answer: pairs.map(p => p.id),
    explanation: pairs.map(p => `${p.hindi || p.devanagari} = ${p.english || p.meaning}`).join(', ')
  };
}

function generateFillBlankQuestions(items) {
  const templates = [
    item => ({ sentence: `The Hindi word for "${item.english}" is ___`, blank: item.hindi, altBlank: item.romanized }),
    item => ({ sentence: `"${item.hindi}" means ___ in English`, blank: item.english, altBlank: item.english.toLowerCase() }),
    item => ({ sentence: `How do you say "${item.english}" in Hindi? ___`, blank: item.hindi, altBlank: item.romanized })
  ];

  return items.map(item => {
    const tmpl = templates[Math.floor(Math.random() * templates.length)](item);
    return {
      prompt: tmpl.sentence,
      promptType: 'fill',
      answer: tmpl.blank,
      altAnswer: tmpl.altBlank,
      explanation: `${item.hindi} (${item.romanized}) = ${item.english}`
    };
  });
}

function buildQuizQuestions(quizSet) {
  const { type, lessonContext, questionCount } = quizSet;
  let pool = [];
  let questions = [];

  if (type === 'multiple_choice') {
    if (lessonContext === 'vowels') {
      pool = [...VOWELS];
    } else if (lessonContext === 'consonants') {
      CONSONANT_ROWS.forEach(row => pool.push(...row.consonants));
    } else if (lessonContext === 'matras') {
      pool = [...MATRAS];
    } else if (lessonContext === 'numbers') {
      pool = WORDS.filter(w => w.category === 'numbers');
    } else if (lessonContext === 'vocab_all') {
      pool = [...WORDS];
    } else if (lessonContext === 'vocab_mixed') {
      pool = [...WORDS];
    } else if (lessonContext === 'script_mixed') {
      pool = getAllLetters();
    }

    const items = pickRandom(pool, Math.min(questionCount, pool.length));
    questions = items.map(item => generateMultipleChoiceQuestion(item, pool, lessonContext));

  } else if (type === 'match_script') {
    if (lessonContext === 'vocab_mixed') {
      pool = pickRandom(WORDS, 20);
    } else if (lessonContext === 'script_mixed') {
      pool = getAllLetters();
    } else {
      pool = getAllLetters();
    }
    // For match, we generate one round of 5 pairs (counts as questionCount/5 rounds)
    const rounds = Math.max(1, Math.floor(questionCount / 5));
    for (let i = 0; i < rounds; i++) {
      questions.push(generateMatchQuestions(pool));
    }

  } else if (type === 'fill_blank') {
    pool = WORDS.filter(w => w.category === lessonContext);
    if (pool.length === 0) pool = [...WORDS];
    const items = pickRandom(pool, Math.min(questionCount, pool.length));
    questions = generateFillBlankQuestions(items);
  }

  return questions;
}
