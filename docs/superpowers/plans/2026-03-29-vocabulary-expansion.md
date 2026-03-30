# Vocabulary Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 100 new Hindi vocabulary words across 4 new categories (festivals, shopping, cooking, classroom) to the existing vocabulary data file.

**Architecture:** Single file change — `js/data/vocabulary.js` contains both the `VOCAB_CATEGORIES` array and the `WORDS` array. Adding a category key to `VOCAB_CATEGORIES` is enough for the UI to render a new tab; appending word objects to `WORDS` populates it. No other files need to change.

**Tech Stack:** Plain JavaScript data file, no build step. Verify by opening `index.html` in a browser (or counting entries with grep).

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `js/data/vocabulary.js` | **Modify** | Add 4 category strings + 100 word objects |

---

## Task 1: Register the 4 new categories

**Files:**
- Modify: `js/data/vocabulary.js` (line 1–7, the `VOCAB_CATEGORIES` array)

- [ ] **Step 1: Add 4 category keys to `VOCAB_CATEGORIES`**

Find this array at the top of `js/data/vocabulary.js`:

```js
const VOCAB_CATEGORIES = [
  'greetings', 'numbers', 'colors', 'food', 'family', 'body', 'time',
  'animals', 'verbs', 'adjectives', 'phrases',
  'weather', 'clothes', 'transport', 'house', 'school', 'jobs',
  'health', 'nature', 'sports', 'emotions', 'places', 'days',
  'vegetables', 'fruits', 'sentences'
];
```

Replace it with:

```js
const VOCAB_CATEGORIES = [
  'greetings', 'numbers', 'colors', 'food', 'family', 'body', 'time',
  'animals', 'verbs', 'adjectives', 'phrases',
  'weather', 'clothes', 'transport', 'house', 'school', 'jobs',
  'health', 'nature', 'sports', 'emotions', 'places', 'days',
  'vegetables', 'fruits', 'sentences',
  'festivals', 'shopping', 'cooking', 'classroom'
];
```

- [ ] **Step 2: Verify**

```bash
grep -c "festivals\|shopping\|cooking\|classroom" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: at least 4 (the 4 new strings in VOCAB_CATEGORIES).

- [ ] **Step 3: Commit**

```bash
git add js/data/vocabulary.js
git commit -m "feat: register festivals, shopping, cooking, classroom categories"
```

---

## Task 2: Add festivals words (25 words)

**Files:**
- Modify: `js/data/vocabulary.js` (append to the end of the `WORDS` array)

- [ ] **Step 1: Append 25 festivals words to the `WORDS` array**

Find the last word entry in `js/data/vocabulary.js` (currently the last entry before the closing `];` of the WORDS array). Add a `// Festivals & Religion` comment block and all 25 entries before the closing `];`:

