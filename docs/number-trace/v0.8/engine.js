(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NumberMemory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const COUNTS = [4, 5, 6, 7, 8, 10], POINTS = [20, 30, 40, 50, 60, 80];
  const SHAPES = [[3,3],[3,3],[4,4],[4,4],[4,5],[4,5]];
  const DEFAULTS = { mode: 'auto', reminderPercent: 100, upgradePercent: 100 };
  function random(seed) {
    let state = seed >>> 0;
    return function () { state += 0x6D2B79F5; let t = state;
      t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function generate(level, seed, previous) {
    const rng = random(seed), count = COUNTS[level - 1];
    const [rows, cols] = SHAPES[level - 1], size = rows * cols;
    let positions, board;
    do {
      positions = Array.from({ length: size }, (_, i) => i);
      for (let i = size - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [positions[i], positions[j]] = [positions[j], positions[i]]; }
      positions = positions.slice(0, count); board = Array(size).fill(0);
      positions.forEach((pos, i) => { board[pos] = i + 1; });
    } while (previous && board.every((n, i) => n === previous[i]));
    return { seed: seed >>> 0, level, count, rows, cols, positions, board };
  }
  class Game {
    constructor(seed = Date.now()) { this.seed = seed >>> 0; this.settings = { ...DEFAULTS }; this.reset(); }
    reset() {
      this.phase = 'intro'; this.level = 1; this.score = 0; this.remaining = 120000;
      this.successRun = 0; this.errorRun = 0; this.round = null; this.previousBoard = null;
      this.tutorial = false; this.paused = false; this.idle = 0; this.reminded = false;
      this.feedbackRemaining = 0; this.countdownRemaining = 3000; this.nextLevel = null;
      this.stats = { correct: 0, errors: 0, completed: 0, assisted: 0, interrupted: 0, highest: 1, levelScores: [0,0,0,0,0,0], levelClears: [0,0,0,0,0,0], levelErrors: [0,0,0,0,0,0] };
    }
    configure(settings) {
      this.settings = { ...this.settings, ...settings };
      this.settings.reminderPercent = Math.max(50, Math.min(200, Number(this.settings.reminderPercent)));
      this.settings.upgradePercent = Math.max(50, Math.min(200, Number(this.settings.upgradePercent)));
    }
    get reminderMs() { return 10000 * this.settings.reminderPercent / 100; }
    get upgradeThreshold() { return Math.max(1, Math.round(2 * this.settings.upgradePercent / 100)); }
    start() { if (this.phase !== 'intro') return; this.phase = 'countdown'; this.countdownRemaining = 3000; }
    makeRound(tutorial = false) {
      if (!tutorial) {
        const desired = this.settings.mode === 'auto' ? (this.nextLevel || this.level) : Number(this.settings.mode);
        if (desired !== this.level) this.successRun = this.errorRun = 0;
        this.level = desired; this.nextLevel = null; this.stats.highest = Math.max(this.stats.highest, this.level);
      }
      let generated;
      if (tutorial) {
        const board = [2,0,1,0,4,0,0,0,3];
        generated = { seed: null, level: 1, count: 4, rows:3, cols:3, board, positions: [2,0,8,4] };
      } else { generated = generate(this.level, ++this.seed, this.previousBoard); this.previousBoard = generated.board; }
      this.round = { ...generated, next: 1, assisted: false, attempted: false, wrong: -1, award: 0 };
      this.phase = 'observe'; this.idle = 0; this.reminded = false;
    }
    hide() { if (this.paused || !['observe','help'].includes(this.phase)) return;
      this.round.attempted = true; this.phase = 'answer'; this.idle = 0; this.reminded = false; }
    help() {
      if (this.paused || this.phase !== 'answer') return;
      this.round.assisted = true; this.phase = 'help'; this.idle = 0;
      if (!this.tutorial) this.successRun = 0;
    }
    click(index) {
      if (this.paused || this.phase !== 'answer') return 'ignored';
      const value = this.round.board[index];
      if (!Number.isInteger(index) || index < 0 || index >= this.round.board.length || (value > 0 && value < this.round.next)) return 'ignored';
      if (value !== this.round.next) {
        this.round.wrong = index;
        if (!this.tutorial) { this.stats.errors++; this.settle(false); }
        this.phase = 'failure'; return 'wrong';
      }
      this.round.next++; this.idle = 0; this.reminded = false;
      if (!this.tutorial) this.stats.correct++;
      if (this.round.next > this.round.count) {
        if (!this.tutorial) this.settle(true);
        this.phase = 'success'; this.feedbackRemaining = 1100; return 'complete';
      }
      return 'correct';
    }
    settle(success) {
      const r = this.round; let next = this.level;
      if (success) this.stats.levelClears[r.level - 1]++;
      else this.stats.levelErrors[r.level - 1]++;
      if (success) {
        r.award = POINTS[r.level - 1] * (r.assisted ? 0.5 : 1);
        this.score += r.award; this.stats.levelScores[r.level - 1] += r.award;
        this.stats.completed++; if (r.assisted) this.stats.assisted++;
      }
      if (r.assisted) { next--; this.successRun = this.errorRun = 0; }
      else if (success) { this.errorRun = 0; if (++this.successRun >= this.upgradeThreshold) { next++; this.successRun = 0; } }
      else { this.successRun = 0; if (++this.errorRun >= 2) { next--; this.errorRun = 0; } }
      next = Math.max(1, Math.min(6, next));
      if (this.settings.mode !== 'auto') next = Number(this.settings.mode);
      if (next !== this.level) this.successRun = this.errorRun = 0;
      this.nextLevel = next;
    }
    continue() {
      if (this.paused || this.phase !== 'failure') return;
      this.makeRound(this.tutorial);
    }
    togglePause() { if (['intro','results'].includes(this.phase)) return; this.paused = !this.paused; }
    end() {
      if (['observe','answer','help'].includes(this.phase) && this.round?.attempted) this.stats.interrupted++;
      this.phase = 'results'; this.paused = false; this.remaining = 0;
    }
    tick(ms) {
      if (this.paused || ['intro','results'].includes(this.phase)) return;
      if (this.phase === 'countdown') {
        this.countdownRemaining -= ms;
        if (this.countdownRemaining <= 0) { this.tutorial = true; this.makeRound(true); }
        return;
      }
      if (!this.tutorial) {
        this.remaining = Math.max(0, this.remaining - ms);
        if (!this.remaining) { this.end(); return; }
      }
      if (this.phase === 'answer') {
        this.idle += ms;
        if (this.idle >= this.reminderMs) this.reminded = true;
      }
      if (this.phase === 'success' && !this.externalFeedback) {
        this.feedbackRemaining -= ms;
        if (this.feedbackRemaining <= 0) {
          if (this.tutorial) { this.tutorial = false; this.makeRound(); }
          else this.makeRound();
        }
      }
    }
  }
  return { Game, generate, COUNTS, POINTS, SHAPES, DEFAULTS };
});
