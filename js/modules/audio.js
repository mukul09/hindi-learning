const _HTMLAudio = window.Audio;

const Audio = {
  supported: true,
  _current: null,
  PROXY: 'http://localhost:8765/tts',

  init() {
    this.supported = true;
  },

  speak(text, options = {}) {
    const btn  = options.btn  || null;
    const slow = options.slow || false;
    const file = options.file || null;

    if (this._current) {
      this._current.pause();
      this._current = null;
    }

    if (btn) btn.textContent = '⏳';
    const reset = () => { if (btn) btn.textContent = '🔊'; };

    // Priority 1: pre-generated local file
    // Priority 2: live proxy → Google neural TTS
    // Priority 3: espeak-ng via Web Speech API
    const src = file
      ? file
      : this.PROXY + '?q=' + encodeURIComponent(text) + '&slow=' + (slow ? '1' : '0');

    const audio = new _HTMLAudio(src);
    if (slow && file) audio.playbackRate = 0.65;
    this._current = audio;

    audio.addEventListener('playing', () => { if (btn) btn.textContent = '🔈'; });
    audio.addEventListener('ended',   reset);
    audio.addEventListener('error',   () => { reset(); this._espeak(text, slow); });

    audio.play().catch(() => { reset(); this._espeak(text, slow); });
  },

  speakSlow(text, options = {}) {
    this.speak(text, { ...options, slow: true });
  },

  _espeak(text, slow) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voices  = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang === 'hi-IN')
                 || voices.find(v => v.lang.startsWith('hi'))
                 || null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang  = 'hi-IN';
    u.rate  = slow ? 0.6 : 0.85;
    if (hiVoice) u.voice = hiVoice;
    window.speechSynthesis.speak(u);
  }
};