```js
  // Festivals & Religion
  { id: 'diwali',       hindi: 'दिवाली',         romanized: 'diwaali',          english: 'Diwali',                   category: 'festivals', difficulty: 1 },
  { id: 'holi',         hindi: 'होली',            romanized: 'holi',             english: 'Holi',                     category: 'festivals', difficulty: 1 },
  { id: 'eid',          hindi: 'ईद',              romanized: 'eid',              english: 'Eid',                      category: 'festivals', difficulty: 1 },
  { id: 'dussehra',     hindi: 'दशहरा',           romanized: 'dussehra',         english: 'Dussehra',                 category: 'festivals', difficulty: 2 },
  { id: 'navratri',     hindi: 'नवरात्रि',        romanized: 'navraatri',        english: 'Navratri',                 category: 'festivals', difficulty: 2 },
  { id: 'mandir',       hindi: 'मंदिर',           romanized: 'mandir',           english: 'Temple',                   category: 'festivals', difficulty: 1 },
  { id: 'masjid',       hindi: 'मस्जिद',          romanized: 'masjid',           english: 'Mosque',                   category: 'festivals', difficulty: 1 },
  { id: 'puja',         hindi: 'पूजा',            romanized: 'puja',             english: 'Worship / Prayer',         category: 'festivals', difficulty: 1 },
  { id: 'prasad',       hindi: 'प्रसाद',          romanized: 'prasaad',          english: 'Sacred food offering',     category: 'festivals', difficulty: 2 },
  { id: 'diya',         hindi: 'दीया',            romanized: 'diya',             english: 'Oil lamp',                 category: 'festivals', difficulty: 1 },
  { id: 'patakha',      hindi: 'पटाखा',           romanized: 'pataakha',         english: 'Firecracker',              category: 'festivals', difficulty: 2 },
  { id: 'rangoli',      hindi: 'रंगोली',          romanized: 'rangoli',          english: 'Rangoli',                  category: 'festivals', difficulty: 2 },
  { id: 'gulal',        hindi: 'गुलाल',           romanized: 'gulaal',           english: 'Colored powder (Holi)',    category: 'festivals', difficulty: 2 },
  { id: 'upvaas',       hindi: 'उपवास',           romanized: 'upvaas',           english: 'Fast / Fasting',           category: 'festivals', difficulty: 2 },
  { id: 'vardaan',      hindi: 'वरदान',           romanized: 'vardaan',          english: 'Blessing',                 category: 'festivals', difficulty: 2 },
  { id: 'bhagwan',      hindi: 'भगवान',           romanized: 'bhagwaan',         english: 'God',                      category: 'festivals', difficulty: 1 },
  { id: 'thaali',       hindi: 'थाली',            romanized: 'thaali',           english: 'Ritual plate',             category: 'festivals', difficulty: 1 },
  { id: 'aarti',        hindi: 'आरती',            romanized: 'aarti',            english: 'Devotional ritual',        category: 'festivals', difficulty: 2 },
  { id: 'tyohaar',      hindi: 'त्योहार',         romanized: 'tyohaar',          english: 'Festival',                 category: 'festivals', difficulty: 1 },
  { id: 'mela',         hindi: 'मेला',            romanized: 'mela',             english: 'Fair / Festival',          category: 'festivals', difficulty: 1 },
  { id: 'mithaibox',    hindi: 'मिठाई का डब्बा', romanized: 'mithaai ka dabba', english: 'Box of sweets',            category: 'festivals', difficulty: 2 },
  { id: 'uphar',        hindi: 'उपहार',           romanized: 'uphaar',           english: 'Gift',                     category: 'festivals', difficulty: 1 },
  { id: 'khushi',       hindi: 'खुशी',            romanized: 'khushi',           english: 'Happiness / Joy',          category: 'festivals', difficulty: 1 },
  { id: 'shubhkaamna',  hindi: 'शुभकामना',        romanized: 'shubhkaamna',      english: 'Best wishes',              category: 'festivals', difficulty: 2 },
  { id: 'parv',         hindi: 'पर्व',            romanized: 'parv',             english: 'Occasion / Festival',      category: 'festivals', difficulty: 2 },
```

- [ ] **Step 2: Verify count**

