(function (global) {
  "use strict";

  const copy = (value) => JSON.parse(JSON.stringify(value));
  const cellKey = ([row, col]) => `${row}-${col}`;

  const LEVEL_RULES = Object.freeze({
    L1: Object.freeze({ score: 10, progress: 10, threshold: 20, next: "L2", previous: "L1" }),
    L2: Object.freeze({ score: 15, progress: 15, threshold: 30, next: "L3", previous: "L1" }),
    L3: Object.freeze({ score: 20, progress: 20, threshold: 40, next: "L4", previous: "L2" }),
    L4: Object.freeze({ score: 25, progress: 25, threshold: 50, next: "L5", previous: "L3" }),
    L5: Object.freeze({ score: 30, progress: 30, threshold: 90, next: "L6", previous: "L4" }),
    L6: Object.freeze({ score: 35, progress: 0, threshold: null, next: "L6", previous: "L5" })
  });

  const ORIENTATION_DEGREES_BY_LEVEL = Object.freeze({
    L1: Object.freeze([0]),
    L2: Object.freeze([0]),
    L3: Object.freeze([0, 90, 180, 270]),
    L4: Object.freeze([0, 180]),
    L5: Object.freeze([0]),
    L6: Object.freeze([0])
  });

  function randomInteger(rng, min, max) {
    return min + Math.floor(rng() * (max - min + 1));
  }

  function sampleWithoutReplacement(items, count, rng) {
    const pool = items.map(copy);
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInteger(rng, 0, index);
      [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    return pool.slice(0, count);
  }

  function optionalWallKey(walls) {
    if (!walls.length) return "none";
    return walls.map(cellKey).sort().join("_");
  }

  function rotateCell([row, col], size, degrees) {
    const transforms = {
      0: [row, col],
      90: [col, size - 1 - row],
      180: [size - 1 - row, size - 1 - col],
      270: [size - 1 - col, row]
    };
    return transforms[degrees];
  }

  function rotateCells(cells, size, degrees) {
    return cells.map((cell) => rotateCell(cell, size, degrees));
  }

  function rotateHintSolutions(solutions, size, degrees) {
    return solutions.map((solution) => ({
      ...copy(solution),
      stages: solution.stages.map((stage) => ({
        ...copy(stage),
        car_start: rotateCell(stage.car_start, size, degrees),
        entry: rotateCell(stage.entry, size, degrees),
        approach_route: rotateCells(stage.approach_route, size, degrees),
        push_cells: rotateCells(stage.push_cells, size, degrees),
        full_route: rotateCells(stage.full_route, size, degrees),
        car_after: rotateCell(stage.car_after, size, degrees)
      }))
    }));
  }

  class DynamicQuestionGenerator {
    constructor(catalog, rng = Math.random) {
      this.catalog = catalog;
      this.rng = rng;
      this.recentInstanceKeys = [];
      this.lastTemplateId = null;
      this.templatesByLevel = Object.fromEntries(
        Object.keys(LEVEL_RULES).map((level) => [
          level,
          catalog.templates.filter((template) => template.difficulty === level)
        ])
      );
    }

    buildCandidate(level) {
      const templates = this.templatesByLevel[level];
      if (!templates || !templates.length) throw new Error(`没有可用于 ${level} 的母题`);
      const template = templates[randomInteger(this.rng, 0, templates.length - 1)];
      const count = randomInteger(
        this.rng,
        template.optionalWallCount.min,
        template.optionalWallCount.max
      );
      const optionalWalls = sampleWithoutReplacement(template.optionalWallPool, count, this.rng);
      const orientations = ORIENTATION_DEGREES_BY_LEVEL[level];
      const orientationDegrees = orientations[randomInteger(this.rng, 0, orientations.length - 1)];
      const rotatedOptionalWalls = rotateCells(optionalWalls, template.size, orientationDegrees);
      const key = optionalWallKey(rotatedOptionalWalls);
      return {
        id: `${template.id}@${template.revision}__${key}__r${orientationDegrees}`,
        templateId: template.id,
        revision: template.revision,
        difficulty: template.difficulty,
        orientationDegrees,
        size: template.size,
        car: rotateCell(template.car, template.size, orientationDegrees),
        pairs: template.pairs.map((pair) => ({
          ...copy(pair),
          dirt: rotateCell(pair.dirt, template.size, orientationDegrees),
          pit: rotateCell(pair.pit, template.size, orientationDegrees)
        })),
        walls: rotateCells(template.coreWalls, template.size, orientationDegrees).concat(rotatedOptionalWalls),
        expectedSolutionSequences: copy(template.expectedSolutionSequences),
        hintSolutions: rotateHintSolutions(template.hintSolutions, template.size, orientationDegrees),
        optionalWallCount: count
      };
    }

    next(level) {
      let candidate = this.buildCandidate(level);
      for (let reroll = 0; reroll < 8; reroll += 1) {
        const repeatsTemplate = candidate.templateId === this.lastTemplateId;
        const repeatsInstance = this.recentInstanceKeys.includes(candidate.id);
        if (!repeatsTemplate && !repeatsInstance) break;
        candidate = this.buildCandidate(level);
      }
      this.lastTemplateId = candidate.templateId;
      this.recentInstanceKeys.push(candidate.id);
      this.recentInstanceKeys = this.recentInstanceKeys.slice(-6);
      return candidate;
    }

    resetHistory() {
      this.recentInstanceKeys = [];
      this.lastTemplateId = null;
    }
  }

  class DynamicGameSession {
    constructor(durationSeconds = 120) {
      this.durationSeconds = durationSeconds;
      this.reset();
    }

    reset() {
      this.totalScore = 0;
      this.levelProgress = 0;
      this.currentLevel = "L1";
      this.completedQuestions = 0;
      this.remainingMs = this.durationSeconds * 1000;
      this.questionUsedHint = false;
      this.ended = false;
    }

    markHintUsed() {
      this.questionUsedHint = true;
    }

    completeQuestion() {
      const completedLevel = this.currentLevel;
      const rule = LEVEL_RULES[completedLevel];
      this.totalScore += rule.score;
      this.completedQuestions += 1;

      if (this.questionUsedHint) {
        this.currentLevel = rule.previous;
        this.levelProgress = 0;
      } else {
        this.levelProgress += rule.progress;
        if (rule.threshold !== null && this.levelProgress >= rule.threshold) {
          this.currentLevel = rule.next;
          this.levelProgress = 0;
        }
      }

      const outcome = {
        completedLevel,
        awardedScore: rule.score,
        usedHint: this.questionUsedHint,
        currentLevel: this.currentLevel,
        levelProgress: this.levelProgress,
        totalScore: this.totalScore,
        completedQuestions: this.completedQuestions
      };
      this.questionUsedHint = false;
      return outcome;
    }

    consumeActiveTime(milliseconds) {
      if (this.ended) return false;
      this.remainingMs = Math.max(0, this.remainingMs - Math.max(0, milliseconds));
      if (this.remainingMs === 0) this.ended = true;
      return this.ended;
    }

    levelRule() {
      return LEVEL_RULES[this.currentLevel];
    }

    snapshot() {
      return {
        totalScore: this.totalScore,
        levelProgress: this.levelProgress,
        currentLevel: this.currentLevel,
        completedQuestions: this.completedQuestions,
        remainingMs: this.remainingMs,
        questionUsedHint: this.questionUsedHint,
        ended: this.ended
      };
    }
  }

  function sameSequence(left, right) {
    return left.length === right.length && left.every((item, index) => item === right[index]);
  }

  function chooseHintStage(question, completedSequence) {
    const choices = question.hintSolutions
      .filter((solution) => sameSequence(solution.sequence.slice(0, completedSequence.length), completedSequence))
      .map((solution) => solution.stages[completedSequence.length])
      .filter(Boolean)
      .filter((stage) => sameSequence(stage.filled_before, completedSequence));
    choices.sort((left, right) => left.full_route.length - right.full_route.length);
    return choices.length ? copy(choices[0]) : null;
  }

  global.CUT_FILL_LEVEL_RULES = LEVEL_RULES;
  global.CUT_FILL_ORIENTATION_DEGREES_BY_LEVEL = ORIENTATION_DEGREES_BY_LEVEL;
  global.rotateCutFillCell = rotateCell;
  global.DynamicQuestionGenerator = DynamicQuestionGenerator;
  global.DynamicGameSession = DynamicGameSession;
  global.chooseCutFillHintStage = chooseHintStage;
})(window);
