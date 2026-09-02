(function (global) {
  "use strict";

  const keyOf = ([row, col]) => `${row},${col}`;
  const sameCell = (a, b) => Boolean(a && b && a[0] === b[0] && a[1] === b[1]);
  const adjacent = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

  class CutFillEngine {
    constructor(question) {
      this.question = question;
      this.wallKeys = new Set(question.walls.map(keyOf));
      this.pairByDirt = new Map(question.pairs.map((pair) => [keyOf(pair.dirt), pair]));
      this.pairByPit = new Map(question.pairs.map((pair) => [keyOf(pair.pit), pair]));
      this.reset();
    }

    reset() {
      this.car = [...this.question.car];
      this.filled = new Set();
      this.cancelGesture();
    }

    cancelGesture() {
      this.route = [];
      this.drawing = false;
      this.activePairId = null;
      this.lockedAtPit = false;
    }

    begin(cell) {
      if (!sameCell(cell, this.car)) return { accepted: false, reason: "start_not_car" };
      this.route = [[...cell]];
      this.drawing = true;
      this.activePairId = null;
      this.lockedAtPit = false;
      return { accepted: true, action: "start" };
    }

    enter(cell) {
      if (!this.drawing || !this.route.length) return { accepted: false, reason: "not_drawing" };
      const current = this.route[this.route.length - 1];
      if (sameCell(cell, current)) return { accepted: true, action: "stay" };
      if (!this.inside(cell) || !adjacent(current, cell)) return { accepted: false, reason: "not_adjacent" };

      const previous = this.route[this.route.length - 2];
      if (previous && sameCell(cell, previous)) {
        const removed = this.route.pop();
        const removedPair = this.pairByDirt.get(keyOf(removed));
        if (this.lockedAtPit) this.lockedAtPit = false;
        else if (removedPair && removedPair.id === this.activePairId) this.activePairId = null;
        return { accepted: true, action: "backtrack" };
      }

      if (this.lockedAtPit) return { accepted: false, reason: "endpoint_locked" };
      if (this.route.some((visited) => sameCell(visited, cell))) {
        return { accepted: false, reason: "self_intersection" };
      }
      if (this.wallKeys.has(keyOf(cell))) return { accepted: false, reason: "wall" };

      const pitPair = this.pairByPit.get(keyOf(cell));
      if (pitPair && !this.filled.has(pitPair.id)) {
        if (!this.activePairId || pitPair.id !== this.activePairId) {
          return { accepted: false, reason: "unfilled_pit" };
        }
        const dirt = pitPair.dirt;
        const entry = this.route[this.route.length - 2];
        if (!sameCell(current, dirt) || !entry) {
          return { accepted: false, reason: "pit_without_push" };
        }
        const intoDirt = [dirt[0] - entry[0], dirt[1] - entry[1]];
        const intoPit = [cell[0] - dirt[0], cell[1] - dirt[1]];
        if (intoDirt[0] !== intoPit[0] || intoDirt[1] !== intoPit[1]) {
          return { accepted: false, reason: "push_not_straight" };
        }
        this.route.push([...cell]);
        this.lockedAtPit = true;
        return { accepted: true, action: "lock_pit", pairId: pitPair.id };
      }

      const dirtPair = this.pairByDirt.get(keyOf(cell));
      if (dirtPair && !this.filled.has(dirtPair.id)) {
        if (this.activePairId) return { accepted: false, reason: "second_dirt" };
        this.route.push([...cell]);
        this.activePairId = dirtPair.id;
        return { accepted: true, action: "enter_dirt", pairId: dirtPair.id };
      }

      if (this.activePairId) return { accepted: false, reason: "must_push_to_pit" };
      this.route.push([...cell]);
      return { accepted: true, action: "extend" };
    }

    canCommit() {
      if (!this.drawing || !this.lockedAtPit || !this.activePairId) return false;
      const pair = this.question.pairs.find((item) => item.id === this.activePairId);
      return Boolean(pair && sameCell(this.route[this.route.length - 1], pair.pit));
    }

    commit() {
      if (!this.canCommit()) return { accepted: false, reason: "route_incomplete" };
      const pair = this.question.pairs.find((item) => item.id === this.activePairId);
      const route = this.route.map((cell) => [...cell]);
      this.filled.add(pair.id);
      this.car = [...pair.dirt];
      this.cancelGesture();
      return {
        accepted: true,
        pairId: pair.id,
        route,
        car: [...this.car],
        complete: this.isComplete()
      };
    }

    isComplete() {
      return this.filled.size === this.question.pairs.length;
    }

    inside([row, col]) {
      return row >= 0 && col >= 0 && row < this.question.size && col < this.question.size;
    }

    snapshot() {
      return {
        id: this.question.id,
        car: [...this.car],
        filled: [...this.filled],
        route: this.route.map((cell) => [...cell]),
        drawing: this.drawing,
        activePairId: this.activePairId,
        lockedAtPit: this.lockedAtPit,
        canCommit: this.canCommit(),
        complete: this.isComplete()
      };
    }
  }

  global.CutFillEngine = CutFillEngine;
})(window);
