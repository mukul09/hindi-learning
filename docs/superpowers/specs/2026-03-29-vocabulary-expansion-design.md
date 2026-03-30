# Vocabulary Expansion Design Spec
**Date:** 2026-03-29
**Project:** Hindi Learning Website

## Overview

Add 100 new Hindi vocabulary words across 4 new categories to `js/data/vocabulary.js`. No other files change — the vocabulary module auto-renders any category present in `VOCAB_CATEGORIES`.

---

## Categories

| Key | Display | Count | Focus |
|-----|---------|-------|-------|
| `festivals` | Festivals & Religion | 25 | Diwali, Holi, religious vocabulary, rituals |
| `shopping` | Shopping & Money | 25 | Prices, market, buying/selling, currency |
| `cooking` | Cooking & Kitchen | 25 | Ingredients, tools, cooking verbs, methods |
| `classroom` | Classroom Phrases | 25 | Learning phrases, teacher/student, school objects |

---

## Word Format

Each word object follows the existing pattern exactly:

```js
{ id: 'unique_id', hindi: 'हिंदी', romanized: 'romanized', english: 'English', category: 'festivals', difficulty: 1 }
```

- `id` — lowercase, no spaces, unique across all 180 words
- `difficulty` — 1 for common/easy, 2 for harder words
- No `audio` file is needed — TTS is used for all vocabulary

---

## Word Lists

### festivals (25 words)

| id | hindi | romanized | english | difficulty |
|----|-------|-----------|---------|-----------|
| diwali | दिवाली | diwaali | Diwali | 1 |
| holi | होली | holi | Holi | 1 |
| eid | ईद | eid | Eid | 1 |
| dussehra | दशहरा | dussehra | Dussehra | 2 |
| navratri | नवरात्रि | navraatri | Navratri | 2 |
| mandir | मंदिर | mandir | Temple | 1 |
| masjid | मस्जिद | masjid | Mosque | 1 |
| puja | पूजा | puja | Worship / Prayer | 1 |
| prasad | प्रसाद | prasaad | Sacred food offering | 2 |
| diya | दीया | diya | Oil lamp | 1 |
| patakha | पटाखा | pataakha | Firecracker | 2 |
| rangoli | रंगोली | rangoli | Rangoli | 2 |
| gulal | गुलाल | gulaal | Colored powder (Holi) | 2 |
| upvaas | उपवास | upvaas | Fast / Fasting | 2 |
| vardaan | वरदान | vardaan | Blessing | 2 |
| bhagwan | भगवान | bhagwaan | God | 1 |
| thaali | थाली | thaali | Ritual plate | 1 |
| aarti | आरती | aarti | Devotional ritual | 2 |
| tyohaar | त्योहार | tyohaar | Festival | 1 |
| mela | मेला | mela | Fair / Festival | 1 |
| mithaibox | मिठाई का डब्बा | mithaai ka dabba | Box of sweets | 2 |
| uphar | उपहार | uphaar | Gift | 1 |
| khushi | खुशी | khushi | Happiness / Joy | 1 |
| shubhkaamna | शुभकामना | shubhkaamna | Best wishes | 2 |
| parv | पर्व | parv | Occasion / Festival | 2 |

### shopping (25 words)

| id | hindi | romanized | english | difficulty |
|----|-------|-----------|---------|-----------|
| rupaya | रुपया | rupaya | Rupee | 1 |
| daam | दाम | daam | Price | 1 |
| sasta | सस्ता | sasta | Cheap | 1 |
| mahanga | महँगा | mahangaa | Expensive | 1 |
| bazaar | बाज़ार | baazaar | Market | 1 |
| dukaan | दुकान | dukaan | Shop / Store | 1 |
| kharidna | खरीदना | kharidna | To buy | 1 |
| bechna | बेचना | bechna | To sell | 1 |
| paisa | पैसा | paisa | Money / Coins | 1 |
| bill | बिल | bil | Bill / Receipt | 1 |
| chhoot | छूट | chhoot | Discount | 2 |
| maal | माल | maal | Goods / Products | 2 |
| tol | तोल | tol | Weight / to weigh | 2 |
| nap | नाप | naap | Size / Measurement | 2 |
| rangpasand | रंग पसंद है | rang pasand hai | I like the color | 2 |
| kitna | कितना | kitna | How much | 1 |
| zyada | ज़्यादा | zyaada | Too much / More | 1 |
| thoda | थोड़ा | thoda | A little / Less | 1 |
| lenahai | लेना है | lena hai | I want to take/buy | 1 |
| wapas | वापस | waapas | Return / Back | 1 |
| khula | खुला | khula | Open (store) | 1 |
| band | बंद | band | Closed | 1 |
| queue | कतार | kataar | Queue / Line | 2 |
| tolna | तौलना | taulna | To weigh | 2 |
| exchange | बदलना | badalna | To exchange / change | 2 |