```bash
grep -c "category: 'festivals'" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `25`

- [ ] **Step 3: Commit**

```bash
git add js/data/vocabulary.js
git commit -m "feat: add 25 festivals & religion vocabulary words"
```

---

## Task 3: Add shopping words (25 words)

**Files:**
- Modify: `js/data/vocabulary.js` (append after festivals block)

- [ ] **Step 1: Append 25 shopping words**

```js
  // Shopping & Money
  { id: 'rupaya',    hindi: 'रुपया',       romanized: 'rupaya',       english: 'Rupee',                category: 'shopping', difficulty: 1 },
  { id: 'daam',      hindi: 'दाम',         romanized: 'daam',         english: 'Price',                category: 'shopping', difficulty: 1 },
  { id: 'sasta',     hindi: 'सस्ता',       romanized: 'sasta',        english: 'Cheap',                category: 'shopping', difficulty: 1 },
  { id: 'mahanga',   hindi: 'महँगा',       romanized: 'mahangaa',     english: 'Expensive',            category: 'shopping', difficulty: 1 },
  { id: 'bazaar',    hindi: 'बाज़ार',      romanized: 'baazaar',      english: 'Market',               category: 'shopping', difficulty: 1 },
  { id: 'dukaan',    hindi: 'दुकान',       romanized: 'dukaan',       english: 'Shop / Store',         category: 'shopping', difficulty: 1 },
  { id: 'kharidna',  hindi: 'खरीदना',      romanized: 'kharidna',     english: 'To buy',               category: 'shopping', difficulty: 1 },
  { id: 'bechna',    hindi: 'बेचना',       romanized: 'bechna',       english: 'To sell',              category: 'shopping', difficulty: 1 },
  { id: 'paisa',     hindi: 'पैसा',        romanized: 'paisa',        english: 'Money / Coins',        category: 'shopping', difficulty: 1 },
  { id: 'bill',      hindi: 'बिल',         romanized: 'bil',          english: 'Bill / Receipt',       category: 'shopping', difficulty: 1 },
  { id: 'chhoot',    hindi: 'छूट',         romanized: 'chhoot',       english: 'Discount',             category: 'shopping', difficulty: 2 },
  { id: 'maal',      hindi: 'माल',         romanized: 'maal',         english: 'Goods / Products',     category: 'shopping', difficulty: 2 },
  { id: 'tol',       hindi: 'तोल',         romanized: 'tol',          english: 'Weight',               category: 'shopping', difficulty: 2 },
  { id: 'naap',      hindi: 'नाप',         romanized: 'naap',         english: 'Size / Measurement',   category: 'shopping', difficulty: 2 },
  { id: 'rangpasand',hindi: 'रंग पसंद है', romanized: 'rang pasand hai', english: 'I like the color', category: 'shopping', difficulty: 2 },
  { id: 'kitna',     hindi: 'कितना',       romanized: 'kitna',        english: 'How much',             category: 'shopping', difficulty: 1 },
  { id: 'zyada',     hindi: 'ज़्यादा',     romanized: 'zyaada',       english: 'Too much / More',      category: 'shopping', difficulty: 1 },
  { id: 'thoda',     hindi: 'थोड़ा',       romanized: 'thoda',        english: 'A little / Less',      category: 'shopping', difficulty: 1 },
  { id: 'lenahai',   hindi: 'लेना है',     romanized: 'lena hai',     english: 'I want to buy',        category: 'shopping', difficulty: 1 },
  { id: 'wapas',     hindi: 'वापस',        romanized: 'waapas',       english: 'Return / Back',        category: 'shopping', difficulty: 1 },
  { id: 'khula',     hindi: 'खुला',        romanized: 'khula',        english: 'Open (store)',         category: 'shopping', difficulty: 1 },
  { id: 'band',      hindi: 'बंद',         romanized: 'band',         english: 'Closed',               category: 'shopping', difficulty: 1 },
  { id: 'kataar',    hindi: 'कतार',        romanized: 'kataar',       english: 'Queue / Line',         category: 'shopping', difficulty: 2 },
  { id: 'tolna',     hindi: 'तौलना',       romanized: 'taulna',       english: 'To weigh',             category: 'shopping', difficulty: 2 },
  { id: 'badalna',   hindi: 'बदलना',       romanized: 'badalna',      english: 'To exchange',          category: 'shopping', difficulty: 2 },
```

- [ ] **Step 2: Verify count**

```bash
grep -c "category: 'shopping'" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `25`

- [ ] **Step 3: Commit**

```bash
git add js/data/vocabulary.js
git commit -m "feat: add 25 shopping & money vocabulary words"
```

---

## Task 4: Add cooking words (25 words)

**Files:**
- Modify: `js/data/vocabulary.js` (append after shopping block)

- [ ] **Step 1: Append 25 cooking words**

