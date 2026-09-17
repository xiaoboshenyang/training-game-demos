// Single background track; shared result sounds remain owned by the template.
export function createMusic() {
  const audio = document.createElement('audio');
  audio.id = 'shop-bgm';
  audio.src = './assets/bgm.mp3';
  audio.preload = 'auto';
  audio.volume = 0.22;
  document.body.append(audio);
  let active = false, pending = false, destroyed = false;
  function play() {
    if (!active || destroyed || pending || !audio.paused) return;
    pending = true;
    audio.play().catch(() => {}).finally(() => {
      pending = false;
      if (!active || destroyed) audio.pause();
    });
  }
  function unlock() { play(); }
  document.addEventListener('pointerup', unlock);
  document.addEventListener('keydown', unlock);
  return {
    reset() { audio.pause(); audio.currentTime = 0; },
    state(state) {
      const next = ['game', 'feedback', 'levelup'].includes(state);
      if (next === active) return;
      active = next;
      if (active) play(); else audio.pause();
    },
    destroy() {
      destroyed = true; active = false; audio.pause();
      document.removeEventListener('pointerup', unlock);
      document.removeEventListener('keydown', unlock);
      audio.remove();
    }
  };
}