### cooking (25 words)

| id | hindi | romanized | english | difficulty |
|----|-------|-----------|---------|-----------|
| tel | तेल | tel | Oil | 1 |
| masala | मसाला | masaala | Spice / Spice mix | 1 |
| chaaqu | चाकू | chaaku | Knife | 1 |
| kadhai | कड़ाही | kadhaai | Wok / Deep pan | 2 |
| tava | तवा | tawa | Flat griddle | 1 |
| ubalna | उबालना | ubalna | To boil | 1 |
| talna | तलना | talna | To fry | 1 |
| bhoonna | भूनना | bhunna | To roast / sauté | 2 |
| pakana | पकाना | pakaana | To cook | 1 |
| kaccha | कच्चा | kachhaa | Raw / Unripe | 1 |
| pakka | पक्का | pakka | Ripe / Cooked through | 1 |
| meetha | मीठा | meetha | Sweet | 1 |
| teekha | तीखा | teekha | Spicy / Pungent | 1 |
| khatta | खट्टा | khattaa | Sour | 1 |
| namkeen | नमकीन | namkeen | Salty / Savory | 2 |
| pyaaz | प्याज़ | pyaaz | Onion | 1 |
| lahsun | लहसुन | lahsun | Garlic | 1 |
| adrak | अदरक | adrak | Ginger | 1 |
| haldi | हल्दी | haldi | Turmeric | 1 |
| jeera | जीरा | jeera | Cumin | 2 |
| dhania | धनिया | dhaniya | Coriander | 2 |
| atta | आटा | aata | Wheat flour | 1 |
| ghee | घी | ghee | Clarified butter | 1 |
| bartan | बर्तन | bartan | Utensil / Vessel | 2 |
| chulha | चूल्हा | chulha | Stove / Hearth | 2 |

### classroom (25 words)

| id | hindi | romanized | english | difficulty |
|----|-------|-----------|---------|-----------|
| samajhnahin | समझ नहीं आया | samajh nahin aaya | I don't understand | 1 |
| dobara | दोबारा | dobaara | Again / Repeat | 1 |
| sawaal | सवाल | sawaal | Question | 1 |
| jawaab | जवाब | jawaab | Answer | 1 |
| shikshak | शिक्षक | shikshak | Teacher (m) | 1 |
| adhyaapika | अध्यापिका | adhyaapika | Teacher (f) | 2 |
| vidyaarthi | विद्यार्थी | vidyaarthi | Student | 2 |
| kaksha | कक्षा | kaksha | Classroom | 2 |
| grihkaarya | गृहकार्य | grihkaaryam | Homework | 2 |
| kitaab | किताब | kitaab | Book | 1 |
| kalam | कलम | kalam | Pen | 1 |
| pencil | पेंसिल | pencil | Pencil | 1 |
| blackboard | श्यामपट | shyaampat | Blackboard | 2 |
| pariksha | परीक्षा | pareeksha | Exam | 2 |
| nambr | नंबर | number | Marks / Score | 1 |
| seekhna | सीखना | seekhna | To learn | 1 |
| yaadkarna | याद करना | yaad karna | To memorize | 2 |
| dhyan | ध्यान | dhyaan | Attention | 1 |
| theek_hai | ठीक है | theek hai | OK / Alright | 1 |
| shukriya | शुक्रिया | shukriya | Thank you (informal) | 1 |
| mujhepatanahi | मुझे पता नहीं | mujhe pata nahin | I don't know | 1 |
| bataiye | बताइए | bataiye | Please tell me | 2 |
| dhire | धीरे | dheere | Slowly | 1 |
| boliye | बोलिए | boliye | Please say / Speak | 2 |
| likhiye | लिखिए | likhiye | Please write | 2 |

---

## Changes to vocabulary.js

1. **`VOCAB_CATEGORIES` array** — add 4 strings: `'festivals'`, `'shopping'`, `'cooking'`, `'classroom'`
2. **`WORDS` array** — append 100 new word objects after the existing 80

---

## What Does NOT Change

- No new files created
- No changes to any JS module, CSS, or HTML
- Audio files are not needed (all vocab uses browser TTS)
