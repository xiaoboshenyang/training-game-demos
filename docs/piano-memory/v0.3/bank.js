globalThis.PIANO_BANK = {
  "version": "0.1-candidate",
  "date": "2026-09-09",
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
    "1": {
      "min_distinct": 2,
      "max_span": 3,
      "max_leap": 2
    },
    "2": {
      "min_distinct": 3,
      "max_span": 4,
      "max_leap": 3
    },
    "3": {
      "min_distinct": 3,
      "max_span": 5,
      "max_leap": 4
    },
    "4": {
      "min_distinct": 4,
      "max_span": 6,
      "max_leap": 4
    },
    "5": {
      "min_distinct": 4,
      "max_span": 7,
      "max_leap": 5
    },
    "6": {
      "min_distinct": 5,
      "max_span": 8,
      "max_leap": 5
    }
  },
  "questions": [
    {
      "id": "candidate-L1-001",
      "level": 1,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
      "keys": [
        0,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-002",
      "level": 1,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
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
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-003",
      "level": 1,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-004",
      "level": 1,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-005",
      "level": 1,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-006",
      "level": 1,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 1,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-007",
      "level": 1,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-008",
      "level": 1,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
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
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-009",
      "level": 1,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-010",
      "level": 1,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-011",
      "level": 1,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L1-012",
      "level": 1,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 2,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": null
    },
    {
      "id": "candidate-L2-001",
      "level": 2,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
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
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-001"
    },
    {
      "id": "candidate-L2-002",
      "level": 2,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-002"
    },
    {
      "id": "candidate-L2-003",
      "level": 2,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-003"
    },
    {
      "id": "candidate-L2-004",
      "level": 2,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-004"
    },
    {
      "id": "candidate-L2-005",
      "level": 2,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-005"
    },
    {
      "id": "candidate-L2-006",
      "level": 2,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-006"
    },
    {
      "id": "candidate-L2-007",
      "level": 2,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-007"
    },
    {
      "id": "candidate-L2-008",
      "level": 2,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-008"
    },
    {
      "id": "candidate-L2-009",
      "level": 2,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-009"
    },
    {
      "id": "candidate-L2-010",
      "level": 2,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-010"
    },
    {
      "id": "candidate-L2-011",
      "level": 2,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 2,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-011"
    },
    {
      "id": "candidate-L2-012",
      "level": 2,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-012"
    },
    {
      "id": "candidate-L3-001",
      "level": 3,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
      "keys": [
        0,
        1,
        2,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-001"
    },
    {
      "id": "candidate-L3-002",
      "level": 3,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
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
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-002"
    },
    {
      "id": "candidate-L3-003",
      "level": 3,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3,
        1,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        500,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-003"
    },
    {
      "id": "candidate-L3-004",
      "level": 3,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6,
        7,
        8
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 1,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-004"
    },
    {
      "id": "candidate-L3-005",
      "level": 3,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 3,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-005"
    },
    {
      "id": "candidate-L3-006",
      "level": 3,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        500,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-006"
    },
    {
      "id": "candidate-L3-007",
      "level": 3,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3,
        1,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-007"
    },
    {
      "id": "candidate-L3-008",
      "level": 3,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-008"
    },
    {
      "id": "candidate-L3-009",
      "level": 3,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        500,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-009"
    },
    {
      "id": "candidate-L3-010",
      "level": 3,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4,
        2,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-010"
    },
    {
      "id": "candidate-L3-011",
      "level": 3,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-011"
    },
    {
      "id": "candidate-L3-012",
      "level": 3,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        500,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-012"
    },
    {
      "id": "candidate-L4-001",
      "level": 4,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
      "keys": [
        0,
        1,
        2,
        4,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-001"
    },
    {
      "id": "candidate-L4-002",
      "level": 4,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0,
        3,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-002"
    },
    {
      "id": "candidate-L4-003",
      "level": 4,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3,
        1,
        2,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
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
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-003"
    },
    {
      "id": "candidate-L4-004",
      "level": 4,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6,
        7,
        8,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-004"
    },
    {
      "id": "candidate-L4-005",
      "level": 4,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2,
        4,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 4,
        "span_in_key_steps": 3,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-005"
    },
    {
      "id": "candidate-L4-006",
      "level": 4,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6,
        4,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
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
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-006"
    },
    {
      "id": "candidate-L4-007",
      "level": 4,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3,
        1,
        0,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-007"
    },
    {
      "id": "candidate-L4-008",
      "level": 4,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4,
        2,
        1,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-008"
    },
    {
      "id": "candidate-L4-009",
      "level": 4,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8,
        5,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-009"
    },
    {
      "id": "candidate-L4-010",
      "level": 4,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4,
        2,
        4,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-010"
    },
    {
      "id": "candidate-L4-011",
      "level": 4,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2,
        3,
        4,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-011"
    },
    {
      "id": "candidate-L4-012",
      "level": 4,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6,
        4,
        5,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-012"
    },
    {
      "id": "candidate-L5-001",
      "level": 5,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
      "keys": [
        0,
        1,
        2,
        4,
        2,
        1,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-001"
    },
    {
      "id": "candidate-L5-002",
      "level": 5,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0,
        3,
        4,
        2,
        5,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-002"
    },
    {
      "id": "candidate-L5-003",
      "level": 5,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3,
        1,
        2,
        4,
        5,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-003"
    },
    {
      "id": "candidate-L5-004",
      "level": 5,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6,
        7,
        8,
        6,
        4,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-004"
    },
    {
      "id": "candidate-L5-005",
      "level": 5,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2,
        4,
        3,
        2,
        5,
        6
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-005"
    },
    {
      "id": "candidate-L5-006",
      "level": 5,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6,
        4,
        5,
        4,
        3,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-006"
    },
    {
      "id": "candidate-L5-007",
      "level": 5,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3,
        1,
        0,
        2,
        5,
        3
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-007"
    },
    {
      "id": "candidate-L5-008",
      "level": 5,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4,
        2,
        1,
        3,
        4,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-008"
    },
    {
      "id": "candidate-L5-009",
      "level": 5,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8,
        5,
        4,
        2,
        3,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-009"
    },
    {
      "id": "candidate-L5-010",
      "level": 5,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4,
        2,
        4,
        3,
        1,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 4,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-010"
    },
    {
      "id": "candidate-L5-011",
      "level": 5,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2,
        3,
        4,
        5,
        3,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-011"
    },
    {
      "id": "candidate-L5-012",
      "level": 5,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6,
        4,
        5,
        7,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-012"
    },
    {
      "id": "candidate-L6-001",
      "level": 6,
      "family_id": "F01",
      "family_description": "逐步上行后折回",
      "keys": [
        0,
        1,
        2,
        4,
        2,
        1,
        3,
        2,
        4,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 5,
        "span_in_key_steps": 4,
        "max_leap_in_key_steps": 4,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-001"
    },
    {
      "id": "candidate-L6-002",
      "level": 6,
      "family_id": "F02",
      "family_description": "逐步下行后抬起",
      "keys": [
        2,
        1,
        0,
        3,
        4,
        2,
        5,
        4,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-002"
    },
    {
      "id": "candidate-L6-003",
      "level": 6,
      "family_id": "F03",
      "family_description": "先上再回的短拱形",
      "keys": [
        3,
        4,
        3,
        1,
        2,
        4,
        5,
        7,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-003"
    },
    {
      "id": "candidate-L6-004",
      "level": 6,
      "family_id": "F04",
      "family_description": "先下再回的短谷形",
      "keys": [
        6,
        5,
        6,
        7,
        8,
        6,
        4,
        5,
        4,
        2
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-004"
    },
    {
      "id": "candidate-L6-005",
      "level": 6,
      "family_id": "F05",
      "family_description": "开头同音两次再向上",
      "keys": [
        1,
        1,
        2,
        4,
        3,
        2,
        5,
        6,
        7,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-005"
    },
    {
      "id": "candidate-L6-006",
      "level": 6,
      "family_id": "F06",
      "family_description": "下行后停在同一音",
      "keys": [
        7,
        6,
        6,
        4,
        5,
        4,
        3,
        2,
        4,
        0
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 7,
        "max_leap_in_key_steps": 4,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-006"
    },
    {
      "id": "candidate-L6-007",
      "level": 6,
      "family_id": "F07",
      "family_description": "向上跨一键后回落",
      "keys": [
        2,
        4,
        3,
        1,
        0,
        2,
        5,
        3,
        4,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 7,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-007"
    },
    {
      "id": "candidate-L6-008",
      "level": 6,
      "family_id": "F08",
      "family_description": "向下跨一键后回升",
      "keys": [
        5,
        3,
        4,
        2,
        1,
        3,
        4,
        1,
        6,
        5
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 5,
        "max_leap_in_key_steps": 5,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-008"
    },
    {
      "id": "candidate-L6-009",
      "level": 6,
      "family_id": "F09",
      "family_description": "上行中扩大距离",
      "keys": [
        5,
        6,
        8,
        5,
        4,
        2,
        3,
        4,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 6,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 3,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-009"
    },
    {
      "id": "candidate-L6-010",
      "level": 6,
      "family_id": "F10",
      "family_description": "下行中扩大距离",
      "keys": [
        7,
        6,
        4,
        2,
        4,
        3,
        1,
        5,
        6,
        7
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        500,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 4,
        "max_same_key_run": 1
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-010"
    },
    {
      "id": "candidate-L6-011",
      "level": 6,
      "family_id": "F11",
      "family_description": "上跳后同音再按一次",
      "keys": [
        0,
        2,
        2,
        3,
        4,
        5,
        3,
        1,
        6,
        4
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        250,
        250,
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        1000
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 6,
        "max_leap_in_key_steps": 5,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-011"
    },
    {
      "id": "candidate-L6-012",
      "level": 6,
      "family_id": "F12",
      "family_description": "高位同音两次后下跳",
      "keys": [
        8,
        8,
        6,
        4,
        5,
        7,
        6,
        4,
        2,
        1
      ],
      "mapping_id": "white-C4-D5-candidate-v1",
      "reward_slots_ms": [
        500,
        500,
        250,
        250,
        500,
        250,
        250,
        500,
        250,
        750
      ],
      "reward_gate_ratio": 0.8,
      "metrics": {
        "distinct_keys": 7,
        "span_in_key_steps": 7,
        "max_leap_in_key_steps": 2,
        "max_same_key_run": 2
      },
      "source": "本轮AI手工编排；未以指定既有歌曲为来源；未做曲库相似性检索",
      "status": "structural_candidate_not_auditioned",
      "parent_motif": "candidate-L1-012"
    }
  ]
}
;