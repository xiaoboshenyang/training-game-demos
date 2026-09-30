(function(root){const levels=[
  {
    "id": "T01",
    "grade": 1,
    "level": "L1 基础",
    "name": "教学｜一根销钉",
    "mother": "基础操作教学",
    "status": "teaching",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/T01",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先学会点开销钉；这道是教学，不计正式训练题。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 740,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            740,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸"
    ],
    "intendedDecisions": [
      "普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "A": "A"
    },
    "struct": "普通开闸",
    "hint": "推荐：A打开。",
    "variant": "serial:P",
    "constructionReplay": {
      "status": "win",
      "seconds": 4.138,
      "opened": [
        {
          "id": "A",
          "t": 0.6416666666666656
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    }
  },
  {
    "id": "T02",
    "grade": 1,
    "level": "L1 基础",
    "name": "教学｜两根销钉",
    "mother": "基础操作教学",
    "status": "teaching",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/T02",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先学会点开销钉；这道是教学，不计正式训练题。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 970,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            970,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸"
    ],
    "intendedDecisions": [
      "普通开闸 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "A": "A",
      "B": "B"
    },
    "struct": "普通开闸 → 普通开闸",
    "hint": "推荐：A打开 → B打开。",
    "variant": "serial:P-P",
    "constructionReplay": {
      "status": "win",
      "seconds": 5.671,
      "opened": [
        {
          "id": "A",
          "t": 0.6416666666666656
        },
        {
          "id": "B",
          "t": 2.7750000000000328
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    }
  },
  {
    "id": "L2-1",
    "grade": 2,
    "level": "L2 初阶",
    "name": "等一次再出发",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-1",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 740,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            740,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "A": "A"
    },
    "struct": "近处等安全",
    "hint": "推荐：A等刚安全时开。",
    "variant": "serial:N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.6,
      "opened": [
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L2-2",
    "grade": 2,
    "level": "L2 初阶",
    "name": "先过一闸再等",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-2",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 970,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            970,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "普通开闸 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-N",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "B": "A",
      "A": "B"
    },
    "struct": "普通开闸 → 近处等安全",
    "hint": "推荐：B打开 → A等刚安全时开。",
    "variant": "serial:P-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9,
      "opened": [
        {
          "id": "B",
          "t": 0.6416666666666656
        },
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L2-3",
    "grade": 2,
    "level": "L2 初阶",
    "name": "过危险后再开末闸",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-3",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 970,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            970,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-P",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "A": "A",
      "B": "B"
    },
    "struct": "近处等安全 → 普通开闸",
    "hint": "推荐：A等刚安全时开 → B打开。",
    "variant": "serial:N-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.133,
      "opened": [
        {
          "id": "A",
          "t": 6.10416666666664
        },
        {
          "id": "B",
          "t": 8.237499999999853
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L2-4",
    "grade": 2,
    "level": "L2 初阶",
    "name": "两段分别等安全",
    "mother": "分段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-4",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 970,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            360
          ],
          [
            970,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 3.5,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "A",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-N",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "B": "A",
      "A": "B"
    },
    "struct": "近处等安全 → 近处等安全",
    "hint": "推荐：B等刚安全时开 → A等刚安全时开。",
    "variant": "serial:N-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.8,
      "opened": [
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8,
        4.8
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L2-5",
    "grade": 2,
    "level": "L2 初阶",
    "name": "等待间插入普通闸",
    "mother": "分段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-5",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 200,
        "type": "start"
      },
      "P": {
        "x": 1020,
        "y": 380,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            200
          ],
          [
            1020,
            200
          ],
          [
            1020,
            380
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "main",
        "at": 740,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "main",
        "at": 860,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 3.5,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "B",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 普通开闸 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-P-N",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "C": "A",
      "A": "B",
      "B": "C"
    },
    "struct": "近处等安全 → 普通开闸 → 近处等安全",
    "hint": "推荐：C等刚安全时开 → A打开 → B等刚安全时开。",
    "variant": "serial:N-P-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.333,
      "opened": [
        {
          "id": "C",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 8.237499999999853
        },
        {
          "id": "B",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8,
        4.8
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L2-6",
    "grade": 2,
    "level": "L2 初阶",
    "name": "在中段等安全",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-6",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 200,
        "type": "start"
      },
      "P": {
        "x": 1020,
        "y": 380,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            120,
            200
          ],
          [
            1020,
            200
          ],
          [
            1020,
            380
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "main",
        "at": 740,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "普通开闸 → 近处等安全 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-N-P",
    "presentationVariant": "串行骨架",
    "pinRoles": {
      "C": "A",
      "B": "B",
      "A": "C"
    },
    "struct": "普通开闸 → 近处等安全 → 普通开闸",
    "hint": "推荐：C打开 → B等刚安全时开 → A打开。",
    "variant": "serial:P-N-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.533,
      "opened": [
        {
          "id": "C",
          "t": 0.6416666666666656
        },
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 8.104166666666528
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-1",
    "grade": 3,
    "level": "L3 中阶",
    "name": "留闸后等安全",
    "mother": "留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-1",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "A": "W2",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "A通向漏口，保持关闭。推荐：B打开 → C等刚安全时开。",
    "variant": "stair:-/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.396,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-2",
    "grade": 3,
    "level": "L3 中阶",
    "name": "选闸就是放行",
    "mother": "选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-2",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 160,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、0处留闸、0处到达前配置",
      "选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/Q/-/-;timing:gate2;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "D",
      "C": "W2",
      "A": "A"
    },
    "struct": "1处选路、0处留闸、0处到达前配置；选闸同时定时",
    "hint": "C通向漏口，保持关闭。推荐：A打开 → B等刚安全时开。",
    "variant": "stair:-/Q/-/-;timing:gate2;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.033,
      "opened": [
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-3",
    "grade": 3,
    "level": "L3 中阶",
    "name": "先选路再留闸",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-3",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "E",
          "correctPin": "C",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "C": "B",
      "E": "W1",
      "A": "W2",
      "B": "E",
      "D": "A"
    },
    "struct": "1处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "A通向漏口，保持关闭。推荐：D打开 → C打开 → B等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.329,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 1.7374999999999952
        },
        {
          "id": "B",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-4",
    "grade": 3,
    "level": "L3 中阶",
    "name": "留闸后再选路",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-4",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "wrong3",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "B",
          "correctPin": "A",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/Q/-;timing:home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "E": "W2",
      "A": "F",
      "B": "W3",
      "C": "G",
      "D": "A"
    },
    "struct": "1处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "E通向漏口，保持关闭。推荐：D打开 → A打开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:-/K/Q/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.833,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.937499999999926
        },
        {
          "id": "C",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-5",
    "grade": 3,
    "level": "L3 中阶",
    "name": "连续两处分路",
    "mother": "选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-5",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "F",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、0处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "B",
      "F": "W1",
      "D": "D",
      "E": "W2",
      "C": "E",
      "A": "A"
    },
    "struct": "2处选路、0处留闸、0处到达前配置；分段等安全",
    "hint": "E通向漏口，保持关闭。推荐：A打开 → B打开 → D打开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.396,
      "opened": [
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "D",
          "t": 3.204166666666721
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-6",
    "grade": 3,
    "level": "L3 中阶",
    "name": "两处漏口都要留住",
    "mother": "留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-6",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 280,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            280,
            580
          ],
          [
            280,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A",
        "D"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/K;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "A": "W2",
      "D": "W4",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、2处留闸、0处到达前配置；分段等安全",
    "hint": "A、D通向漏口，保持关闭。推荐：B打开 → C等刚安全时开。",
    "variant": "stair:-/K/-/K;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.329,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-7",
    "grade": 3,
    "level": "L3 中阶",
    "name": "末端选闸看时机",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-7",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 840,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            840,
            580
          ],
          [
            840,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "home",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "F",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、1处留闸、0处到达前配置",
      "选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/Q;timing:gate4;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "B",
      "F": "W1",
      "D": "W2",
      "A": "H",
      "C": "W4",
      "E": "A"
    },
    "struct": "2处选路、1处留闸、0处到达前配置；选闸同时定时",
    "hint": "D、C通向漏口，保持关闭。推荐：E打开 → B打开 → A等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/Q;timing:gate4;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.104,
      "opened": [
        {
          "id": "E",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "A",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L3-8",
    "grade": 3,
    "level": "L3 中阶",
    "name": "三次路线判断",
    "mother": "选路",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-8",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong3",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "G",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "G",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "F"
      ],
      "configure": [],
      "timing": [],
      "wrongChoice": [
        {
          "pin": "C",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        },
        {
          "pin": "E",
          "correctPin": "A",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "开闸"
    ],
    "intendedDecisions": [
      "3处选路、0处留闸、0处到达前配置"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/Q/-;timing:-;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "B": "B",
      "C": "W1",
      "D": "D",
      "F": "W2",
      "A": "F",
      "E": "W3",
      "G": "A"
    },
    "struct": "3处选路、0处留闸、0处到达前配置",
    "hint": "F通向漏口，保持关闭。推荐：G打开 → B打开 → D打开 → A打开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/Q/-;timing:-;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "G",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "D",
          "t": 3.204166666666721
        },
        {
          "id": "A",
          "t": 6.937499999999926
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    }
  },
  {
    "id": "L4-1",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先配路再等安全",
    "mother": "配置＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-1",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "B",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、0处留闸、1处到达前配置；分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。推荐：B打开 → C打开 → A等刚安全时开。",
    "variant": "stair:C/-/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.337,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-2",
    "grade": 4,
    "level": "L4 高阶",
    "name": "配置与留闸",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-2",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "B": "B",
      "D": "W2",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、1处留闸、1处到达前配置；分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：B打开 → C打开 → A等刚安全时开。",
    "variant": "stair:C/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-3",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先留闸后配下游",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-3",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/C/-;timing:home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "A": "W2",
      "C": "F",
      "B": "G",
      "D": "A"
    },
    "struct": "0处选路、1处留闸、1处到达前配置；分段等安全",
    "hint": "先配置C；也可在鱼到对应岔口前补开。A通向漏口，保持关闭。推荐：C打开 → D打开 → B等刚安全时开。",
    "variant": "stair:-/K/C/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.433,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 8.504166666666505
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-4",
    "grade": 4,
    "level": "L4 高阶",
    "name": "配置后选支路",
    "mother": "配置＋选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-4",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "D",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、0处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/Q/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "A": "B",
      "C": "D",
      "E": "W2",
      "D": "E",
      "B": "A"
    },
    "struct": "1处选路、0处留闸、1处到达前配置；分段等安全",
    "hint": "先配置A；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：A打开 → B打开 → C打开 → D等刚安全时开。",
    "variant": "stair:C/Q/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.342,
      "opened": [
        {
          "id": "A",
          "t": 0
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 3.204166666666721
        },
        {
          "id": "D",
          "t": 3.8458333333334194
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-5",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两处提前配置",
    "mother": "配置＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-5",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "D"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "C",
        "D"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、2处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/C/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "C": "B",
      "D": "F",
      "A": "E",
      "B": "A"
    },
    "struct": "0处选路、0处留闸、2处到达前配置；分段等安全",
    "hint": "先配置C、D；也可在鱼到对应岔口前补开。推荐：C打开 → D打开 → B打开 → A等刚安全时开。",
    "variant": "stair:C/-/C/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "D",
          "t": 0.004166666666666667
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-6",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两次配置间留闸",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-6",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1060,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            840,
            400
          ],
          [
            1060,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "C",
        "A"
      ],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "C": "B",
      "D": "W2",
      "A": "F",
      "E": "G",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；分段等安全",
    "hint": "先配置C、A；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：C打开 → A打开 → B打开 → E等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.5,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "A",
          "t": 0.004166666666666667
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "E",
          "t": 8.504166666666505
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L4-7",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两处配置分段等待",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-7",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1060,
        "y": 400,
        "type": "trap"
      },
      "T4": {
        "x": 840,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            840,
            400
          ],
          [
            1060,
            400
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            840,
            580
          ],
          [
            840,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "G",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      },
      {
        "id": "E",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "F",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "G"
      },
      {
        "pin": "C"
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "A"
      ],
      "configure": [
        "G",
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "E",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、2处到达前配置",
      "分段等安全＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/K;timing:middle,home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "G": "B",
      "D": "W2",
      "C": "F",
      "A": "W4",
      "B": "E",
      "E": "G",
      "F": "A"
    },
    "struct": "0处选路、2处留闸、2处到达前配置；分段等安全＋分段等安全",
    "hint": "先配置G、C；也可在鱼到对应岔口前补开。D、A通向漏口，保持关闭。推荐：G打开 → C打开 → F打开 → B等刚安全时开 → E等刚安全时开。",
    "variant": "stair:C/K/C/K;timing:middle,home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.337,
      "opened": [
        {
          "id": "G",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.004166666666666667
        },
        {
          "id": "F",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 3.8416666666667525
        },
        {
          "id": "E",
          "t": 8.341666666666514
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L4-8",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先等再选再等待",
    "mother": "配置＋选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-8",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 280,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            280,
            580
          ],
          [
            280,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      },
      {
        "id": "E",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 220,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "C"
      ],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "E",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、1处到达前配置",
      "分段等安全＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/Q/-/K;timing:in,middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "B": "B",
      "F": "D",
      "D": "W2",
      "C": "W4",
      "A": "A",
      "E": "E"
    },
    "struct": "1处选路、1处留闸、1处到达前配置；分段等安全＋分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。D、C通向漏口，保持关闭。推荐：B打开 → A等刚安全时开 → F打开 → E等刚安全时开。",
    "variant": "stair:C/Q/-/K;timing:in,middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.133,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "A",
          "t": 3.700000000000079
        },
        {
          "id": "F",
          "t": 5.92916666666665
        },
        {
          "id": "E",
          "t": 7.704166666666549
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L5-1",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先看下层再开闸",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 500,
        "y": 680,
        "type": "pool"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ],
          [
            500,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "D",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "G",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "F",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "F",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "G",
          "correctPin": "D",
          "semantics": "alone-fails; with-correct-open-legal"
        },
        {
          "pin": "C",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "D": "B",
      "G": "C",
      "B": "D",
      "C": "E",
      "A": "F",
      "E": "G",
      "F": "A"
    },
    "mother": "两层追踪＋入口时机",
    "taskPattern": "tree2:goal=down/down;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/down;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。推荐：F等刚安全时开 → D打开 → B打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end0",
      "directions": [
        "down",
        "down"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    }
  },
  {
    "id": "L5-2",
    "grade": 5,
    "level": "L5 超凡",
    "name": "下路后面要转弯",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "pool"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "G",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "G",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "F"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "E",
          "correctPin": "G",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "G": "B",
      "E": "C",
      "F": "D",
      "D": "E",
      "C": "F",
      "B": "G",
      "A": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=down/flat;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/flat;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。F保持关闭。推荐：A等刚安全时开 → G打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end1",
      "directions": [
        "down",
        "flat"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    }
  },
  {
    "id": "L5-3",
    "grade": 5,
    "level": "L5 超凡",
    "name": "平路后面再向下",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 1000,
        "y": 680,
        "type": "pool"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ],
          [
            1000,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "G",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "B"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "G",
          "correctPin": "D",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "B": "B",
      "E": "C",
      "F": "D",
      "A": "E",
      "D": "F",
      "G": "G",
      "C": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/down;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/down;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。B保持关闭。推荐：C等刚安全时开 → E打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end2",
      "directions": [
        "flat",
        "down"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    }
  },
  {
    "id": "L5-4",
    "grade": 5,
    "level": "L5 超凡",
    "name": "两次平路才到池",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "G",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "A",
        "G"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "A": "B",
      "F": "C",
      "C": "D",
      "B": "E",
      "G": "F",
      "D": "G",
      "E": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/flat;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/flat;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。A、G保持关闭。推荐：E等刚安全时开 → F打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end3",
      "directions": [
        "flat",
        "flat"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    }
  },
  {
    "id": "L5-5",
    "grade": 5,
    "level": "L5 超凡",
    "name": "配好入口再选下层",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 500,
        "y": 680,
        "type": "pool"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ],
          [
            500,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "C",
          "correctPin": "F",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "A": "B",
      "F": "D",
      "C": "E",
      "D": "F",
      "E": "G",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋入口时机",
    "taskPattern": "tree2:goal=down/down;root=C;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/down;root=C;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好A。推荐：A打开 → B等刚安全时开 → F打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end0",
      "directions": [
        "down",
        "down"
      ],
      "rootMode": "C",
      "childMode": "Q"
    }
  },
  {
    "id": "L5-6",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先配路再留住漏口",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "pool"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "A": "B",
      "D": "D",
      "C": "F",
      "E": "G",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋留闸＋入口时机",
    "taskPattern": "tree2:goal=down/flat;root=C;child=K;timings=shared-inlet",
    "variant": "tree2:goal=down/flat;root=C;child=K;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好A。D保持关闭。推荐：A打开 → B等刚安全时开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end1",
      "directions": [
        "down",
        "flat"
      ],
      "rootMode": "C",
      "childMode": "K"
    }
  },
  {
    "id": "L5-7",
    "grade": 5,
    "level": "L5 超凡",
    "name": "留住近路配远路",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 1000,
        "y": 680,
        "type": "pool"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ],
          [
            1000,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "E",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "E": "B",
      "D": "D",
      "A": "E",
      "C": "F",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/down;root=K;child=C;timings=shared-inlet",
    "variant": "tree2:goal=flat/down;root=K;child=C;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好C。E保持关闭。推荐：C打开 → B等刚安全时开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end2",
      "directions": [
        "flat",
        "down"
      ],
      "rootMode": "K",
      "childMode": "C"
    }
  },
  {
    "id": "L5-8",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先排除再选末路",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 60,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 320,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 320,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 800,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 320,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 560,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 800,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 1040,
        "y": 220,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            60,
            80
          ],
          [
            60,
            220
          ],
          [
            320,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            320,
            220
          ],
          [
            320,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            320,
            220
          ],
          [
            800,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            320,
            460
          ],
          [
            320,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            320,
            460
          ],
          [
            560,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            800,
            220
          ],
          [
            800,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            800,
            220
          ],
          [
            1040,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "B",
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局"
    ],
    "pinRoles": {
      "B": "B",
      "A": "D",
      "D": "E",
      "C": "F",
      "F": "G",
      "E": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/flat;root=K;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/flat;root=K;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。B、C保持关闭。推荐：E等刚安全时开 → F打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end3",
      "directions": [
        "flat",
        "flat"
      ],
      "rootMode": "K",
      "childMode": "Q"
    }
  },
  {
    "id": "L6-1",
    "grade": 6,
    "level": "L6 宗师",
    "name": "配置后预判远火",
    "mother": "配置＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-1",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、1处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/-/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "B",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、0处留闸、1处到达前配置；远处到达预判",
    "hint": "先配置B；也可在鱼到对应岔口前补开。推荐：B打开 → C打开 → A等危险刚开始时开。",
    "variant": "stair:C/-/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L6-2",
    "grade": 6,
    "level": "L6 宗师",
    "name": "留闸再看远处",
    "mother": "留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-2",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、0处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/-;timing:far;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "A": "W2",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、0处到达前配置；远处到达预判",
    "hint": "A通向漏口，保持关闭。推荐：B打开 → C等危险刚开始时开。",
    "variant": "stair:-/K/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.667,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L6-3",
    "grade": 6,
    "level": "L6 宗师",
    "name": "连续选路后预判",
    "mother": "选路＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-3",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "F",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "F",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": [
        {
          "pin": "B",
          "correctPin": "C",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、0处留闸、0处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/-/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "C": "B",
      "B": "W1",
      "A": "D",
      "E": "W2",
      "F": "E",
      "D": "A"
    },
    "struct": "2处选路、0处留闸、0处到达前配置；远处到达预判",
    "hint": "E通向漏口，保持关闭。推荐：D打开 → C打开 → A打开 → F等危险刚开始时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 1.7374999999999952
        },
        {
          "id": "A",
          "t": 3.204166666666721
        },
        {
          "id": "F",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "L6-4",
    "grade": 6,
    "level": "L6 宗师",
    "name": "远火之后等近齿轮",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-4",
      "routeChanged": false
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "F"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "D",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "B",
        "F"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "D",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:far,home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "B": "B",
      "E": "W2",
      "F": "F",
      "A": "E",
      "D": "G",
      "C": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置B、F；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：B打开 → F打开 → C打开 → A等危险刚开始时开 → D等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:far,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.433,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "F",
          "t": 0.004166666666666667
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.10416666666664
        },
        {
          "id": "D",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L6-5",
    "grade": 6,
    "level": "L6 宗师",
    "name": "近远混合",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-5",
      "routeChanged": true
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1060,
        "y": 400,
        "type": "trap"
      },
      "T4": {
        "x": 840,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            840,
            400
          ],
          [
            1060,
            400
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            840,
            580
          ],
          [
            840,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "G",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "E"
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "G",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "F"
      ],
      "configure": [
        "C",
        "E"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "G",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/K;timing:far,home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "C": "B",
      "D": "W2",
      "E": "F",
      "F": "W4",
      "B": "E",
      "G": "G",
      "A": "A"
    },
    "struct": "0处选路、2处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置C、E；也可在鱼到对应岔口前补开。D、F通向漏口，保持关闭。推荐：C打开 → E打开 → A打开 → B等危险刚开始时开 → G等刚安全时开。",
    "variant": "stair:C/K/C/K;timing:far,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.5,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "E",
          "t": 0.004166666666666667
        },
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "G",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L6-6",
    "grade": 6,
    "level": "L6 宗师",
    "name": "跨岔口预测到达",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-6",
      "routeChanged": true
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1000,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 840,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 280,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 500,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1000,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 60,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1000,
            80
          ],
          [
            1000,
            180
          ],
          [
            840,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            840,
            180
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            840,
            400
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            280,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            840,
            180
          ],
          [
            500,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            650
          ],
          [
            1000,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            280,
            400
          ],
          [
            60,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "down1",
        "at": 85,
        "gate": false,
        "flip": true
      },
      {
        "id": "C",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 260,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "F"
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "B",
        "F"
      ],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "C",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:farConfig,home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池",
    "pinRoles": {
      "B": "B",
      "D": "W2",
      "F": "F",
      "E": "C",
      "C": "G",
      "A": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置B、F；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：B打开 → F打开 → A打开 → E等危险刚开始时开 → C等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:farConfig,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.433,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "F",
          "t": 0.004166666666666667
        },
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "E",
          "t": 6.10416666666664
        },
        {
          "id": "C",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L6-7",
    "grade": 6,
    "level": "L6 宗师",
    "name": "路线远火后再选闸",
    "mother": "选路＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-7",
      "routeChanged": true
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 840,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            840,
            580
          ],
          [
            840,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "home",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "G",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "E",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "G",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "F"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "G",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "C",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "A",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、1处留闸、0处到达前配置",
      "远处到达预判＋选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/Q;timing:far,gate4;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "B": "B",
      "A": "W1",
      "D": "W2",
      "C": "H",
      "F": "W4",
      "G": "E",
      "E": "A"
    },
    "struct": "2处选路、1处留闸、0处到达前配置；远处到达预判＋选闸同时定时",
    "hint": "D、F通向漏口，保持关闭。推荐：E打开 → B打开 → G等危险刚开始时开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/Q;timing:far,gate4;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.704,
      "opened": [
        {
          "id": "E",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "G",
          "t": 6.10416666666664
        },
        {
          "id": "C",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    }
  },
  {
    "id": "L6-8",
    "grade": 6,
    "level": "L6 宗师",
    "name": "两座桥后的远处火",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-8",
      "routeChanged": true
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 120,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 280,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 280,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 840,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 840,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 1020,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 620,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 120,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1110,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            120,
            80
          ],
          [
            120,
            180
          ],
          [
            280,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            280,
            180
          ],
          [
            280,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            280,
            400
          ],
          [
            840,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            840,
            400
          ],
          [
            840,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            840,
            580
          ],
          [
            1020,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            280,
            180
          ],
          [
            620,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            280,
            400
          ],
          [
            280,
            650
          ],
          [
            120,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            840,
            400
          ],
          [
            1110,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": false
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "C"
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "A",
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池",
    "pinRoles": {
      "A": "B",
      "E": "W2",
      "C": "F",
      "B": "E",
      "D": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判",
    "hint": "先配置A、C；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：A打开 → C打开 → D打开 → B等危险刚开始时开。",
    "variant": "stair:C/K/C/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "A",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.004166666666666667
        },
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    }
  },
  {
    "id": "T01-M",
    "grade": 1,
    "level": "L1 基础",
    "name": "教学｜一根销钉｜镜像",
    "mother": "基础操作教学",
    "status": "teaching",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/T01",
      "routeChanged": false,
      "derivedFrom": "T01",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先学会点开销钉；这道是教学，不计正式训练题。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 460,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            460,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸"
    ],
    "intendedDecisions": [
      "普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "A": "A"
    },
    "struct": "普通开闸",
    "hint": "推荐：A打开。",
    "variant": "serial:P",
    "constructionReplay": {
      "status": "win",
      "seconds": 4.138,
      "opened": [
        {
          "id": "A",
          "t": 0.6416666666666656
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    },
    "variantOf": "T01",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "T02-M",
    "grade": 1,
    "level": "L1 基础",
    "name": "教学｜两根销钉｜镜像",
    "mother": "基础操作教学",
    "status": "teaching",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/T02",
      "routeChanged": false,
      "derivedFrom": "T02",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先学会点开销钉；这道是教学，不计正式训练题。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 230,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            230,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸"
    ],
    "intendedDecisions": [
      "普通开闸 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "A": "A",
      "B": "B"
    },
    "struct": "普通开闸 → 普通开闸",
    "hint": "推荐：A打开 → B打开。",
    "variant": "serial:P-P",
    "constructionReplay": {
      "status": "win",
      "seconds": 5.671,
      "opened": [
        {
          "id": "A",
          "t": 0.6416666666666656
        },
        {
          "id": "B",
          "t": 2.7750000000000328
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    },
    "variantOf": "T02",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-1-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "等一次再出发｜镜像",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-1",
      "routeChanged": false,
      "derivedFrom": "L2-1",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 460,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            460,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "A": "A"
    },
    "struct": "近处等安全",
    "hint": "推荐：A等刚安全时开。",
    "variant": "serial:N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.6,
      "opened": [
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L2-1",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-2-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "先过一闸再等｜镜像",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-2",
      "routeChanged": false,
      "derivedFrom": "L2-2",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 230,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            230,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "普通开闸 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-N",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "B": "A",
      "A": "B"
    },
    "struct": "普通开闸 → 近处等安全",
    "hint": "推荐：B打开 → A等刚安全时开。",
    "variant": "serial:P-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9,
      "opened": [
        {
          "id": "B",
          "t": 0.6416666666666656
        },
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L2-2",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-3-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "过危险后再开末闸｜镜像",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-3",
      "routeChanged": false,
      "derivedFrom": "L2-3",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 230,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            230,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-P",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "A": "A",
      "B": "B"
    },
    "struct": "近处等安全 → 普通开闸",
    "hint": "推荐：A等刚安全时开 → B打开。",
    "variant": "serial:N-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.133,
      "opened": [
        {
          "id": "A",
          "t": 6.10416666666664
        },
        {
          "id": "B",
          "t": 8.237499999999853
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L2-3",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-4-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "两段分别等安全｜镜像",
    "mother": "分段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-4",
      "routeChanged": false,
      "derivedFrom": "L2-4",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 360,
        "type": "start"
      },
      "P": {
        "x": 230,
        "y": 360,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            360
          ],
          [
            230,
            360
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 3.5,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "A",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-N",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "B": "A",
      "A": "B"
    },
    "struct": "近处等安全 → 近处等安全",
    "hint": "推荐：B等刚安全时开 → A等刚安全时开。",
    "variant": "serial:N-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.8,
      "opened": [
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8,
        4.8
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L2-4",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-5-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "等待间插入普通闸｜镜像",
    "mother": "分段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-5",
      "routeChanged": false,
      "derivedFrom": "L2-5",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 200,
        "type": "start"
      },
      "P": {
        "x": 180,
        "y": 380,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            200
          ],
          [
            180,
            200
          ],
          [
            180,
            380
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "main",
        "at": 740,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 240,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "main",
        "at": 860,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 3.5,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "B",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "近处等安全 → 普通开闸 → 近处等安全"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:N-P-N",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "C": "A",
      "A": "B",
      "B": "C"
    },
    "struct": "近处等安全 → 普通开闸 → 近处等安全",
    "hint": "推荐：C等刚安全时开 → A打开 → B等刚安全时开。",
    "variant": "serial:N-P-N",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.333,
      "opened": [
        {
          "id": "C",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 8.237499999999853
        },
        {
          "id": "B",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8,
        4.8
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L2-5",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L2-6-M",
    "grade": 2,
    "level": "L2 初阶",
    "name": "在中段等安全｜镜像",
    "mother": "单段等待",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L2-6",
      "routeChanged": false,
      "derivedFrom": "L2-6",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "小鱼停在销钉前是安全的。看准时机，再放行。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 200,
        "type": "start"
      },
      "P": {
        "x": 180,
        "y": 380,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "main",
        "from": "S",
        "to": "P",
        "pts": [
          [
            1080,
            200
          ],
          [
            180,
            200
          ],
          [
            180,
            380
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "main",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "main",
        "at": 440,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "main",
        "at": 740,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "main",
        "at": 560,
        "safe": 4.8,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {},
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "局部安全时机"
    ],
    "intendedDecisions": [
      "普通开闸 → 近处等安全 → 普通开闸"
    ],
    "start": {
      "edge": "main",
      "s": 0
    },
    "taskPattern": "serial:P-N-P",
    "presentationVariant": "串行骨架；左右镜像",
    "pinRoles": {
      "C": "A",
      "B": "B",
      "A": "C"
    },
    "struct": "普通开闸 → 近处等安全 → 普通开闸",
    "hint": "推荐：C打开 → B等刚安全时开 → A打开。",
    "variant": "serial:P-N-P",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.533,
      "opened": [
        {
          "id": "C",
          "t": 0.6416666666666656
        },
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "A",
          "t": 8.104166666666528
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        4.8
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L2-6",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L3-1-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "留闸后等安全｜镜像",
    "mother": "留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-1",
      "routeChanged": false,
      "derivedFrom": "L3-1",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "W2",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "A通向漏口，保持关闭。推荐：B打开 → C等刚安全时开。",
    "variant": "stair:-/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.396,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-1",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-2-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "选闸就是放行｜镜像",
    "mother": "选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-2",
      "routeChanged": false,
      "derivedFrom": "L3-2",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 160,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、0处留闸、0处到达前配置",
      "选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/Q/-/-;timing:gate2;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "D",
      "C": "W2",
      "A": "A"
    },
    "struct": "1处选路、0处留闸、0处到达前配置；选闸同时定时",
    "hint": "C通向漏口，保持关闭。推荐：A打开 → B等刚安全时开。",
    "variant": "stair:-/Q/-/-;timing:gate2;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.033,
      "opened": [
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-2",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-3-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "先选路再留闸｜镜像",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-3",
      "routeChanged": false,
      "derivedFrom": "L3-3",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "E",
          "correctPin": "C",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "C": "B",
      "E": "W1",
      "A": "W2",
      "B": "E",
      "D": "A"
    },
    "struct": "1处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "A通向漏口，保持关闭。推荐：D打开 → C打开 → B等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.329,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 1.7374999999999952
        },
        {
          "id": "B",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-3",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-4-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "留闸后再选路｜镜像",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-4",
      "routeChanged": false,
      "derivedFrom": "L3-4",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "wrong3",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "B",
          "correctPin": "A",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/Q/-;timing:home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "E": "W2",
      "A": "F",
      "B": "W3",
      "C": "G",
      "D": "A"
    },
    "struct": "1处选路、1处留闸、0处到达前配置；分段等安全",
    "hint": "E通向漏口，保持关闭。推荐：D打开 → A打开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:-/K/Q/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.833,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.937499999999926
        },
        {
          "id": "C",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-4",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-5-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "连续两处分路｜镜像",
    "mother": "选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-5",
      "routeChanged": false,
      "derivedFrom": "L3-5",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "F",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、0处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "F": "W1",
      "D": "D",
      "E": "W2",
      "C": "E",
      "A": "A"
    },
    "struct": "2处选路、0处留闸、0处到达前配置；分段等安全",
    "hint": "E通向漏口，保持关闭。推荐：A打开 → B打开 → D打开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.396,
      "opened": [
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "D",
          "t": 3.204166666666721
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-5",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-6-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "两处漏口都要留住｜镜像",
    "mother": "留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-6",
      "routeChanged": false,
      "derivedFrom": "L3-6",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 920,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            920,
            580
          ],
          [
            920,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A",
        "D"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、0处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/K;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "W2",
      "D": "W4",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、2处留闸、0处到达前配置；分段等安全",
    "hint": "A、D通向漏口，保持关闭。推荐：B打开 → C等刚安全时开。",
    "variant": "stair:-/K/-/K;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.329,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 4.900000000000042
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-6",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-7-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "末端选闸看时机｜镜像",
    "mother": "选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-7",
      "routeChanged": false,
      "derivedFrom": "L3-7",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 360,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            360,
            580
          ],
          [
            360,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "home",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 3.6,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "F",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、1处留闸、0处到达前配置",
      "选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/Q;timing:gate4;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "F": "W1",
      "D": "W2",
      "A": "H",
      "C": "W4",
      "E": "A"
    },
    "struct": "2处选路、1处留闸、0处到达前配置；选闸同时定时",
    "hint": "D、C通向漏口，保持关闭。推荐：E打开 → B打开 → A等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/Q;timing:gate4;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.104,
      "opened": [
        {
          "id": "E",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "A",
          "t": 10.904166666666368
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        3.6
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L3-7",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L3-8-M",
    "grade": 3,
    "level": "L3 中阶",
    "name": "三次路线判断｜镜像",
    "mother": "选路",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L3-8",
      "routeChanged": false,
      "derivedFrom": "L3-8",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong3",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "G",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "G",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "F"
      ],
      "configure": [],
      "timing": [],
      "wrongChoice": [
        {
          "pin": "C",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        },
        {
          "pin": "E",
          "correctPin": "A",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "开闸"
    ],
    "intendedDecisions": [
      "3处选路、0处留闸、0处到达前配置"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/Q/-;timing:-;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "C": "W1",
      "D": "D",
      "F": "W2",
      "A": "F",
      "E": "W3",
      "G": "A"
    },
    "struct": "3处选路、0处留闸、0处到达前配置",
    "hint": "F通向漏口，保持关闭。推荐：G打开 → B打开 → D打开 → A打开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/Q/-;timing:-;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "G",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "D",
          "t": 3.204166666666721
        },
        {
          "id": "A",
          "t": 6.937499999999926
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [],
      "danger": []
    },
    "variantOf": "L3-8",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-1-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先配路再等安全｜镜像",
    "mother": "配置＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-1",
      "routeChanged": false,
      "derivedFrom": "L4-1",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像",
    "pinRoles": {
      "B": "B",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、0处留闸、1处到达前配置；分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。推荐：B打开 → C打开 → A等刚安全时开。",
    "variant": "stair:C/-/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.337,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-1",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L4-2-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "配置与留闸｜镜像",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-2",
      "routeChanged": false,
      "derivedFrom": "L4-2",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/-/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "D": "W2",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、1处留闸、1处到达前配置；分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：B打开 → C打开 → A等刚安全时开。",
    "variant": "stair:C/K/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-2",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-3-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先留闸后配下游｜镜像",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-3",
      "routeChanged": false,
      "derivedFrom": "L4-3",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/C/-;timing:home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "W2",
      "C": "F",
      "B": "G",
      "D": "A"
    },
    "struct": "0处选路、1处留闸、1处到达前配置；分段等安全",
    "hint": "先配置C；也可在鱼到对应岔口前补开。A通向漏口，保持关闭。推荐：C打开 → D打开 → B等刚安全时开。",
    "variant": "stair:-/K/C/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.433,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 8.504166666666505
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-3",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-4-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "配置后选支路｜镜像",
    "mother": "配置＋选路＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-4",
      "routeChanged": false,
      "derivedFrom": "L4-4",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "D",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、0处留闸、1处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/Q/-/-;timing:middle;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "B",
      "C": "D",
      "E": "W2",
      "D": "E",
      "B": "A"
    },
    "struct": "1处选路、0处留闸、1处到达前配置；分段等安全",
    "hint": "先配置A；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：A打开 → B打开 → C打开 → D等刚安全时开。",
    "variant": "stair:C/Q/-/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.342,
      "opened": [
        {
          "id": "A",
          "t": 0
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 3.204166666666721
        },
        {
          "id": "D",
          "t": 3.8458333333334194
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-4",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-5-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两处提前配置｜镜像",
    "mother": "配置＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-5",
      "routeChanged": false,
      "derivedFrom": "L4-5",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "D"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "C",
        "D"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、2处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/C/-;timing:middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像",
    "pinRoles": {
      "C": "B",
      "D": "F",
      "A": "E",
      "B": "A"
    },
    "struct": "0处选路、0处留闸、2处到达前配置；分段等安全",
    "hint": "先配置C、D；也可在鱼到对应岔口前补开。推荐：C打开 → D打开 → B打开 → A等刚安全时开。",
    "variant": "stair:C/-/C/-;timing:middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 10.271,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "D",
          "t": 0.004166666666666667
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 3.8416666666667525
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-5",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L4-6-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两次配置间留闸｜镜像",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-6",
      "routeChanged": false,
      "derivedFrom": "L4-6",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            360,
            400
          ],
          [
            140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "C",
        "A"
      ],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "C": "B",
      "D": "W2",
      "A": "F",
      "E": "G",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；分段等安全",
    "hint": "先配置C、A；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：C打开 → A打开 → B打开 → E等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.5,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "A",
          "t": 0.004166666666666667
        },
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "E",
          "t": 8.504166666666505
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L4-6",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-7-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "两处配置分段等待｜镜像",
    "mother": "配置＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-7",
      "routeChanged": false,
      "derivedFrom": "L4-7",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 140,
        "y": 400,
        "type": "trap"
      },
      "T4": {
        "x": 360,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            360,
            400
          ],
          [
            140,
            400
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            360,
            580
          ],
          [
            360,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "G",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      },
      {
        "id": "E",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "F",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "G"
      },
      {
        "pin": "C"
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "A"
      ],
      "configure": [
        "G",
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "E",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、2处到达前配置",
      "分段等安全＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/K;timing:middle,home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "G": "B",
      "D": "W2",
      "C": "F",
      "A": "W4",
      "B": "E",
      "E": "G",
      "F": "A"
    },
    "struct": "0处选路、2处留闸、2处到达前配置；分段等安全＋分段等安全",
    "hint": "先配置G、C；也可在鱼到对应岔口前补开。D、A通向漏口，保持关闭。推荐：G打开 → C打开 → F打开 → B等刚安全时开 → E等刚安全时开。",
    "variant": "stair:C/K/C/K;timing:middle,home;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 9.337,
      "opened": [
        {
          "id": "G",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.004166666666666667
        },
        {
          "id": "F",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 3.8416666666667525
        },
        {
          "id": "E",
          "t": 8.341666666666514
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L4-7",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L4-8-M",
    "grade": 4,
    "level": "L4 高阶",
    "name": "先等再选再等待｜镜像",
    "mother": "配置＋选路＋留闸＋局部时机",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L4-8",
      "routeChanged": false,
      "derivedFrom": "L4-8",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 920,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            920,
            580
          ],
          [
            920,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      },
      {
        "id": "E",
        "edge": "middle",
        "at": 120,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 220,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "middle",
        "at": 280,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "C"
      ],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        },
        {
          "pin": "E",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "1处选路、1处留闸、1处到达前配置",
      "分段等安全＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/Q/-/K;timing:in,middle;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "F": "D",
      "D": "W2",
      "C": "W4",
      "A": "A",
      "E": "E"
    },
    "struct": "1处选路、1处留闸、1处到达前配置；分段等安全＋分段等安全",
    "hint": "先配置B；也可在鱼到对应岔口前补开。D、C通向漏口，保持关闭。推荐：B打开 → A等刚安全时开 → F打开 → E等刚安全时开。",
    "variant": "stair:C/Q/-/K;timing:in,middle;bridges:0",
    "reviewFlags": [
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.133,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "A",
          "t": 3.700000000000079
        },
        {
          "id": "F",
          "t": 5.92916666666665
        },
        {
          "id": "E",
          "t": 7.704166666666549
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L4-8",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L5-1-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先看下层再开闸｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 700,
        "y": 680,
        "type": "pool"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ],
          [
            700,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "D",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "G",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "F",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [],
      "timing": [
        {
          "pin": "F",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "G",
          "correctPin": "D",
          "semantics": "alone-fails; with-correct-open-legal"
        },
        {
          "pin": "C",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-1",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "D": "B",
      "G": "C",
      "B": "D",
      "C": "E",
      "A": "F",
      "E": "G",
      "F": "A"
    },
    "mother": "两层追踪＋入口时机",
    "taskPattern": "tree2:goal=down/down;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/down;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。推荐：F等刚安全时开 → D打开 → B打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end0",
      "directions": [
        "down",
        "down"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    },
    "variantOf": "L5-1",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-2-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "下路后面要转弯｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "pool"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "G",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "G",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "F"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "E",
          "correctPin": "G",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-2",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "G": "B",
      "E": "C",
      "F": "D",
      "D": "E",
      "C": "F",
      "B": "G",
      "A": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=down/flat;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/flat;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。F保持关闭。推荐：A等刚安全时开 → G打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end1",
      "directions": [
        "down",
        "flat"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    },
    "variantOf": "L5-2",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-3-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "平路后面再向下｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 200,
        "y": 680,
        "type": "pool"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ],
          [
            200,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "G",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "B"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "G",
          "correctPin": "D",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-3",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "B": "B",
      "E": "C",
      "F": "D",
      "A": "E",
      "D": "F",
      "G": "G",
      "C": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/down;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/down;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。B保持关闭。推荐：C等刚安全时开 → E打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end2",
      "directions": [
        "flat",
        "down"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    },
    "variantOf": "L5-3",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-4-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "两次平路才到池｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "right",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "G",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      },
      {
        "pin": "D",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "A",
        "G"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-4",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "A": "B",
      "F": "C",
      "C": "D",
      "B": "E",
      "G": "F",
      "D": "G",
      "E": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/flat;root=Q;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/flat;root=Q;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。A、G保持关闭。推荐：E等刚安全时开 → F打开 → D打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end3",
      "directions": [
        "flat",
        "flat"
      ],
      "rootMode": "Q",
      "childMode": "Q"
    },
    "variantOf": "L5-4",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-5-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "配好入口再选下层｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 700,
        "y": 680,
        "type": "pool"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ],
          [
            700,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "C",
          "correctPin": "F",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-5",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "A": "B",
      "F": "D",
      "C": "E",
      "D": "F",
      "E": "G",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋入口时机",
    "taskPattern": "tree2:goal=down/down;root=C;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=down/down;root=C;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好A。推荐：A打开 → B等刚安全时开 → F打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end0",
      "directions": [
        "down",
        "down"
      ],
      "rootMode": "C",
      "childMode": "Q"
    },
    "variantOf": "L5-5",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-6-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先配路再留住漏口｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "pool"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "A"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-6",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "A": "B",
      "D": "D",
      "C": "F",
      "E": "G",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋留闸＋入口时机",
    "taskPattern": "tree2:goal=down/flat;root=C;child=K;timings=shared-inlet",
    "variant": "tree2:goal=down/flat;root=C;child=K;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：向下→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：向下→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好A。D保持关闭。推荐：A打开 → B等刚安全时开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "L"
      ],
      "wrongSubtree": "U",
      "goalNode": "end1",
      "directions": [
        "down",
        "flat"
      ],
      "rootMode": "C",
      "childMode": "K"
    },
    "variantOf": "L5-6",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-7-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "留住近路配远路｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 200,
        "y": 680,
        "type": "pool"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ],
          [
            200,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "E",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机",
      "下游配置"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-7",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "E": "B",
      "D": "D",
      "A": "E",
      "C": "F",
      "B": "A"
    },
    "mother": "两层追踪＋配置＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/down;root=K;child=C;timings=shared-inlet",
    "variant": "tree2:goal=flat/down;root=K;child=C;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→向下",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→向下；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。先配好C。E保持关闭。推荐：C打开 → B等刚安全时开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end2",
      "directions": [
        "flat",
        "down"
      ],
      "rootMode": "K",
      "childMode": "C"
    },
    "variantOf": "L5-7",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L5-8-M",
    "grade": 5,
    "level": "L5 超凡",
    "name": "先排除再选末路｜镜像",
    "status": "candidate",
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "先看清哪条路通水池，再开销钉。",
    "nodes": {
      "S": {
        "x": 1140,
        "y": 80,
        "type": "start"
      },
      "R": {
        "x": 880,
        "y": 220,
        "type": "fork"
      },
      "L": {
        "x": 880,
        "y": 460,
        "type": "fork"
      },
      "U": {
        "x": 400,
        "y": 220,
        "type": "fork"
      },
      "end0": {
        "x": 880,
        "y": 680,
        "type": "trap"
      },
      "end1": {
        "x": 640,
        "y": 460,
        "type": "trap"
      },
      "end2": {
        "x": 400,
        "y": 680,
        "type": "trap"
      },
      "end3": {
        "x": 160,
        "y": 220,
        "type": "pool"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "R",
        "pts": [
          [
            1140,
            80
          ],
          [
            1140,
            220
          ],
          [
            880,
            220
          ]
        ]
      },
      {
        "id": "left",
        "from": "R",
        "to": "L",
        "pts": [
          [
            880,
            220
          ],
          [
            880,
            460
          ]
        ]
      },
      {
        "id": "right",
        "from": "R",
        "to": "U",
        "pts": [
          [
            880,
            220
          ],
          [
            400,
            220
          ]
        ]
      },
      {
        "id": "ld",
        "from": "L",
        "to": "end0",
        "pts": [
          [
            880,
            460
          ],
          [
            880,
            680
          ]
        ]
      },
      {
        "id": "lh",
        "from": "L",
        "to": "end1",
        "pts": [
          [
            880,
            460
          ],
          [
            640,
            460
          ]
        ]
      },
      {
        "id": "rd",
        "from": "U",
        "to": "end2",
        "pts": [
          [
            400,
            220
          ],
          [
            400,
            680
          ]
        ]
      },
      {
        "id": "rh",
        "from": "U",
        "to": "end3",
        "pts": [
          [
            400,
            220
          ],
          [
            160,
            220
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "left",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "ld",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "lh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "C",
        "edge": "rd",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "rh",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "in",
        "at": 220,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "in",
        "at": 300,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "R": [
        "left",
        "right"
      ],
      "L": [
        "ld",
        "lh"
      ],
      "U": [
        "rd",
        "rh"
      ]
    },
    "cross": [],
    "bridges": [],
    "start": {
      "edge": "in",
      "s": 0
    },
    "solution": [
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          0,
          0.7
        ]
      },
      {
        "pin": "F",
        "wait": true
      }
    ],
    "checks": {
      "keep": [
        "B",
        "C"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "开闸",
      "选路与留闸",
      "两层岔路追踪",
      "局部安全时机"
    ],
    "source": {
      "kind": "r05-two-depth-tree",
      "reference": "r04-fixed-engine",
      "derivedFrom": "L5-8",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "reviewFlags": [
      "两层岔路增量待体验确认",
      "未验证老人完成率",
      "未完成120秒训练局",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "pinRoles": {
      "B": "B",
      "A": "D",
      "D": "E",
      "C": "F",
      "F": "G",
      "E": "A"
    },
    "mother": "两层追踪＋留闸＋入口时机",
    "taskPattern": "tree2:goal=flat/flat;root=K;child=Q;timings=shared-inlet",
    "variant": "tree2:goal=flat/flat;root=K;child=Q;timings=shared-inlet",
    "presentationVariant": "无交叉两层树形分路；左右镜像",
    "intendedDecisions": [
      "第一岔口两边都先到下一层岔口，需追踪至水池",
      "正确路线两次方向：平路→平路",
      "先在公共入口等安全，危险位置不提示正确支路"
    ],
    "struct": "第一岔口两边都先到下一层岔口，需追踪至水池；正确路线两次方向：平路→平路；先在公共入口等安全，危险位置不提示正确支路",
    "hint": "先从水池往回看，确认两层岔路。B、C保持关闭。推荐：E等刚安全时开 → F打开。",
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "depthEvidence": {
      "root": "R",
      "choiceNodes": [
        "R",
        "U"
      ],
      "wrongSubtree": "L",
      "goalNode": "end3",
      "directions": [
        "flat",
        "flat"
      ],
      "rootMode": "K",
      "childMode": "Q"
    },
    "variantOf": "L5-8",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L6-1-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "配置后预判远火｜镜像",
    "mother": "配置＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-1",
      "routeChanged": false,
      "derivedFrom": "L6-1",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [],
      "configure": [
        "B"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、0处留闸、1处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/-/-/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像",
    "pinRoles": {
      "B": "B",
      "A": "E",
      "C": "A"
    },
    "struct": "0处选路、0处留闸、1处到达前配置；远处到达预判",
    "hint": "先配置B；也可在鱼到对应岔口前补开。推荐：B打开 → C打开 → A等危险刚开始时开。",
    "variant": "stair:C/-/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L6-1",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x"
    ]
  },
  {
    "id": "L6-2-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "留闸再看远处｜镜像",
    "mother": "留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-2",
      "routeChanged": false,
      "derivedFrom": "L6-2",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "B",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "A"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "C",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、0处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:-/K/-/-;timing:far;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "W2",
      "C": "E",
      "B": "A"
    },
    "struct": "0处选路、1处留闸、0处到达前配置；远处到达预判",
    "hint": "A通向漏口，保持关闭。推荐：B打开 → C等危险刚开始时开。",
    "variant": "stair:-/K/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 12.667,
      "opened": [
        {
          "id": "B",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L6-2",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-3-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "连续选路后预判｜镜像",
    "mother": "选路＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-3",
      "routeChanged": false,
      "derivedFrom": "L6-3",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "F",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "F",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": [
        {
          "pin": "B",
          "correctPin": "C",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、0处留闸、0处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/Q/-/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "C": "B",
      "B": "W1",
      "A": "D",
      "E": "W2",
      "F": "E",
      "D": "A"
    },
    "struct": "2处选路、0处留闸、0处到达前配置；远处到达预判",
    "hint": "E通向漏口，保持关闭。推荐：D打开 → C打开 → A打开 → F等危险刚开始时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/Q/-/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "C",
          "t": 1.7374999999999952
        },
        {
          "id": "A",
          "t": 3.204166666666721
        },
        {
          "id": "F",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L6-3",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-4-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "远火之后等近齿轮｜镜像",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-4",
      "routeChanged": false,
      "derivedFrom": "L6-4",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "C",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "F"
      },
      {
        "pin": "C",
        "wait": true
      },
      {
        "pin": "A",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "D",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "B",
        "F"
      ],
      "timing": [
        {
          "pin": "A",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "D",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:far,home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "E": "W2",
      "F": "F",
      "A": "E",
      "D": "G",
      "C": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置B、F；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：B打开 → F打开 → C打开 → A等危险刚开始时开 → D等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:far,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.433,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "F",
          "t": 0.004166666666666667
        },
        {
          "id": "C",
          "t": 0.9749999999999978
        },
        {
          "id": "A",
          "t": 6.10416666666664
        },
        {
          "id": "D",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L6-4",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-5-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "近远混合｜镜像",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-5",
      "routeChanged": true,
      "derivedFrom": "L6-5",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 140,
        "y": 400,
        "type": "trap"
      },
      "T4": {
        "x": 360,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            360,
            400
          ],
          [
            140,
            400
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            360,
            580
          ],
          [
            360,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "C",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "G",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "C"
      },
      {
        "pin": "E"
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "G",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "F"
      ],
      "configure": [
        "C",
        "E"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "G",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、2处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/K;timing:far,home;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "C": "B",
      "D": "W2",
      "E": "F",
      "F": "W4",
      "B": "E",
      "G": "G",
      "A": "A"
    },
    "struct": "0处选路、2处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置C、E；也可在鱼到对应岔口前补开。D、F通向漏口，保持关闭。推荐：C打开 → E打开 → A打开 → B等危险刚开始时开 → G等刚安全时开。",
    "variant": "stair:C/K/C/K;timing:far,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.5,
      "opened": [
        {
          "id": "C",
          "t": 0
        },
        {
          "id": "E",
          "t": 0.004166666666666667
        },
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 6.10416666666664
        },
        {
          "id": "G",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L6-5",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-6-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "跨岔口预测到达｜镜像",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-6",
      "routeChanged": true,
      "derivedFrom": "L6-6",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 200,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 360,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 920,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 600,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 700,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 200,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 1140,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            200,
            80
          ],
          [
            200,
            180
          ],
          [
            360,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            360,
            180
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            360,
            400
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            920,
            400
          ],
          [
            920,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            920,
            580
          ],
          [
            600,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            360,
            180
          ],
          [
            700,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            360,
            400
          ],
          [
            200,
            400
          ],
          [
            200,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            920,
            400
          ],
          [
            1140,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "F",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "down1",
        "at": 85,
        "gate": false,
        "flip": false
      },
      {
        "id": "C",
        "edge": "home",
        "at": 55,
        "gate": false,
        "flip": false
      },
      {
        "id": "A",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": true
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 260,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "B"
      },
      {
        "pin": "F"
      },
      {
        "pin": "A",
        "wait": true
      },
      {
        "pin": "E",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D"
      ],
      "configure": [
        "B",
        "F"
      ],
      "timing": [
        {
          "pin": "E",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "C",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判＋分段等安全"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:farConfig,home;bridges:0",
    "presentationVariant": "折返骨架：下→左→下→右，中央水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "D": "W2",
      "F": "F",
      "E": "C",
      "C": "G",
      "A": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判＋分段等安全",
    "hint": "先配置B、F；也可在鱼到对应岔口前补开。D通向漏口，保持关闭。推荐：B打开 → F打开 → A打开 → E等危险刚开始时开 → C等刚安全时开。",
    "variant": "stair:C/K/C/-;timing:farConfig,home;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 14.433,
      "opened": [
        {
          "id": "B",
          "t": 0
        },
        {
          "id": "F",
          "t": 0.004166666666666667
        },
        {
          "id": "A",
          "t": 0.9749999999999978
        },
        {
          "id": "E",
          "t": 6.10416666666664
        },
        {
          "id": "C",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L6-6",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-7-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "路线远火后再选闸｜镜像",
    "mother": "选路＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-7",
      "routeChanged": true,
      "derivedFrom": "L6-7",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T4": {
        "x": 360,
        "y": 660,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong4",
        "from": "F4",
        "to": "T4",
        "pts": [
          [
            360,
            580
          ],
          [
            360,
            660
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "B",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "A",
        "edge": "wrong1",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "D",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "home",
        "at": 32,
        "gate": true,
        "flip": false
      },
      {
        "id": "F",
        "edge": "wrong4",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "G",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "E",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      },
      {
        "id": "H2",
        "type": "gear",
        "edge": "home",
        "at": 115,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.9000000000000001,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F4": [
        "wrong4",
        "home"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "E",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true
      },
      {
        "pin": "G",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      },
      {
        "pin": "C",
        "wait": true,
        "phase": [
          1,
          0,
          0.7
        ]
      }
    ],
    "checks": {
      "keep": [
        "D",
        "F"
      ],
      "configure": [],
      "timing": [
        {
          "pin": "G",
          "hazard": 0,
          "expected": "far"
        },
        {
          "pin": "C",
          "hazard": 1,
          "expected": "near"
        }
      ],
      "wrongChoice": [
        {
          "pin": "A",
          "correctPin": "B",
          "semantics": "alone-fails; with-correct-open-legal"
        }
      ]
    },
    "dimensions": [
      "选路与留闸",
      "到达预判",
      "局部安全时机",
      "开闸"
    ],
    "intendedDecisions": [
      "2处选路、1处留闸、0处到达前配置",
      "远处到达预判＋选闸同时定时"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:Q/K/-/Q;timing:far,gate4;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "B": "B",
      "A": "W1",
      "D": "W2",
      "C": "H",
      "F": "W4",
      "G": "E",
      "E": "A"
    },
    "struct": "2处选路、1处留闸、0处到达前配置；远处到达预判＋选闸同时定时",
    "hint": "D、F通向漏口，保持关闭。推荐：E打开 → B打开 → G等危险刚开始时开 → C等刚安全时开。侧向错口单独开放会漏走；正确下行口已开放时，同时打开侧口也是合法解，不必多开。",
    "variant": "stair:Q/K/-/Q;timing:far,gate4;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 13.704,
      "opened": [
        {
          "id": "E",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 1.7374999999999952
        },
        {
          "id": "G",
          "t": 6.10416666666664
        },
        {
          "id": "C",
          "t": 12.504166666666277
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4,
        2.4
      ],
      "danger": [
        2.4,
        2.4
      ]
    },
    "variantOf": "L6-7",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  },
  {
    "id": "L6-8-M",
    "grade": 6,
    "level": "L6 宗师",
    "name": "两座桥后的远处火｜镜像",
    "mother": "配置＋留闸＋到达预判",
    "status": "candidate",
    "source": {
      "kind": "r04-no-crossing",
      "reference": "r03/L6-8",
      "routeChanged": true,
      "derivedFrom": "L6-8",
      "transform": "reflect-x",
      "baseBankHash": "be628df1f7c1e4cd6800e2e8e8475aff27faca3f5cc7c83aa487349afc4eb6d9"
    },
    "canvas": {
      "width": 1200,
      "height": 800
    },
    "goal": "看清通路和机关，把小鱼送进水池。",
    "nodes": {
      "S": {
        "x": 1080,
        "y": 80,
        "type": "start"
      },
      "F1": {
        "x": 920,
        "y": 180,
        "type": "fork"
      },
      "F2": {
        "x": 920,
        "y": 400,
        "type": "fork"
      },
      "F3": {
        "x": 360,
        "y": 400,
        "type": "fork"
      },
      "F4": {
        "x": 360,
        "y": 580,
        "type": "fork"
      },
      "P": {
        "x": 180,
        "y": 580,
        "type": "pool"
      },
      "T1": {
        "x": 580,
        "y": 180,
        "type": "trap"
      },
      "T2": {
        "x": 1080,
        "y": 650,
        "type": "trap"
      },
      "T3": {
        "x": 90,
        "y": 400,
        "type": "trap"
      }
    },
    "edges": [
      {
        "id": "in",
        "from": "S",
        "to": "F1",
        "pts": [
          [
            1080,
            80
          ],
          [
            1080,
            180
          ],
          [
            920,
            180
          ]
        ]
      },
      {
        "id": "down1",
        "from": "F1",
        "to": "F2",
        "pts": [
          [
            920,
            180
          ],
          [
            920,
            400
          ]
        ]
      },
      {
        "id": "middle",
        "from": "F2",
        "to": "F3",
        "pts": [
          [
            920,
            400
          ],
          [
            360,
            400
          ]
        ]
      },
      {
        "id": "down2",
        "from": "F3",
        "to": "F4",
        "pts": [
          [
            360,
            400
          ],
          [
            360,
            580
          ]
        ]
      },
      {
        "id": "home",
        "from": "F4",
        "to": "P",
        "pts": [
          [
            360,
            580
          ],
          [
            180,
            580
          ]
        ]
      },
      {
        "id": "wrong1",
        "from": "F1",
        "to": "T1",
        "pts": [
          [
            920,
            180
          ],
          [
            580,
            180
          ]
        ]
      },
      {
        "id": "wrong2",
        "from": "F2",
        "to": "T2",
        "pts": [
          [
            920,
            400
          ],
          [
            1080,
            400
          ],
          [
            1080,
            650
          ]
        ]
      },
      {
        "id": "wrong3",
        "from": "F3",
        "to": "T3",
        "pts": [
          [
            360,
            400
          ],
          [
            90,
            400
          ]
        ]
      }
    ],
    "pins": [
      {
        "id": "A",
        "edge": "down1",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "E",
        "edge": "wrong2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "C",
        "edge": "down2",
        "at": 32,
        "gate": true,
        "flip": true
      },
      {
        "id": "B",
        "edge": "middle",
        "at": 100,
        "gate": false,
        "flip": true
      },
      {
        "id": "D",
        "edge": "in",
        "at": 170,
        "gate": false,
        "flip": false
      }
    ],
    "hazards": [
      {
        "id": "H1",
        "type": "fire",
        "edge": "middle",
        "at": 490,
        "safe": 2.4,
        "danger": 2.4,
        "offset": 1.1,
        "flip": true
      }
    ],
    "outOrder": {
      "F1": [
        "down1",
        "wrong1"
      ],
      "F2": [
        "wrong2",
        "middle"
      ],
      "F3": [
        "down2",
        "wrong3"
      ]
    },
    "cross": [],
    "bridges": [],
    "solution": [
      {
        "pin": "A"
      },
      {
        "pin": "C"
      },
      {
        "pin": "D",
        "wait": true
      },
      {
        "pin": "B",
        "wait": true,
        "phase": [
          0,
          2.4,
          3.05
        ]
      }
    ],
    "checks": {
      "keep": [
        "E"
      ],
      "configure": [
        "A",
        "C"
      ],
      "timing": [
        {
          "pin": "B",
          "hazard": 0,
          "expected": "far"
        }
      ],
      "wrongChoice": []
    },
    "dimensions": [
      "下游配置",
      "选路与留闸",
      "到达预判",
      "开闸"
    ],
    "intendedDecisions": [
      "0处选路、1处留闸、2处到达前配置",
      "远处到达预判"
    ],
    "start": {
      "edge": "in",
      "s": 0
    },
    "taskPattern": "stair:C/K/C/-;timing:far;bridges:0",
    "presentationVariant": "阶梯骨架：下→右→下→右，右侧水池；左右镜像；漏口支路改走另一侧拐弯",
    "pinRoles": {
      "A": "B",
      "E": "W2",
      "C": "F",
      "B": "E",
      "D": "A"
    },
    "struct": "0处选路、1处留闸、2处到达前配置；远处到达预判",
    "hint": "先配置A、C；也可在鱼到对应岔口前补开。E通向漏口，保持关闭。推荐：A打开 → C打开 → D打开 → B等危险刚开始时开。",
    "variant": "stair:C/K/C/-;timing:far;bridges:0",
    "reviewFlags": [
      "危险态提前放行为候选边界",
      "未验证老人完成率",
      "未完成120秒训练局",
      "取消跨线桥后保留原候选等级，整体梯度待重排",
      "镜像是同母题版图变体，不作为新母题计数"
    ],
    "constructionReplay": {
      "status": "win",
      "seconds": 11.733,
      "opened": [
        {
          "id": "A",
          "t": 0
        },
        {
          "id": "C",
          "t": 0.004166666666666667
        },
        {
          "id": "D",
          "t": 0.9749999999999978
        },
        {
          "id": "B",
          "t": 6.10416666666664
        }
      ],
      "fail": null
    },
    "parameters": {
      "speed": 150,
      "hazardHalf": 26,
      "stopGap": 24,
      "gateAt": 32,
      "safe": [
        2.4
      ],
      "danger": [
        2.4
      ]
    },
    "variantOf": "L6-8",
    "variantKind": "mirror-layout",
    "layoutChanges": [
      "mirror-x",
      "wrong-branch-elbow"
    ]
  }
];if(typeof module!=="undefined"&&module.exports)module.exports=levels;else root.FISH_LEVELS=levels;})(typeof window!=="undefined"?window:globalThis);