```js
  // Cooking & Kitchen
  { id: 'tel',      hindi: 'तेल',     romanized: 'tel',      english: 'Oil',                  category: 'cooking', difficulty: 1 },
  { id: 'masala',   hindi: 'मसाला',   romanized: 'masaala',  english: 'Spice / Spice mix',    category: 'cooking', difficulty: 1 },
  { id: 'chaaku',   hindi: 'चाकू',    romanized: 'chaaku',   english: 'Knife',                category: 'cooking', difficulty: 1 },
  { id: 'kadhai',   hindi: 'कड़ाही',  romanized: 'kadhaai',  english: 'Wok / Deep pan',       category: 'cooking', difficulty: 2 },
  { id: 'tava',     hindi: 'तवा',     romanized: 'tawa',     english: 'Flat griddle',         category: 'cooking', difficulty: 1 },
  { id: 'ubalna',   hindi: 'उबालना',  romanized: 'ubalna',   english: 'To boil',              category: 'cooking', difficulty: 1 },
  { id: 'talna',    hindi: 'तलना',    romanized: 'talna',    english: 'To fry',               category: 'cooking', difficulty: 1 },
  { id: 'bhoonna',  hindi: 'भूनना',   romanized: 'bhunna',   english: 'To roast / sauté',    category: 'cooking', difficulty: 2 },
  { id: 'pakana',   hindi: 'पकाना',   romanized: 'pakaana',  english: 'To cook',              category: 'cooking', difficulty: 1 },
  { id: 'kaccha',   hindi: 'कच्चा',   romanized: 'kachhaa',  english: 'Raw / Unripe',         category: 'cooking', difficulty: 1 },
  { id: 'pakka',    hindi: 'पक्का',   romanized: 'pakka',    english: 'Cooked through',       category: 'cooking', difficulty: 1 },
  { id: 'meetha',   hindi: 'मीठा',    romanized: 'meetha',   english: 'Sweet',                category: 'cooking', difficulty: 1 },
  { id: 'teekha',   hindi: 'तीखा',    romanized: 'teekha',   english: 'Spicy / Pungent',      category: 'cooking', difficulty: 1 },
  { id: 'khatta',   hindi: 'खट्टा',   romanized: 'khattaa',  english: 'Sour',                 category: 'cooking', difficulty: 1 },
  { id: 'namkeen',  hindi: 'नमकीन',   romanized: 'namkeen',  english: 'Salty / Savory',       category: 'cooking', difficulty: 2 },
  { id: 'pyaaz',    hindi: 'प्याज़',  romanized: 'pyaaz',    english: 'Onion',                category: 'cooking', difficulty: 1 },
  { id: 'lahsun',   hindi: 'लहसुन',   romanized: 'lahsun',   english: 'Garlic',               category: 'cooking', difficulty: 1 },
  { id: 'adrak',    hindi: 'अदरक',    romanized: 'adrak',    english: 'Ginger',               category: 'cooking', difficulty: 1 },
  { id: 'haldi',    hindi: 'हल्दी',   romanized: 'haldi',    english: 'Turmeric',             category: 'cooking', difficulty: 1 },
  { id: 'jeera',    hindi: 'जीरा',    romanized: 'jeera',    english: 'Cumin',                category: 'cooking', difficulty: 2 },
  { id: 'dhania',   hindi: 'धनिया',   romanized: 'dhaniya',  english: 'Coriander',            category: 'cooking', difficulty: 2 },
  { id: 'atta',     hindi: 'आटा',     romanized: 'aata',     english: 'Wheat flour',          category: 'cooking', difficulty: 1 },
  { id: 'ghee',     hindi: 'घी',      romanized: 'ghee',     english: 'Clarified butter',     category: 'cooking', difficulty: 1 },
  { id: 'bartan',   hindi: 'बर्तन',   romanized: 'bartan',   english: 'Utensil / Vessel',     category: 'cooking', difficulty: 2 },
  { id: 'chulha',   hindi: 'चूल्हा',  romanized: 'chulha',   english: 'Stove / Hearth',       category: 'cooking', difficulty: 2 },
```

- [ ] **Step 2: Verify count**

