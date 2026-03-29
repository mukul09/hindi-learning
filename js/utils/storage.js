const Storage = {
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem('hindi_' + key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem('hindi_' + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage.set failed:', e);
    }
  },

  remove(key) {
    localStorage.removeItem('hindi_' + key);
  },

  clear() {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('hindi_')) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  }
};
