window.CUT_FILL_TEMPLATE_CATALOG = {
  "schemaVersion": "cut-fill-runtime-template-catalog-v0.2",
  "catalogVersion": "cut-fill-catalog-candidate-v0.3",
  "sourceSchemaVersion": "cut-fill-mother-template-v0.2",
  "sourceTemplateCount": 27,
  "retiredTemplateCount": 3,
  "templateCount": 24,
  "levelTemplateCounts": {
    "L1": 3,
    "L2": 3,
    "L3": 3,
    "L4": 5,
    "L5": 5,
    "L6": 5
  },
  "structuralInstanceCounts": {
    "L1": 5,
    "L2": 55,
    "L3": 10,
    "L4": 45,
    "L5": 2717,
    "L6": 43523
  },
  "orientedDisplayInstanceCounts": {
    "L1": 5,
    "L2": 55,
    "L3": 40,
    "L4": 90,
    "L5": 2717,
    "L6": 43523
  },
  "templates": [
    {
      "id": "FT-L1-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L1",
      "size": 3,
      "car": [
        2,
        1
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            2
          ],
          "pit": [
            2,
            2
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          1
        ]
      ],
      "optionalWallPool": [],
      "optionalWallCount": {
        "min": 0,
        "max": 0
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                1
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ]
              ],
              "full_route": [
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ]
              ],
              "car_after": [
                1,
                2
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L1-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L1",
      "size": 3,
      "car": [
        1,
        0
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            2
          ],
          "pit": [
            0,
            2
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          1
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          0,
          1
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 1
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                1,
                0
              ],
              "entry": [
                2,
                2
              ],
              "approach_route": [
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  2
                ]
              ],
              "push_cells": [
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ]
              ],
              "full_route": [
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ]
              ],
              "car_after": [
                1,
                2
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L1-PILOT-03-BND",
      "revision": 1,
      "difficulty": "L1",
      "size": 3,
      "car": [
        2,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            1
          ],
          "pit": [
            0,
            2
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          2,
          0
        ]
      ],
      "optionalWallPool": [],
      "optionalWallCount": {
        "min": 0,
        "max": 0
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                2
              ],
              "entry": [
                0,
                0
              ],
              "approach_route": [
                [
                  2,
                  2
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ]
              ],
              "full_route": [
                [
                  2,
                  2
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ]
              ],
              "car_after": [
                0,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L2-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L2",
      "size": 4,
      "car": [
        0,
        1
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            1
          ],
          "pit": [
            1,
            1
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          2,
          0
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          1,
          0
        ],
        [
          3,
          0
        ],
        [
          3,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                1
              ],
              "entry": [
                3,
                1
              ],
              "approach_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ]
              ],
              "push_cells": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "full_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "car_after": [
                2,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L2-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L2",
      "size": 4,
      "car": [
        0,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            3,
            1
          ],
          "pit": [
            3,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          2,
          2
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          0,
          1
        ],
        [
          1,
          0
        ],
        [
          1,
          1
        ],
        [
          2,
          0
        ],
        [
          2,
          1
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                2
              ],
              "entry": [
                3,
                2
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ]
              ],
              "push_cells": [
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ]
              ],
              "car_after": [
                3,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L2-PILOT-03-BND",
      "revision": 1,
      "difficulty": "L2",
      "size": 4,
      "car": [
        2,
        0
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            3
          ],
          "pit": [
            2,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          0
        ],
        [
          1,
          2
        ]
      ],
      "optionalWallPool": [
        [
          2,
          1
        ],
        [
          2,
          2
        ],
        [
          3,
          0
        ],
        [
          3,
          1
        ],
        [
          3,
          2
        ],
        [
          3,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A"
          ],
          "sequence_key": "A",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                0
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "car_after": [
                1,
                3
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L3-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L3",
      "size": 4,
      "car": [
        2,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            1
          ],
          "pit": [
            1,
            1
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            0,
            2
          ],
          "pit": [
            0,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          3,
          3
        ]
      ],
      "optionalWallPool": [
        [
          1,
          3
        ],
        [
          2,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ],
        [
          "B",
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                2
              ],
              "entry": [
                3,
                1
              ],
              "approach_route": [
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ]
              ],
              "push_cells": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "full_route": [
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "car_after": [
                2,
                1
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                1
              ],
              "entry": [
                0,
                1
              ],
              "approach_route": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "car_after": [
                0,
                2
              ]
            }
          ]
        },
        {
          "sequence": [
            "B",
            "A"
          ],
          "sequence_key": "BA",
          "stages": [
            {
              "stage_index": 1,
              "label": "B",
              "filled_before": [],
              "car_start": [
                2,
                2
              ],
              "entry": [
                0,
                1
              ],
              "approach_route": [
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "car_after": [
                0,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "A",
              "filled_before": [
                "B"
              ],
              "car_start": [
                0,
                2
              ],
              "entry": [
                3,
                1
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  3,
                  1
                ]
              ],
              "push_cells": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "car_after": [
                2,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L3-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L3",
      "size": 4,
      "car": [
        1,
        0
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            1
          ],
          "pit": [
            0,
            0
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            2,
            3
          ],
          "pit": [
            1,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          2,
          2
        ],
        [
          3,
          0
        ]
      ],
      "optionalWallPool": [
        [
          2,
          0
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 1
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ],
        [
          "B",
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                1,
                0
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "full_route": [
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "car_after": [
                0,
                1
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                1
              ],
              "entry": [
                3,
                3
              ],
              "approach_route": [
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ]
              ],
              "push_cells": [
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "full_route": [
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "car_after": [
                2,
                3
              ]
            }
          ]
        },
        {
          "sequence": [
            "B",
            "A"
          ],
          "sequence_key": "BA",
          "stages": [
            {
              "stage_index": 1,
              "label": "B",
              "filled_before": [],
              "car_start": [
                1,
                0
              ],
              "entry": [
                3,
                3
              ],
              "approach_route": [
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ]
              ],
              "push_cells": [
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "full_route": [
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "car_after": [
                2,
                3
              ]
            },
            {
              "stage_index": 2,
              "label": "A",
              "filled_before": [
                "B"
              ],
              "car_start": [
                2,
                3
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "full_route": [
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "car_after": [
                0,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L3-PILOT-03-BND",
      "revision": 1,
      "difficulty": "L3",
      "size": 4,
      "car": [
        3,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            0
          ],
          "pit": [
            1,
            0
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            0,
            2
          ],
          "pit": [
            0,
            1
          ]
        }
      ],
      "coreWalls": [
        [
          2,
          2
        ],
        [
          2,
          3
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          3,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ],
        [
          "B",
          "A"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                3,
                2
              ],
              "entry": [
                3,
                0
              ],
              "approach_route": [
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ]
              ],
              "push_cells": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "full_route": [
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "car_after": [
                2,
                0
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                0
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "full_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "car_after": [
                0,
                2
              ]
            }
          ]
        },
        {
          "sequence": [
            "B",
            "A"
          ],
          "sequence_key": "BA",
          "stages": [
            {
              "stage_index": 1,
              "label": "B",
              "filled_before": [],
              "car_start": [
                3,
                2
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "full_route": [
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "car_after": [
                0,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "A",
              "filled_before": [
                "B"
              ],
              "car_start": [
                0,
                2
              ],
              "entry": [
                3,
                0
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ]
              ],
              "push_cells": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "car_after": [
                2,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L4-ADD-001",
      "revision": 1,
      "difficulty": "L4",
      "size": 4,
      "car": [
        0,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            3
          ],
          "pit": [
            2,
            3
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            2,
            0
          ],
          "pit": [
            3,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          2
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 1
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                2
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "car_after": [
                1,
                3
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                1,
                3
              ],
              "entry": [
                1,
                0
              ],
              "approach_route": [
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ]
              ],
              "push_cells": [
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ]
              ],
              "full_route": [
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ]
              ],
              "car_after": [
                2,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L4-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L4",
      "size": 4,
      "car": [
        2,
        0
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            1
          ],
          "pit": [
            0,
            2
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            2,
            3
          ],
          "pit": [
            1,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          1
        ],
        [
          2,
          1
        ],
        [
          3,
          1
        ]
      ],
      "optionalWallPool": [
        [
          0,
          3
        ],
        [
          3,
          0
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                0
              ],
              "entry": [
                0,
                0
              ],
              "approach_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ]
              ],
              "full_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ]
              ],
              "car_after": [
                0,
                1
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                1
              ],
              "entry": [
                3,
                3
              ],
              "approach_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ]
              ],
              "push_cells": [
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "full_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "car_after": [
                2,
                3
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L4-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L4",
      "size": 4,
      "car": [
        3,
        3
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            0
          ],
          "pit": [
            1,
            0
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            0,
            2
          ],
          "pit": [
            0,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          0
        ],
        [
          2,
          1
        ],
        [
          2,
          2
        ],
        [
          2,
          3
        ]
      ],
      "optionalWallPool": [
        [
          1,
          2
        ],
        [
          1,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 1
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                3,
                3
              ],
              "entry": [
                3,
                0
              ],
              "approach_route": [
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ]
              ],
              "push_cells": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "full_route": [
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  1
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "car_after": [
                2,
                0
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                0
              ],
              "entry": [
                0,
                1
              ],
              "approach_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  3
                ]
              ],
              "car_after": [
                0,
                2
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L4-PILOT-03-BND",
      "revision": 1,
      "difficulty": "L4",
      "size": 4,
      "car": [
        1,
        3
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            2
          ],
          "pit": [
            0,
            1
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            1,
            0
          ],
          "pit": [
            0,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          2,
          2
        ],
        [
          3,
          2
        ]
      ],
      "optionalWallPool": [
        [
          2,
          3
        ],
        [
          3,
          0
        ],
        [
          3,
          1
        ],
        [
          3,
          3
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 2
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                1,
                3
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "full_route": [
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "car_after": [
                0,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                2
              ],
              "entry": [
                2,
                0
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ]
              ],
              "push_cells": [
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  0,
                  0
                ]
              ],
              "car_after": [
                1,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L4-REPL-001",
      "revision": 1,
      "difficulty": "L4",
      "size": 4,
      "car": [
        0,
        2
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            1
          ],
          "pit": [
            0,
            0
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            1,
            1
          ],
          "pit": [
            1,
            2
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          3
        ],
        [
          1,
          3
        ]
      ],
      "optionalWallPool": [
        [
          2,
          0
        ],
        [
          2,
          1
        ],
        [
          2,
          2
        ],
        [
          2,
          3
        ],
        [
          3,
          0
        ]
      ],
      "optionalWallCount": {
        "min": 1,
        "max": 3
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                2
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "car_after": [
                0,
                1
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                1
              ],
              "entry": [
                1,
                0
              ],
              "approach_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ],
                [
                  1,
                  0
                ]
              ],
              "push_cells": [
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ]
              ],
              "full_route": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ],
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  2
                ]
              ],
              "car_after": [
                1,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L5-ADD-001",
      "revision": 1,
      "difficulty": "L5",
      "size": 5,
      "car": [
        2,
        0
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            1
          ],
          "pit": [
            1,
            1
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            1,
            3
          ],
          "pit": [
            0,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          2
        ],
        [
          3,
          2
        ],
        [
          4,
          2
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          0,
          1
        ],
        [
          0,
          4
        ],
        [
          1,
          0
        ],
        [
          1,
          2
        ],
        [
          1,
          4
        ],
        [
          2,
          4
        ],
        [
          3,
          3
        ],
        [
          3,
          4
        ],
        [
          4,
          0
        ],
        [
          4,
          1
        ],
        [
          4,
          3
        ],
        [
          4,
          4
        ]
      ],
      "optionalWallCount": {
        "min": 1,
        "max": 5
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                2,
                0
              ],
              "entry": [
                3,
                1
              ],
              "approach_route": [
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  3,
                  1
                ]
              ],
              "push_cells": [
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "full_route": [
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "car_after": [
                2,
                1
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                1
              ],
              "entry": [
                2,
                3
              ],
              "approach_route": [
                [
                  2,
                  1
                ],
                [
                  2,
                  2
                ],
                [
                  2,
                  3
                ]
              ],
              "push_cells": [
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  1
                ],
                [
                  2,
                  2
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "car_after": [
                1,
                3
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L5-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L5",
      "size": 5,
      "car": [
        1,
        4
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            3
          ],
          "pit": [
            0,
            2
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            3,
            0
          ],
          "pit": [
            2,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          3
        ],
        [
          2,
          3
        ],
        [
          3,
          3
        ],
        [
          4,
          3
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          1,
          0
        ],
        [
          1,
          2
        ],
        [
          2,
          2
        ],
        [
          2,
          4
        ],
        [
          3,
          2
        ],
        [
          3,
          4
        ],
        [
          4,
          2
        ],
        [
          4,
          4
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 3
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                1,
                4
              ],
              "entry": [
                0,
                4
              ],
              "approach_route": [
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ]
              ],
              "push_cells": [
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ]
              ],
              "full_route": [
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ]
              ],
              "car_after": [
                0,
                3
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                3
              ],
              "entry": [
                4,
                0
              ],
              "approach_route": [
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  0
                ]
              ],
              "push_cells": [
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ]
              ],
              "car_after": [
                3,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L5-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L5",
      "size": 5,
      "car": [
        1,
        3
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            2
          ],
          "pit": [
            0,
            1
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            3,
            0
          ],
          "pit": [
            2,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          2
        ],
        [
          2,
          2
        ],
        [
          3,
          2
        ],
        [
          4,
          2
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          0,
          4
        ],
        [
          1,
          0
        ],
        [
          1,
          4
        ],
        [
          2,
          3
        ],
        [
          2,
          4
        ],
        [
          3,
          3
        ],
        [
          3,
          4
        ],
        [
          4,
          3
        ],
        [
          4,
          4
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 3
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                1,
                3
              ],
              "entry": [
                0,
                3
              ],
              "approach_route": [
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ]
              ],
              "push_cells": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "full_route": [
                [
                  1,
                  3
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ]
              ],
              "car_after": [
                0,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                2
              ],
              "entry": [
                4,
                0
              ],
              "approach_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  0
                ]
              ],
              "push_cells": [
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ]
              ],
              "full_route": [
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  2,
                  0
                ]
              ],
              "car_after": [
                3,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L5-REPL-001",
      "revision": 1,
      "difficulty": "L5",
      "size": 5,
      "car": [
        4,
        4
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            2
          ],
          "pit": [
            2,
            1
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            0,
            1
          ],
          "pit": [
            0,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          3
        ],
        [
          2,
          0
        ],
        [
          2,
          4
        ],
        [
          4,
          0
        ]
      ],
      "optionalWallPool": [
        [
          0,
          4
        ],
        [
          1,
          4
        ],
        [
          3,
          0
        ],
        [
          3,
          1
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 4
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                4,
                4
              ],
              "entry": [
                2,
                3
              ],
              "approach_route": [
                [
                  4,
                  4
                ],
                [
                  3,
                  4
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "push_cells": [
                [
                  2,
                  2
                ],
                [
                  2,
                  1
                ]
              ],
              "full_route": [
                [
                  4,
                  4
                ],
                [
                  3,
                  4
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  2,
                  2
                ],
                [
                  2,
                  1
                ]
              ],
              "car_after": [
                2,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                2
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "full_route": [
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  0,
                  0
                ]
              ],
              "car_after": [
                0,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L5-REPL-002",
      "revision": 1,
      "difficulty": "L5",
      "size": 5,
      "car": [
        0,
        4
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            2,
            2
          ],
          "pit": [
            1,
            2
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            3,
            0
          ],
          "pit": [
            4,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          2
        ],
        [
          2,
          1
        ],
        [
          3,
          1
        ],
        [
          4,
          2
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          2,
          3
        ],
        [
          4,
          3
        ],
        [
          4,
          4
        ]
      ],
      "optionalWallCount": {
        "min": 0,
        "max": 4
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B"
          ],
          "sequence_key": "AB",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                4
              ],
              "entry": [
                3,
                2
              ],
              "approach_route": [
                [
                  0,
                  4
                ],
                [
                  1,
                  4
                ],
                [
                  2,
                  4
                ],
                [
                  3,
                  4
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ]
              ],
              "push_cells": [
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ]
              ],
              "full_route": [
                [
                  0,
                  4
                ],
                [
                  1,
                  4
                ],
                [
                  2,
                  4
                ],
                [
                  3,
                  4
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  2
                ],
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ]
              ],
              "car_after": [
                2,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                2,
                2
              ],
              "entry": [
                2,
                0
              ],
              "approach_route": [
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ]
              ],
              "push_cells": [
                [
                  3,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "full_route": [
                [
                  2,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "car_after": [
                3,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L6-ADD-001",
      "revision": 1,
      "difficulty": "L6",
      "size": 6,
      "car": [
        0,
        3
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            2
          ],
          "pit": [
            2,
            2
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            3,
            3
          ],
          "pit": [
            3,
            4
          ]
        },
        {
          "id": "C",
          "label": "C",
          "dirt": [
            4,
            1
          ],
          "pit": [
            4,
            2
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          5
        ],
        [
          2,
          4
        ],
        [
          3,
          0
        ],
        [
          3,
          1
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          0,
          1
        ],
        [
          0,
          4
        ],
        [
          0,
          5
        ],
        [
          1,
          0
        ],
        [
          1,
          1
        ],
        [
          1,
          3
        ],
        [
          1,
          4
        ],
        [
          2,
          0
        ],
        [
          2,
          1
        ],
        [
          2,
          3
        ],
        [
          2,
          5
        ],
        [
          3,
          5
        ],
        [
          4,
          4
        ],
        [
          4,
          5
        ],
        [
          5,
          4
        ],
        [
          5,
          5
        ]
      ],
      "optionalWallCount": {
        "min": 2,
        "max": 6
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B",
          "C"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B",
            "C"
          ],
          "sequence_key": "ABC",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                3
              ],
              "entry": [
                0,
                2
              ],
              "approach_route": [
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ]
              ],
              "push_cells": [
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ]
              ],
              "full_route": [
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ]
              ],
              "car_after": [
                1,
                2
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                1,
                2
              ],
              "entry": [
                3,
                2
              ],
              "approach_route": [
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ]
              ],
              "push_cells": [
                [
                  3,
                  3
                ],
                [
                  3,
                  4
                ]
              ],
              "full_route": [
                [
                  1,
                  2
                ],
                [
                  2,
                  2
                ],
                [
                  3,
                  2
                ],
                [
                  3,
                  3
                ],
                [
                  3,
                  4
                ]
              ],
              "car_after": [
                3,
                3
              ]
            },
            {
              "stage_index": 3,
              "label": "C",
              "filled_before": [
                "A",
                "B"
              ],
              "car_start": [
                3,
                3
              ],
              "entry": [
                4,
                0
              ],
              "approach_route": [
                [
                  3,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ],
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ],
                [
                  5,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "push_cells": [
                [
                  4,
                  1
                ],
                [
                  4,
                  2
                ]
              ],
              "full_route": [
                [
                  3,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ],
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ],
                [
                  5,
                  0
                ],
                [
                  4,
                  0
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  2
                ]
              ],
              "car_after": [
                4,
                1
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L6-ADD-002",
      "revision": 1,
      "difficulty": "L6",
      "size": 6,
      "car": [
        0,
        5
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            4
          ],
          "pit": [
            0,
            4
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            2,
            1
          ],
          "pit": [
            3,
            1
          ]
        },
        {
          "id": "C",
          "label": "C",
          "dirt": [
            4,
            2
          ],
          "pit": [
            4,
            3
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          0
        ],
        [
          1,
          2
        ],
        [
          1,
          3
        ],
        [
          5,
          1
        ]
      ],
      "optionalWallPool": [
        [
          0,
          0
        ],
        [
          2,
          0
        ],
        [
          2,
          2
        ],
        [
          2,
          3
        ],
        [
          3,
          0
        ],
        [
          3,
          2
        ],
        [
          3,
          3
        ],
        [
          3,
          4
        ],
        [
          3,
          5
        ],
        [
          4,
          0
        ],
        [
          4,
          4
        ],
        [
          4,
          5
        ],
        [
          5,
          0
        ],
        [
          5,
          2
        ],
        [
          5,
          3
        ],
        [
          5,
          4
        ],
        [
          5,
          5
        ]
      ],
      "optionalWallCount": {
        "min": 2,
        "max": 6
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B",
          "C"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B",
            "C"
          ],
          "sequence_key": "ABC",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                5
              ],
              "entry": [
                2,
                4
              ],
              "approach_route": [
                [
                  0,
                  5
                ],
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  2,
                  4
                ]
              ],
              "push_cells": [
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ]
              ],
              "full_route": [
                [
                  0,
                  5
                ],
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  2,
                  4
                ],
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ]
              ],
              "car_after": [
                1,
                4
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                1,
                4
              ],
              "entry": [
                1,
                1
              ],
              "approach_route": [
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ]
              ],
              "push_cells": [
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ]
              ],
              "full_route": [
                [
                  1,
                  4
                ],
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ],
                [
                  0,
                  2
                ],
                [
                  0,
                  1
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ]
              ],
              "car_after": [
                2,
                1
              ]
            },
            {
              "stage_index": 3,
              "label": "C",
              "filled_before": [
                "A",
                "B"
              ],
              "car_start": [
                2,
                1
              ],
              "entry": [
                4,
                1
              ],
              "approach_route": [
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ]
              ],
              "push_cells": [
                [
                  4,
                  2
                ],
                [
                  4,
                  3
                ]
              ],
              "full_route": [
                [
                  2,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  4,
                  2
                ],
                [
                  4,
                  3
                ]
              ],
              "car_after": [
                4,
                2
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L6-PILOT-01-POS",
      "revision": 1,
      "difficulty": "L6",
      "size": 6,
      "car": [
        5,
        5
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            0,
            4
          ],
          "pit": [
            0,
            3
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            5,
            2
          ],
          "pit": [
            5,
            1
          ]
        },
        {
          "id": "C",
          "label": "C",
          "dirt": [
            3,
            0
          ],
          "pit": [
            4,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          2
        ],
        [
          1,
          2
        ],
        [
          1,
          4
        ],
        [
          2,
          2
        ],
        [
          2,
          4
        ],
        [
          3,
          2
        ],
        [
          3,
          4
        ],
        [
          4,
          2
        ],
        [
          4,
          4
        ],
        [
          5,
          4
        ]
      ],
      "optionalWallPool": [],
      "optionalWallCount": {
        "min": 0,
        "max": 0
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B",
          "C"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B",
            "C"
          ],
          "sequence_key": "ABC",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                5,
                5
              ],
              "entry": [
                0,
                5
              ],
              "approach_route": [
                [
                  5,
                  5
                ],
                [
                  4,
                  5
                ],
                [
                  3,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  1,
                  5
                ],
                [
                  0,
                  5
                ]
              ],
              "push_cells": [
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ]
              ],
              "full_route": [
                [
                  5,
                  5
                ],
                [
                  4,
                  5
                ],
                [
                  3,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  1,
                  5
                ],
                [
                  0,
                  5
                ],
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ]
              ],
              "car_after": [
                0,
                4
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                0,
                4
              ],
              "entry": [
                5,
                3
              ],
              "approach_route": [
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ]
              ],
              "push_cells": [
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ]
              ],
              "full_route": [
                [
                  0,
                  4
                ],
                [
                  0,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ],
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ]
              ],
              "car_after": [
                5,
                2
              ]
            },
            {
              "stage_index": 3,
              "label": "C",
              "filled_before": [
                "A",
                "B"
              ],
              "car_start": [
                5,
                2
              ],
              "entry": [
                2,
                0
              ],
              "approach_route": [
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ]
              ],
              "push_cells": [
                [
                  3,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "full_route": [
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ],
                [
                  4,
                  1
                ],
                [
                  3,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "car_after": [
                3,
                0
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L6-PILOT-02-CON",
      "revision": 1,
      "difficulty": "L6",
      "size": 6,
      "car": [
        0,
        4
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            1,
            5
          ],
          "pit": [
            2,
            5
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            3,
            4
          ],
          "pit": [
            4,
            4
          ]
        },
        {
          "id": "C",
          "label": "C",
          "dirt": [
            5,
            2
          ],
          "pit": [
            5,
            1
          ]
        }
      ],
      "coreWalls": [
        [
          1,
          0
        ],
        [
          1,
          1
        ],
        [
          1,
          2
        ],
        [
          1,
          3
        ],
        [
          1,
          4
        ],
        [
          3,
          0
        ],
        [
          3,
          1
        ],
        [
          3,
          2
        ],
        [
          3,
          3
        ],
        [
          3,
          5
        ]
      ],
      "optionalWallPool": [],
      "optionalWallCount": {
        "min": 0,
        "max": 0
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B",
          "C"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B",
            "C"
          ],
          "sequence_key": "ABC",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                0,
                4
              ],
              "entry": [
                0,
                5
              ],
              "approach_route": [
                [
                  0,
                  4
                ],
                [
                  0,
                  5
                ]
              ],
              "push_cells": [
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ]
              ],
              "full_route": [
                [
                  0,
                  4
                ],
                [
                  0,
                  5
                ],
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ]
              ],
              "car_after": [
                1,
                5
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                1,
                5
              ],
              "entry": [
                2,
                4
              ],
              "approach_route": [
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  2,
                  4
                ]
              ],
              "push_cells": [
                [
                  3,
                  4
                ],
                [
                  4,
                  4
                ]
              ],
              "full_route": [
                [
                  1,
                  5
                ],
                [
                  2,
                  5
                ],
                [
                  2,
                  4
                ],
                [
                  3,
                  4
                ],
                [
                  4,
                  4
                ]
              ],
              "car_after": [
                3,
                4
              ]
            },
            {
              "stage_index": 3,
              "label": "C",
              "filled_before": [
                "A",
                "B"
              ],
              "car_start": [
                3,
                4
              ],
              "entry": [
                5,
                3
              ],
              "approach_route": [
                [
                  3,
                  4
                ],
                [
                  4,
                  4
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ]
              ],
              "push_cells": [
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ]
              ],
              "full_route": [
                [
                  3,
                  4
                ],
                [
                  4,
                  4
                ],
                [
                  4,
                  3
                ],
                [
                  5,
                  3
                ],
                [
                  5,
                  2
                ],
                [
                  5,
                  1
                ]
              ],
              "car_after": [
                5,
                2
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "FT-L6-PILOT-03-BND",
      "revision": 1,
      "difficulty": "L6",
      "size": 6,
      "car": [
        4,
        5
      ],
      "pairs": [
        {
          "id": "A",
          "label": "A",
          "dirt": [
            5,
            4
          ],
          "pit": [
            5,
            3
          ]
        },
        {
          "id": "B",
          "label": "B",
          "dirt": [
            1,
            2
          ],
          "pit": [
            1,
            1
          ]
        },
        {
          "id": "C",
          "label": "C",
          "dirt": [
            4,
            0
          ],
          "pit": [
            5,
            0
          ]
        }
      ],
      "coreWalls": [
        [
          0,
          2
        ],
        [
          0,
          4
        ],
        [
          1,
          4
        ],
        [
          2,
          2
        ],
        [
          2,
          4
        ],
        [
          3,
          2
        ],
        [
          3,
          4
        ],
        [
          4,
          2
        ],
        [
          4,
          4
        ],
        [
          5,
          2
        ]
      ],
      "optionalWallPool": [],
      "optionalWallCount": {
        "min": 0,
        "max": 0
      },
      "expectedSolutionSequences": [
        [
          "A",
          "B",
          "C"
        ]
      ],
      "hintSolutions": [
        {
          "sequence": [
            "A",
            "B",
            "C"
          ],
          "sequence_key": "ABC",
          "stages": [
            {
              "stage_index": 1,
              "label": "A",
              "filled_before": [],
              "car_start": [
                4,
                5
              ],
              "entry": [
                5,
                5
              ],
              "approach_route": [
                [
                  4,
                  5
                ],
                [
                  5,
                  5
                ]
              ],
              "push_cells": [
                [
                  5,
                  4
                ],
                [
                  5,
                  3
                ]
              ],
              "full_route": [
                [
                  4,
                  5
                ],
                [
                  5,
                  5
                ],
                [
                  5,
                  4
                ],
                [
                  5,
                  3
                ]
              ],
              "car_after": [
                5,
                4
              ]
            },
            {
              "stage_index": 2,
              "label": "B",
              "filled_before": [
                "A"
              ],
              "car_start": [
                5,
                4
              ],
              "entry": [
                1,
                3
              ],
              "approach_route": [
                [
                  5,
                  4
                ],
                [
                  5,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ]
              ],
              "push_cells": [
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ]
              ],
              "full_route": [
                [
                  5,
                  4
                ],
                [
                  5,
                  3
                ],
                [
                  4,
                  3
                ],
                [
                  3,
                  3
                ],
                [
                  2,
                  3
                ],
                [
                  1,
                  3
                ],
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ]
              ],
              "car_after": [
                1,
                2
              ]
            },
            {
              "stage_index": 3,
              "label": "C",
              "filled_before": [
                "A",
                "B"
              ],
              "car_start": [
                1,
                2
              ],
              "entry": [
                3,
                0
              ],
              "approach_route": [
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ]
              ],
              "push_cells": [
                [
                  4,
                  0
                ],
                [
                  5,
                  0
                ]
              ],
              "full_route": [
                [
                  1,
                  2
                ],
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  0
                ],
                [
                  4,
                  0
                ],
                [
                  5,
                  0
                ]
              ],
              "car_after": [
                4,
                0
              ]
            }
          ]
        }
      ]
    }
  ]
};
