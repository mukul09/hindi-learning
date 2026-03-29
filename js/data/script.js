const VOWELS = [
  { id: 'a',   devanagari: 'अ', transliteration: 'a',   ipa: 'ə',   example: { word: 'अब',    meaning: 'now',       romanized: 'ab'      } },
  { id: 'aa',  devanagari: 'आ', transliteration: 'aa',  ipa: 'aː',  example: { word: 'आम',    meaning: 'mango',     romanized: 'aam'     } },
  { id: 'i',   devanagari: 'इ', transliteration: 'i',   ipa: 'ɪ',   example: { word: 'इधर',   meaning: 'here',      romanized: 'idhar'   } },
  { id: 'ii',  devanagari: 'ई', transliteration: 'ee',  ipa: 'iː',  example: { word: 'ईख',    meaning: 'sugarcane', romanized: 'eekh'    } },
  { id: 'u',   devanagari: 'उ', transliteration: 'u',   ipa: 'ʊ',   example: { word: 'उल्लू', meaning: 'owl',       romanized: 'ullu'    } },
  { id: 'uu',  devanagari: 'ऊ', transliteration: 'oo',  ipa: 'uː',  example: { word: 'ऊन',    meaning: 'wool',      romanized: 'oon'     } },
  { id: 'e',   devanagari: 'ए', transliteration: 'e',   ipa: 'eː',  example: { word: 'एक',    meaning: 'one',       romanized: 'ek'      } },
  { id: 'ai',  devanagari: 'ऐ', transliteration: 'ai',  ipa: 'ɛː',  example: { word: 'ऐनक',   meaning: 'glasses',   romanized: 'ainak'   } },
  { id: 'o',   devanagari: 'ओ', transliteration: 'o',   ipa: 'oː',  example: { word: 'ओस',    meaning: 'dew',       romanized: 'os'      } },
  { id: 'au',  devanagari: 'औ', transliteration: 'au',  ipa: 'ɔː',  example: { word: 'औरत',   meaning: 'woman',     romanized: 'aurat'   } },
  { id: 'am',  devanagari: 'अं', transliteration: 'an', ipa: 'ə̃',  example: { word: 'अंगूर',  meaning: 'grapes',    romanized: 'angoor'  } },
  { id: 'ah',  devanagari: 'अः', transliteration: 'ah', ipa: 'əh',  example: { word: 'अतः',   meaning: 'therefore', romanized: 'atah'    } }
];