```bash
grep -c "category: 'cooking'" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `25`

- [ ] **Step 3: Commit**

```bash
git add js/data/vocabulary.js
git commit -m "feat: add 25 cooking & kitchen vocabulary words"
```

---

## Task 5: Add classroom words (25 words)

**Files:**
- Modify: `js/data/vocabulary.js` (append after cooking block)

- [ ] **Step 1: Append 25 classroom words**

```js
  // Classroom Phrases
  { id: 'samajhnahin',  hindi: 'समझ नहीं आया', romanized: 'samajh nahin aaya', english: "I don't understand",    category: 'classroom', difficulty: 1 },
  { id: 'dobara',       hindi: 'दोबारा',        romanized: 'dobaara',           english: 'Again / Repeat',        category: 'classroom', difficulty: 1 },
  { id: 'sawaal',       hindi: 'सवाल',          romanized: 'sawaal',            english: 'Question',              category: 'classroom', difficulty: 1 },
  { id: 'jawaab',       hindi: 'जवाब',          romanized: 'jawaab',            english: 'Answer',                category: 'classroom', difficulty: 1 },
  { id: 'shikshak',     hindi: 'शिक्षक',        romanized: 'shikshak',          english: 'Teacher (m)',           category: 'classroom', difficulty: 1 },
  { id: 'adhyaapika',   hindi: 'अध्यापिका',     romanized: 'adhyaapika',        english: 'Teacher (f)',           category: 'classroom', difficulty: 2 },
  { id: 'vidyaarthi',   hindi: 'विद्यार्थी',    romanized: 'vidyaarthi',        english: 'Student',               category: 'classroom', difficulty: 2 },
  { id: 'kaksha',       hindi: 'कक्षा',         romanized: 'kaksha',            english: 'Classroom',             category: 'classroom', difficulty: 2 },
  { id: 'grihkaarya',   hindi: 'गृहकार्य',      romanized: 'grihkaarya',        english: 'Homework',              category: 'classroom', difficulty: 2 },
  { id: 'kitaab',       hindi: 'किताब',         romanized: 'kitaab',            english: 'Book',                  category: 'classroom', difficulty: 1 },
  { id: 'kalam',        hindi: 'कलम',           romanized: 'kalam',             english: 'Pen',                   category: 'classroom', difficulty: 1 },
  { id: 'pencil',       hindi: 'पेंसिल',        romanized: 'pencil',            english: 'Pencil',                category: 'classroom', difficulty: 1 },
  { id: 'shyaampat',    hindi: 'श्यामपट',       romanized: 'shyaampat',         english: 'Blackboard',            category: 'classroom', difficulty: 2 },
  { id: 'pariksha',     hindi: 'परीक्षा',       romanized: 'pareeksha',         english: 'Exam',                  category: 'classroom', difficulty: 2 },
  { id: 'nambar',       hindi: 'नंबर',          romanized: 'nambar',            english: 'Marks / Score',         category: 'classroom', difficulty: 1 },
  { id: 'seekhna',      hindi: 'सीखना',         romanized: 'seekhna',           english: 'To learn',              category: 'classroom', difficulty: 1 },
  { id: 'yaadkarna',    hindi: 'याद करना',      romanized: 'yaad karna',        english: 'To memorize',           category: 'classroom', difficulty: 2 },
  { id: 'dhyan',        hindi: 'ध्यान',         romanized: 'dhyaan',            english: 'Attention',             category: 'classroom', difficulty: 1 },
  { id: 'theekhai',     hindi: 'ठीक है',        romanized: 'theek hai',         english: 'OK / Alright',          category: 'classroom', difficulty: 1 },
  { id: 'shukriya',     hindi: 'शुक्रिया',      romanized: 'shukriya',          english: 'Thank you (informal)',   category: 'classroom', difficulty: 1 },
  { id: 'mujhepatanahi',hindi: 'मुझे पता नहीं', romanized: 'mujhe pata nahin',  english: "I don't know",          category: 'classroom', difficulty: 1 },
  { id: 'bataiye',      hindi: 'बताइए',         romanized: 'bataiye',           english: 'Please tell me',        category: 'classroom', difficulty: 2 },
  { id: 'dheere',       hindi: 'धीरे',          romanized: 'dheere',            english: 'Slowly',                category: 'classroom', difficulty: 1 },
  { id: 'boliye',       hindi: 'बोलिए',         romanized: 'boliye',            english: 'Please say / Speak',    category: 'classroom', difficulty: 2 },
  { id: 'likhiye',      hindi: 'लिखिए',         romanized: 'likhiye',           english: 'Please write',          category: 'classroom', difficulty: 2 },
```

- [ ] **Step 2: Verify all 4 new categories have 25 words each**

```bash
grep -c "category: 'classroom'" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `25`

```bash
grep -c "category: 'festivals'\|category: 'shopping'\|category: 'cooking'\|category: 'classroom'" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `100`

- [ ] **Step 3: Verify total word count is 180**

```bash
grep -c "category:" /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected: `180`

- [ ] **Step 4: Verify the file ends correctly (closing `];` present)**

```bash
tail -3 /media/mukul09/All1/Claude/hindi-learning/js/data/vocabulary.js
```

Expected output — the last 3 lines should be:
```
  { id: 'likhiye', ... },
];
```
(i.e. the last word entry followed by `];` closing the WORDS array — no trailing comma after `];`)

- [ ] **Step 5: Commit**

```bash
git add js/data/vocabulary.js
git commit -m "feat: add 25 classroom phrases vocabulary words (100 total added)"
```
