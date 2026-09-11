globalThis.PIANO_BANK = {
  "version": "0.2-seven-note-local",
  "date": "2026-09-10",
  "purpose": "旋律题库结构候选；未试听、未适老试玩，不可标正式已验收曲库",
  "key_indexing": "0-based; human display position = keys value + 1",
  "mapping": {
    "id": "white-C4-D5-candidate-v1",
    "status": "音区待试听确认",
    "midi": [
      60,
      62,
      64,
      65,
      67,
      69,
      71,
      72,
      74
    ],
    "names": [
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
      "D5"
    ]
  },
  "playback": {
    "reward_slots_ms": "每音占用时长；相邻起音间隔；最后一项为末音时长",
    "reward_gate_ratio": "单音发声占时长的比例，余下留间隙；须真音色试听调节",
    "demo": "按主规则当前候选每音900ms、按下600ms；本题库不覆盖它",
    "input": "仅核对keys顺序，不核对时值或按住时长"
  },
  "candidate_structural_limits": {
    "lengths": [
      3,
      3,
      4,
      5,
      6,
      7
    ],
    "keys": 9,
    "L1": "相邻单向移动",
    "L2": "相邻折返",
    "max_leap_by_level": [
      1,
      1,
      2,
      3,
      3,
      3
    ],
    "note": "每级12题；12个位置组跨级关联，非72首歌曲。七音版重新编排，待试听试玩。"
  },
  "questions": [
    {
      "id": "seven-L1-001",
      "level": 1,
      "family_id": "P01",
      "family_description": "位置组1：相邻顺行",
      "keys": [
        0,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-002",
      "level": 1,
      "family_id": "P02",
      "family_description": "位置组2：相邻顺行",
      "keys": [
        1,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-003",
      "level": 1,
      "family_id": "P03",
      "family_description": "位置组3：相邻顺行",
      "keys": [
        2,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-004",
      "level": 1,
      "family_id": "P04",
      "family_description": "位置组4：相邻顺行",
      "keys": [
        3,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-005",
      "level": 1,
      "family_id": "P05",
      "family_description": "位置组5：相邻顺行",
      "keys": [
        4,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-006",
      "level": 1,
      "family_id": "P06",
      "family_description": "位置组6：相邻顺行",
      "keys": [
        5,
        6,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-007",
      "level": 1,
      "family_id": "P07",
      "family_description": "位置组7：相邻顺行",
      "keys": [
        8,
        7,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-008",
      "level": 1,
      "family_id": "P08",
      "family_description": "位置组8：相邻顺行",
      "keys": [
        7,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-009",
      "level": 1,
      "family_id": "P09",
      "family_description": "位置组9：相邻顺行",
      "keys": [
        6,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-010",
      "level": 1,
      "family_id": "P10",
      "family_description": "位置组10：相邻顺行",
      "keys": [
        5,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-011",
      "level": 1,
      "family_id": "P11",
      "family_description": "位置组11：相邻顺行",
      "keys": [
        4,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L1-012",
      "level": 1,
      "family_id": "P12",
      "family_description": "位置组12：相邻顺行",
      "keys": [
        3,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "seven-L2-001",
      "level": 2,
      "family_id": "P01",
      "family_description": "位置组1：相邻折返",
      "keys": [
        0,
        1,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-001"
    },
    {
      "id": "seven-L2-002",
      "level": 2,
      "family_id": "P02",
      "family_description": "位置组2：相邻折返",
      "keys": [
        1,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-002"
    },
    {
      "id": "seven-L2-003",
      "level": 2,
      "family_id": "P03",
      "family_description": "位置组3：相邻折返",
      "keys": [
        2,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-003"
    },
    {
      "id": "seven-L2-004",
      "level": 2,
      "family_id": "P04",
      "family_description": "位置组4：相邻折返",
      "keys": [
        3,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-004"
    },
    {
      "id": "seven-L2-005",
      "level": 2,
      "family_id": "P05",
      "family_description": "位置组5：相邻折返",
      "keys": [
        4,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-005"
    },
    {
      "id": "seven-L2-006",
      "level": 2,
      "family_id": "P06",
      "family_description": "位置组6：相邻折返",
      "keys": [
        5,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-006"
    },
    {
      "id": "seven-L2-007",
      "level": 2,
      "family_id": "P07",
      "family_description": "位置组7：相邻折返",
      "keys": [
        8,
        7,
        8
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-007"
    },
    {
      "id": "seven-L2-008",
      "level": 2,
      "family_id": "P08",
      "family_description": "位置组8：相邻折返",
      "keys": [
        7,
        6,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-008"
    },
    {
      "id": "seven-L2-009",
      "level": 2,
      "family_id": "P09",
      "family_description": "位置组9：相邻折返",
      "keys": [
        6,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-009"
    },
    {
      "id": "seven-L2-010",
      "level": 2,
      "family_id": "P10",
      "family_description": "位置组10：相邻折返",
      "keys": [
        5,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-010"
    },
    {
      "id": "seven-L2-011",
      "level": 2,
      "family_id": "P11",
      "family_description": "位置组11：相邻折返",
      "keys": [
        4,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-011"
    },
    {
      "id": "seven-L2-012",
      "level": 2,
      "family_id": "P12",
      "family_description": "位置组12：相邻折返",
      "keys": [
        3,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-012"
    },
    {
      "id": "seven-L3-001",
      "level": 3,
      "family_id": "P01",
      "family_description": "位置组1：相邻与短距离移动",
      "keys": [
        0,
        1,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-001"
    },
    {
      "id": "seven-L3-002",
      "level": 3,
      "family_id": "P02",
      "family_description": "位置组2：相邻与短距离移动",
      "keys": [
        1,
        2,
        1,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-002"
    },
    {
      "id": "seven-L3-003",
      "level": 3,
      "family_id": "P03",
      "family_description": "位置组3：相邻与短距离移动",
      "keys": [
        2,
        3,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-003"
    },
    {
      "id": "seven-L3-004",
      "level": 3,
      "family_id": "P04",
      "family_description": "位置组4：相邻与短距离移动",
      "keys": [
        3,
        4,
        5,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-004"
    },
    {
      "id": "seven-L3-005",
      "level": 3,
      "family_id": "P05",
      "family_description": "位置组5：相邻与短距离移动",
      "keys": [
        4,
        5,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-005"
    },
    {
      "id": "seven-L3-006",
      "level": 3,
      "family_id": "P06",
      "family_description": "位置组6：相邻与短距离移动",
      "keys": [
        5,
        6,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-006"
    },
    {
      "id": "seven-L3-007",
      "level": 3,
      "family_id": "P07",
      "family_description": "位置组7：相邻与短距离移动",
      "keys": [
        8,
        7,
        6,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-007"
    },
    {
      "id": "seven-L3-008",
      "level": 3,
      "family_id": "P08",
      "family_description": "位置组8：相邻与短距离移动",
      "keys": [
        7,
        6,
        7,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-008"
    },
    {
      "id": "seven-L3-009",
      "level": 3,
      "family_id": "P09",
      "family_description": "位置组9：相邻与短距离移动",
      "keys": [
        6,
        5,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-009"
    },
    {
      "id": "seven-L3-010",
      "level": 3,
      "family_id": "P10",
      "family_description": "位置组10：相邻与短距离移动",
      "keys": [
        5,
        4,
        3,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-010"
    },
    {
      "id": "seven-L3-011",
      "level": 3,
      "family_id": "P11",
      "family_description": "位置组11：相邻与短距离移动",
      "keys": [
        4,
        3,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-011"
    },
    {
      "id": "seven-L3-012",
      "level": 3,
      "family_id": "P12",
      "family_description": "位置组12：相邻与短距离移动",
      "keys": [
        3,
        2,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-012"
    },
    {
      "id": "seven-L4-001",
      "level": 4,
      "family_id": "P01",
      "family_description": "位置组1：适量跳键",
      "keys": [
        0,
        1,
        2,
        0,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-001"
    },
    {
      "id": "seven-L4-002",
      "level": 4,
      "family_id": "P02",
      "family_description": "位置组2：适量跳键",
      "keys": [
        1,
        2,
        3,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-002"
    },
    {
      "id": "seven-L4-003",
      "level": 4,
      "family_id": "P03",
      "family_description": "位置组3：适量跳键",
      "keys": [
        2,
        3,
        2,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-003"
    },
    {
      "id": "seven-L4-004",
      "level": 4,
      "family_id": "P04",
      "family_description": "位置组4：适量跳键",
      "keys": [
        3,
        4,
        5,
        4,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-004"
    },
    {
      "id": "seven-L4-005",
      "level": 4,
      "family_id": "P05",
      "family_description": "位置组5：适量跳键",
      "keys": [
        4,
        5,
        5,
        7,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-005"
    },
    {
      "id": "seven-L4-006",
      "level": 4,
      "family_id": "P06",
      "family_description": "位置组6：适量跳键",
      "keys": [
        5,
        6,
        7,
        7,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-006"
    },
    {
      "id": "seven-L4-007",
      "level": 4,
      "family_id": "P07",
      "family_description": "位置组7：适量跳键",
      "keys": [
        8,
        7,
        6,
        8,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-007"
    },
    {
      "id": "seven-L4-008",
      "level": 4,
      "family_id": "P08",
      "family_description": "位置组8：适量跳键",
      "keys": [
        7,
        6,
        5,
        4,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-008"
    },
    {
      "id": "seven-L4-009",
      "level": 4,
      "family_id": "P09",
      "family_description": "位置组9：适量跳键",
      "keys": [
        6,
        5,
        6,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-009"
    },
    {
      "id": "seven-L4-010",
      "level": 4,
      "family_id": "P10",
      "family_description": "位置组10：适量跳键",
      "keys": [
        5,
        4,
        3,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-010"
    },
    {
      "id": "seven-L4-011",
      "level": 4,
      "family_id": "P11",
      "family_description": "位置组11：适量跳键",
      "keys": [
        4,
        3,
        3,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-011"
    },
    {
      "id": "seven-L4-012",
      "level": 4,
      "family_id": "P12",
      "family_description": "位置组12：适量跳键",
      "keys": [
        3,
        2,
        1,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-012"
    },
    {
      "id": "seven-L5-001",
      "level": 5,
      "family_id": "P01",
      "family_description": "位置组1：顺行折返跳键组合",
      "keys": [
        0,
        1,
        2,
        0,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-001"
    },
    {
      "id": "seven-L5-002",
      "level": 5,
      "family_id": "P02",
      "family_description": "位置组2：顺行折返跳键组合",
      "keys": [
        1,
        2,
        3,
        4,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-002"
    },
    {
      "id": "seven-L5-003",
      "level": 5,
      "family_id": "P03",
      "family_description": "位置组3：顺行折返跳键组合",
      "keys": [
        2,
        3,
        2,
        4,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-003"
    },
    {
      "id": "seven-L5-004",
      "level": 5,
      "family_id": "P04",
      "family_description": "位置组4：顺行折返跳键组合",
      "keys": [
        3,
        4,
        5,
        4,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-004"
    },
    {
      "id": "seven-L5-005",
      "level": 5,
      "family_id": "P05",
      "family_description": "位置组5：顺行折返跳键组合",
      "keys": [
        4,
        5,
        5,
        7,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-005"
    },
    {
      "id": "seven-L5-006",
      "level": 5,
      "family_id": "P06",
      "family_description": "位置组6：顺行折返跳键组合",
      "keys": [
        5,
        6,
        7,
        7,
        6,
        8
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-006"
    },
    {
      "id": "seven-L5-007",
      "level": 5,
      "family_id": "P07",
      "family_description": "位置组7：顺行折返跳键组合",
      "keys": [
        8,
        7,
        6,
        8,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-007"
    },
    {
      "id": "seven-L5-008",
      "level": 5,
      "family_id": "P08",
      "family_description": "位置组8：顺行折返跳键组合",
      "keys": [
        7,
        6,
        5,
        4,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-008"
    },
    {
      "id": "seven-L5-009",
      "level": 5,
      "family_id": "P09",
      "family_description": "位置组9：顺行折返跳键组合",
      "keys": [
        6,
        5,
        6,
        4,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-009"
    },
    {
      "id": "seven-L5-010",
      "level": 5,
      "family_id": "P10",
      "family_description": "位置组10：顺行折返跳键组合",
      "keys": [
        5,
        4,
        3,
        4,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-010"
    },
    {
      "id": "seven-L5-011",
      "level": 5,
      "family_id": "P11",
      "family_description": "位置组11：顺行折返跳键组合",
      "keys": [
        4,
        3,
        3,
        1,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-011"
    },
    {
      "id": "seven-L5-012",
      "level": 5,
      "family_id": "P12",
      "family_description": "位置组12：顺行折返跳键组合",
      "keys": [
        3,
        2,
        1,
        1,
        2,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-012"
    },
    {
      "id": "seven-L6-001",
      "level": 6,
      "family_id": "P01",
      "family_description": "位置组1：七音短句，避免连续大跳",
      "keys": [
        0,
        1,
        2,
        0,
        3,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-001"
    },
    {
      "id": "seven-L6-002",
      "level": 6,
      "family_id": "P02",
      "family_description": "位置组2：七音短句，避免连续大跳",
      "keys": [
        1,
        2,
        3,
        4,
        2,
        3,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-002"
    },
    {
      "id": "seven-L6-003",
      "level": 6,
      "family_id": "P03",
      "family_description": "位置组3：七音短句，避免连续大跳",
      "keys": [
        2,
        3,
        2,
        4,
        5,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-003"
    },
    {
      "id": "seven-L6-004",
      "level": 6,
      "family_id": "P04",
      "family_description": "位置组4：七音短句，避免连续大跳",
      "keys": [
        3,
        4,
        5,
        4,
        6,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-004"
    },
    {
      "id": "seven-L6-005",
      "level": 6,
      "family_id": "P05",
      "family_description": "位置组5：七音短句，避免连续大跳",
      "keys": [
        4,
        5,
        5,
        7,
        6,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-005"
    },
    {
      "id": "seven-L6-006",
      "level": 6,
      "family_id": "P06",
      "family_description": "位置组6：七音短句，避免连续大跳",
      "keys": [
        5,
        6,
        7,
        7,
        6,
        8,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-006"
    },
    {
      "id": "seven-L6-007",
      "level": 6,
      "family_id": "P07",
      "family_description": "位置组7：七音短句，避免连续大跳",
      "keys": [
        8,
        7,
        6,
        8,
        5,
        6,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-007"
    },
    {
      "id": "seven-L6-008",
      "level": 6,
      "family_id": "P08",
      "family_description": "位置组8：七音短句，避免连续大跳",
      "keys": [
        7,
        6,
        5,
        4,
        6,
        5,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-008"
    },
    {
      "id": "seven-L6-009",
      "level": 6,
      "family_id": "P09",
      "family_description": "位置组9：七音短句，避免连续大跳",
      "keys": [
        6,
        5,
        6,
        4,
        3,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-009"
    },
    {
      "id": "seven-L6-010",
      "level": 6,
      "family_id": "P10",
      "family_description": "位置组10：七音短句，避免连续大跳",
      "keys": [
        5,
        4,
        3,
        4,
        2,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-010"
    },
    {
      "id": "seven-L6-011",
      "level": 6,
      "family_id": "P11",
      "family_description": "位置组11：七音短句，避免连续大跳",
      "keys": [
        4,
        3,
        3,
        1,
        2,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-011"
    },
    {
      "id": "seven-L6-012",
      "level": 6,
      "family_id": "P12",
      "family_description": "位置组12：七音短句，避免连续大跳",
      "keys": [
        3,
        2,
        1,
        1,
        2,
        0,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        500,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "2026-09-10七音上限方案重新编排；非指定歌曲；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "seven-L1-012"
    }
  ]
};