const CONSONANT_ROWS = [
  {
    group: 'Velar (क-वर्ग)',
    consonants: [
      { id: 'ka',  devanagari: 'क', transliteration: 'ka',  ipa: 'k',   example: { word: 'कमल',   meaning: 'lotus',   romanized: 'kamal'   } },
      { id: 'kha', devanagari: 'ख', transliteration: 'kha', ipa: 'kʰ',  example: { word: 'खरगोश', meaning: 'rabbit',  romanized: 'khargosh'} },
      { id: 'ga',  devanagari: 'ग', transliteration: 'ga',  ipa: 'ɡ',   example: { word: 'गाय',   meaning: 'cow',     romanized: 'gaay'    } },
      { id: 'gha', devanagari: 'घ', transliteration: 'gha', ipa: 'ɡʱ',  example: { word: 'घर',    meaning: 'house',   romanized: 'ghar'    } },
      { id: 'nga', devanagari: 'ङ', transliteration: 'nga', ipa: 'ŋ',   example: { word: 'पंख',   meaning: 'wing',    romanized: 'pankh'   } }
    ]
  },
  {
    group: 'Palatal (च-वर्ग)',
    consonants: [
      { id: 'ca',  devanagari: 'च', transliteration: 'cha',  ipa: 'tɕ',  example: { word: 'चाय',  meaning: 'tea',    romanized: 'chaay'   } },
      { id: 'cha', devanagari: 'छ', transliteration: 'chha', ipa: 'tɕʰ', example: { word: 'छत',   meaning: 'roof',   romanized: 'chhat'   } },
      { id: 'ja',  devanagari: 'ज', transliteration: 'ja',   ipa: 'dʑ',  example: { word: 'जल',   meaning: 'water',  romanized: 'jal'     } },
      { id: 'jha', devanagari: 'झ', transliteration: 'jha',  ipa: 'dʑʱ', example: { word: 'झंडा', meaning: 'flag',   romanized: 'jhanda'  } },
      { id: 'nya', devanagari: 'ञ', transliteration: 'nya',  ipa: 'ɲ',   example: { word: 'ज्ञान', meaning: 'knowledge', romanized: 'gyaan' } }
    ]
  },
  {
    group: 'Retroflex (ट-वर्ग)',
    consonants: [
      { id: 'ta2',  devanagari: 'ट', transliteration: 'ta',  ipa: 'ʈ',  example: { word: 'टमाटर', meaning: 'tomato', romanized: 'tamaatar'} },
      { id: 'tha2', devanagari: 'ठ', transliteration: 'tha', ipa: 'ʈʰ', example: { word: 'ठंड',   meaning: 'cold',   romanized: 'thand'   } },
      { id: 'da2',  devanagari: 'ड', transliteration: 'da',  ipa: 'ɖ',  example: { word: 'डाक',   meaning: 'mail',   romanized: 'daak'    } },
      { id: 'dha2', devanagari: 'ढ', transliteration: 'dha', ipa: 'ɖʱ', example: { word: 'ढोल',   meaning: 'drum',   romanized: 'dhol'    } },
      { id: 'na2',  devanagari: 'ण', transliteration: 'na',  ipa: 'ɳ',  example: { word: 'बाण',   meaning: 'arrow',  romanized: 'baan'    } }
    ]
  },
  {
    group: 'Dental (त-वर्ग)',
    consonants: [
      { id: 'ta',  devanagari: 'त', transliteration: 'ta',  ipa: 't̪',  example: { word: 'तारा',  meaning: 'star',   romanized: 'taara'   } },
      { id: 'tha', devanagari: 'थ', transliteration: 'tha', ipa: 't̪ʰ', example: { word: 'थाली',  meaning: 'plate',  romanized: 'thaali'  } },
      { id: 'da',  devanagari: 'द', transliteration: 'da',  ipa: 'd̪',  example: { word: 'दिल',   meaning: 'heart',  romanized: 'dil'     } },
      { id: 'dha', devanagari: 'ध', transliteration: 'dha', ipa: 'd̪ʱ', example: { word: 'धन',    meaning: 'wealth', romanized: 'dhan'    } },
      { id: 'na',  devanagari: 'न', transliteration: 'na',  ipa: 'n',   example: { word: 'नल',    meaning: 'tap',    romanized: 'nal'     } }
    ]
  },
  {
    group: 'Labial (प-वर्ग)',
    consonants: [
      { id: 'pa',  devanagari: 'प', transliteration: 'pa',  ipa: 'p',  example: { word: 'पानी',  meaning: 'water',  romanized: 'paani'   } },
      { id: 'pha', devanagari: 'फ', transliteration: 'pha', ipa: 'pʰ', example: { word: 'फूल',   meaning: 'flower', romanized: 'phool'   } },
      { id: 'ba',  devanagari: 'ब', transliteration: 'ba',  ipa: 'b',  example: { word: 'बाल',   meaning: 'hair',   romanized: 'baal'    } },
      { id: 'bha', devanagari: 'भ', transliteration: 'bha', ipa: 'bʱ', example: { word: 'भारत',  meaning: 'India',  romanized: 'Bhaarat' } },
      { id: 'ma',  devanagari: 'म', transliteration: 'ma',  ipa: 'm',  example: { word: 'माँ',   meaning: 'mother', romanized: 'maa'     } }
    ]
  },
  {
    group: 'Semivowels & Sibilants',
    consonants: [
      { id: 'ya',  devanagari: 'य', transliteration: 'ya',  ipa: 'j',  example: { word: 'यात्रा', meaning: 'journey', romanized: 'yaatraa'} },
      { id: 'ra',  devanagari: 'र', transliteration: 'ra',  ipa: 'r',  example: { word: 'रात',    meaning: 'night',   romanized: 'raat'   } },
      { id: 'la',  devanagari: 'ल', transliteration: 'la',  ipa: 'l',  example: { word: 'लाल',    meaning: 'red',     romanized: 'laal'   } },
      { id: 'va',  devanagari: 'व', transliteration: 'va',  ipa: 'ʋ',  example: { word: 'वन',     meaning: 'forest',  romanized: 'van'    } },
      { id: 'sha', devanagari: 'श', transliteration: 'sha', ipa: 'ɕ',  example: { word: 'शेर',    meaning: 'lion',    romanized: 'sher'   } },
      { id: 'sa',  devanagari: 'स', transliteration: 'sa',  ipa: 's',  example: { word: 'सेब',    meaning: 'apple',   romanized: 'seb'    } },
      { id: 'ha',  devanagari: 'ह', transliteration: 'ha',  ipa: 'ɦ',  example: { word: 'हाथी',   meaning: 'elephant',romanized: 'haathi' } }
    ]
  }
];

const MATRAS = [
  { id: 'aa_m',  symbol: 'ा',  appliedTo: 'क', result: 'का', transliteration: 'kaa', example: { word: 'काम',   meaning: 'work',   romanized: 'kaam'   } },
  { id: 'i_m',   symbol: 'ि', appliedTo: 'क', result: 'कि', transliteration: 'ki',  example: { word: 'किला',  meaning: 'fort',   romanized: 'kila'   } },
  { id: 'ii_m',  symbol: 'ी',  appliedTo: 'क', result: 'की', transliteration: 'kee', example: { word: 'की',    meaning: 'of',     romanized: 'kee'    } },
  { id: 'u_m',   symbol: 'ु',  appliedTo: 'क', result: 'कु', transliteration: 'ku',  example: { word: 'कुत्ता', meaning: 'dog',   romanized: 'kutta'  } },
  { id: 'uu_m',  symbol: 'ू',  appliedTo: 'क', result: 'कू', transliteration: 'koo', example: { word: 'कूड़ा', meaning: 'trash',  romanized: 'kooda'  } },
  { id: 'e_m',   symbol: 'े',  appliedTo: 'क', result: 'के', transliteration: 'ke',  example: { word: 'केला',  meaning: 'banana', romanized: 'kela'   } },
  { id: 'ai_m',  symbol: 'ै',  appliedTo: 'क', result: 'कै', transliteration: 'kai', example: { word: 'कैसे',  meaning: 'how',    romanized: 'kaise'  } },
  { id: 'o_m',   symbol: 'ो',  appliedTo: 'क', result: 'को', transliteration: 'ko',  example: { word: 'को',    meaning: 'to',     romanized: 'ko'     } },
  { id: 'au_m',  symbol: 'ौ',  appliedTo: 'क', result: 'कौ', transliteration: 'kau', example: { word: 'कौन',   meaning: 'who',    romanized: 'kaun'   } },
  { id: 'ri_m',  symbol: 'ृ',  appliedTo: 'क', result: 'कृ', transliteration: 'kri', example: { word: 'कृषि',  meaning: 'farming',romanized: 'krishi' } }
];
