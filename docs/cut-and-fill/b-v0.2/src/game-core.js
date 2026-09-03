(function (global) {
  "use strict";

  const keyOf = ([row, col]) => `${row},${col}`;
  const copyCell = (cell) => [cell[0], cell[1]];
  const sameCell = (a, b) => Boolean(a && b && a[0] === b[0] && a[1] === b[1]);
  const adjacent = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
  const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  function rotate180(cell, rows, cols) {
    return [rows - 1 - cell[0], cols - 1 - cell[1]];
  }

  function sampleWithoutReplacement(items, count, random) {
    const pool = items.map(copyCell);
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  function optionalWallCount(range, densityPercent, random) {
    const min = range.min;
    const max = range.max;
    const span = max - min;
    if (span <= 0) return min;
    const uniform = () => min + Math.floor(random() * (span + 1));
    if (densityPercent === 100) return uniform();
    if (densityPercent <= 50) return min;
    if (densityPercent >= 150) return max;
    if (densityPercent < 100) return random() < (densityPercent - 50) / 50 ? uniform() : min;
    return random() < (densityPercent - 100) / 50 ? max : uniform();
  }

  function makeQuestion(mother, options = {}) {
    const random = options.random || Math.random;
    const densityPercent = Number(options.densityPercent || 100);
    const rotation = options.rotation === undefined ? (random() < 0.5 ? 0 : 180) : options.rotation;
    const transform = rotation === 180
      ? (cell) => rotate180(cell, mother.rows, mother.cols)
      : copyCell;
    const extraCount = optionalWallCount(mother.optionalWallCount, densityPercent, random);
    const extraWalls = sampleWithoutReplacement(mother.optionalWallPool, extraCount, random);
    return {
      id: mother.templateId,
      difficulty: mother.difficulty,
      rows: mother.rows,
      cols: mother.cols,
      rotation,
      optionalWallCount: extraCount,
      car: transform(mother.car),
      soils: mother.soils.map((item) => ({ id: item.id, at: transform(item.at) })),
      pits: mother.pits.map((item) => ({ id: item.id, at: transform(item.at) })),
      walls: [...mother.coreWalls, ...extraWalls].map(transform),
      meta: mother.declaredMeta
    };
  }

  class CutFillBEngine {
    constructor(question) {
      this.question = question;
      this.wallKeys = new Set(question.walls.map(keyOf));
      this.reset();
    }

    reset() {
      this.car = copyCell(this.question.car);
      this.soils = new Map(this.question.soils.map((item) => [item.id, copyCell(item.at)]));
      this.pits = new Map(this.question.pits.map((item) => [item.id, copyCell(item.at)]));
      this.filledPits = [];
      this.cancelGesture();
    }

    cancelGesture() {
      this.route = [];
      this.drawing = false;
      this.selectedSoilId = null;
      this.targetPitId = null;
    }

    begin(cell) {
      if (!sameCell(cell, this.car)) return { accepted: false, reason: "start_not_car" };
      this.route = [copyCell(cell)];
      this.drawing = true;
      this.selectedSoilId = null;
      this.targetPitId = null;
      return { accepted: true, action: "start" };
    }

    objectAt(map, cell) {
      for (const [id, at] of map.entries()) if (sameCell(at, cell)) return id;
      return null;
    }

    recomputeGesture() {
      this.selectedSoilId = null;
      this.targetPitId = null;
      for (const cell of this.route) {
        const soilId = this.objectAt(this.soils, cell);
        if (soilId && !this.selectedSoilId) this.selectedSoilId = soilId;
      }
      const last = this.route[this.route.length - 1];
      const pitId = last ? this.objectAt(this.pits, last) : null;
      if (pitId && this.selectedSoilId) this.targetPitId = pitId;
    }

    enter(cell) {
      if (!this.drawing || !this.route.length) return { accepted: false, reason: "not_drawing" };
      const current = this.route[this.route.length - 1];
      if (sameCell(cell, current)) return { accepted: true, action: "stay" };
      if (!this.inside(cell) || !adjacent(current, cell)) return { accepted: false, reason: "not_adjacent" };
      const previous = this.route[this.route.length - 2];
      if (previous && sameCell(cell, previous)) {
        this.route.pop();
        this.recomputeGesture();
        return { accepted: true, action: "backtrack" };
      }
      if (this.targetPitId) return { accepted: false, reason: "endpoint_locked" };
      if (this.route.some((visited) => sameCell(visited, cell))) return { accepted: false, reason: "self_intersection" };
      if (this.wallKeys.has(keyOf(cell))) return { accepted: false, reason: "wall" };

      const soilId = this.objectAt(this.soils, cell);
      if (soilId) {
        if (this.selectedSoilId) return { accepted: false, reason: "second_soil" };
        this.route.push(copyCell(cell));
        this.selectedSoilId = soilId;
        return { accepted: true, action: "enter_soil", soilId };
      }

      const pitId = this.objectAt(this.pits, cell);
      if (pitId) {
        if (!this.selectedSoilId) return { accepted: false, reason: "pit_before_soil" };
        this.route.push(copyCell(cell));
        this.targetPitId = pitId;
        return { accepted: true, action: "lock_pit", pitId };
      }

      this.route.push(copyCell(cell));
      return { accepted: true, action: "extend" };
    }

    canCommit() {
      return Boolean(this.drawing && this.selectedSoilId && this.targetPitId && this.route.length >= 3);
    }

    commit() {
      if (!this.canCommit()) return { accepted: false, reason: "route_incomplete" };
      const soilId = this.selectedSoilId;
      const pitId = this.targetPitId;
      const route = this.route.map(copyCell);
      const soilIndex = route.findIndex((cell) => sameCell(cell, this.soils.get(soilId)));
      const pit = copyCell(this.pits.get(pitId));
      this.car = copyCell(route[route.length - 2]);
      this.soils.delete(soilId);
      this.pits.delete(pitId);
      this.filledPits.push(pit);
      this.cancelGesture();
      return {
        accepted: true,
        soilId,
        pitId,
        soilIndex,
        route,
        car: copyCell(this.car),
        complete: this.isComplete()
      };
    }

    isComplete() {
      return this.soils.size === 0 && this.pits.size === 0;
    }

    inside([row, col]) {
      return row >= 0 && col >= 0 && row < this.question.rows && col < this.question.cols;
    }

    snapshot() {
      return {
        id: this.question.id,
        rows: this.question.rows,
        cols: this.question.cols,
        car: copyCell(this.car),
        soils: [...this.soils].map(([id, at]) => ({ id, at: copyCell(at) })),
        pits: [...this.pits].map(([id, at]) => ({ id, at: copyCell(at) })),
        walls: this.question.walls.map(copyCell),
        filledPits: this.filledPits.map(copyCell),
        route: this.route.map(copyCell),
        drawing: this.drawing,
        selectedSoilId: this.selectedSoilId,
        targetPitId: this.targetPitId,
        canCommit: this.canCommit(),
        complete: this.isComplete()
      };
    }
  }

  function shortestPath(start, goal, blocked, rows, cols) {
    const queue = [copyCell(start)];
    const parents = new Map([[keyOf(start), null]]);
    for (let head = 0; head < queue.length; head += 1) {
      const current = queue[head];
      if (sameCell(current, goal)) {
        const path = [];
        let cursor = keyOf(current);
        while (cursor) {
          path.push(cursor.split(",").map(Number));
          cursor = parents.get(cursor);
        }
        return path.reverse();
      }
      for (const [dr, dc] of DIRECTIONS) {
        const next = [current[0] + dr, current[1] + dc];
        const nextKey = keyOf(next);
        if (next[0] < 0 || next[1] < 0 || next[0] >= rows || next[1] >= cols) continue;
        if (parents.has(nextKey) || (blocked.has(nextKey) && !sameCell(next, goal))) continue;
        parents.set(nextKey, keyOf(current));
        queue.push(next);
      }
    }
    return null;
  }

  function disjointRoute(snap, chosenSoil, chosenPit) {
    const count = snap.rows * snap.cols;
    const sink = count * 2;
    const graph = Array.from({ length: sink + 1 }, () => []);
    const blocked = new Set(snap.walls.map(keyOf));
    snap.soils.forEach((item) => { if (item.id !== chosenSoil.id) blocked.add(keyOf(item.at)); });
    snap.pits.forEach((item) => { if (item.id !== chosenPit.id) blocked.add(keyOf(item.at)); });
    const indexOf = ([row, col]) => row * snap.cols + col;
    const cellOf = (index) => [Math.floor(index / snap.cols), index % snap.cols];
    const addEdge = (from, to, capacity) => {
      const forward = { to, rev: graph[to].length, cap: capacity, original: capacity };
      const reverse = { to: from, rev: graph[from].length, cap: 0, original: 0 };
      graph[from].push(forward); graph[to].push(reverse);
    };
    const allowed = (cell) => cell[0] >= 0 && cell[1] >= 0 && cell[0] < snap.rows && cell[1] < snap.cols && !blocked.has(keyOf(cell));
    for (let row = 0; row < snap.rows; row += 1) {
      for (let col = 0; col < snap.cols; col += 1) {
        const cell = [row, col];
        if (!allowed(cell)) continue;
        const index = indexOf(cell), input = index * 2, output = input + 1;
        addEdge(input, output, sameCell(cell, chosenSoil.at) ? 2 : 1);
        for (const [dr, dc] of DIRECTIONS) {
          const neighbor = [row + dr, col + dc];
          if (allowed(neighbor)) addEdge(output, indexOf(neighbor) * 2, 2);
        }
      }
    }
    addEdge(indexOf(snap.car) * 2 + 1, sink, 1);
    addEdge(indexOf(chosenPit.at) * 2 + 1, sink, 1);
    const source = indexOf(chosenSoil.at) * 2 + 1;
    let flow = 0;
    while (flow < 2) {
      const level = Array(graph.length).fill(-1), queue = [source]; level[source] = 0;
      for (let head = 0; head < queue.length; head += 1) {
        const node = queue[head];
        for (const edge of graph[node]) if (edge.cap > 0 && level[edge.to] < 0) { level[edge.to] = level[node] + 1; queue.push(edge.to); }
      }
      if (level[sink] < 0) break;
      const cursor = Array(graph.length).fill(0);
      const send = (node, amount) => {
        if (node === sink) return amount;
        for (; cursor[node] < graph[node].length; cursor[node] += 1) {
          const edge = graph[node][cursor[node]];
          if (edge.cap <= 0 || level[edge.to] !== level[node] + 1) continue;
          const sent = send(edge.to, Math.min(amount, edge.cap));
          if (sent > 0) { edge.cap -= sent; graph[edge.to][edge.rev].cap += sent; return sent; }
        }
        return 0;
      };
      let sent;
      while (flow < 2 && (sent = send(source, 2 - flow)) > 0) flow += sent;
    }
    if (flow < 2) return null;

    graph.forEach((edges) => edges.forEach((edge) => { edge.used = Math.max(0, edge.original - edge.cap); }));
    const takePath = () => {
      const seen = new Set();
      const walk = (node, nodes) => {
        if (node === sink) return nodes;
        seen.add(node);
        for (const edge of graph[node]) {
          if (edge.used <= 0 || seen.has(edge.to)) continue;
          const result = walk(edge.to, [...nodes, edge.to]);
          if (result) { edge.used -= 1; return result; }
        }
        seen.delete(node);
        return null;
      };
      return walk(source, [source]);
    };
    const nodePaths = [takePath(), takePath()];
    if (nodePaths.some((path) => !path)) return null;
    const toCells = (nodes) => {
      const cells = [copyCell(chosenSoil.at)];
      nodes.forEach((node) => {
        if (node >= count * 2 || node % 2 !== 0) return;
        const cell = cellOf(node / 2);
        if (!sameCell(cells[cells.length - 1], cell)) cells.push(cell);
      });
      return cells;
    };
    const paths = nodePaths.map(toCells);
    const soilToCar = paths.find((path) => sameCell(path[path.length - 1], snap.car));
    const soilToPit = paths.find((path) => sameCell(path[path.length - 1], chosenPit.at));
    if (!soilToCar || !soilToPit) return null;
    return [...soilToCar.slice().reverse(), ...soilToPit.slice(1)];
  }

  function findHintRoute(engine) {
    const snap = engine.snapshot();
    for (const soil of snap.soils) {
      for (const pit of snap.pits) {
        const route = disjointRoute(snap, soil, pit);
        if (!route) continue;
        const probe = new CutFillBEngine({ ...engine.question, car: snap.car, soils: snap.soils, pits: snap.pits });
        probe.question.walls = snap.walls;
        probe.wallKeys = new Set(snap.walls.map(keyOf));
        if (!probe.begin(route[0]).accepted) continue;
        if (route.slice(1).every((cell) => probe.enter(cell).accepted) && probe.canCommit()) return route;
      }
    }
    return null;
  }

  const api = { CutFillBEngine, makeQuestion, findHintRoute, optionalWallCount, keyOf, sameCell };
  global.CutFillB = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
