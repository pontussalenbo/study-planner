# Study planner API

## Endpoints

### Route: ```/studyplanner/general/programmes```

* __GET__

  Request query example:\
  ```<host>/studyplanner/general/programmes```

  Response body example:

  ```json
  [
    "B",
    "C",
    "D",
    ...
  ]
  ```

  Response codes:
  * __200__ - If OK
  * __500__ - If database encountered an error

### Route: ```/studyplanner/general/academic_years```

* __GET__

  Request query example:\
  ```<host>/studyplanner/general/academic_years```

  Response body example:

  ```json
  [
    "07_08",
    "08_09",
    "09_10",
    ...
  ]
  ```

  Response codes:
  * __200__ - If OK
  * __500__ - If database encountered an error

### Route: ```/studyplanner/general/class_years```

* __GET__

  Request query example:\
  ```<host>/studyplanner/general/class_years```

  Response body example:

  ```json
  [
    "H07",
    "H08",
    "H09",
    ...
  ]
  ```

  Response codes:
  * __200__ - If OK
  * __500__ - If database encountered an error

### Route: ```/studyplanner/general/masters```

* __GET__

  __Query params__:
  * __Programme__ - Programme code, e.g 'D'
  
  Request query example:\
  ```<host>/studyplanner/general/master?Programme=D'```

  Response body example:

  ```json
  [
    {
      "master_code": "bg",
      "master_name_sv": "Bilder och grafik",
      "master_name_en": "Images and Computer Graphics"
    },
    {
      "master_code": "dpd",
      "master_name_sv": "Design av processorer och digitala system",
      "master_name_en": "Design of Processors and Digital Sytems"
    },
    ...
  ]
  ```

  Response codes:
  * __200__ - If OK
  * __400__ - If _"Programme"_ is null
  * __500__ - If database encountered an error

### Route: ```/studyplanner/courses```

* __POST__

  Request body example:

  ```json
  {
    "Programme": "D",
    "Year": "22_23"
  }
  ```

  Response body example:

  ```json
  [
    {
      "course_code": "BMEN15",
      "course_name_sv": "Signalseparation - oberoende komponenter",
      "course_name_en": "Signal Separation - Independent Components",
      "credits": 7.5,
      "level": "A",
      "periods": [
        {
          "start": 2,
          "end": 2
        }
      ]
    },
    {
      "course_code": "EDAP10",
      "course_name_sv": "Flertrådad programmering",
      "course_name_en": "Concurrent Programming",
      "credits": 7.5,
      "level": "A",
      "periods": [
        {
          "start": 1,
          "end": 1
        }
      ]
    },
    ...
  ]
  ```

  Request body example (with master):

  ```json
  {
    "Programme": "D",
    "Year": "H19",
    "Master": "pv"
  }
  ```

  Response body example:

  ```json
  [
    {
      "course_code": "EDAF05",
      "course_name_sv": "Algoritmer, datastrukturer och komplexitet",
      "course_name_en": "Algorithms, Data Structures and Complexity",
      "credits": 5,
      "level": "G2",
      "periods": [
        {
          "start": 4,
          "end": 4
        }
      ]
    },
    {
      "course_code": "EDAF35",
      "course_name_sv": "Operativsystem",
      "course_name_en": "Operating Systems",
      "credits": 7.5,
      "level": "G2",
      "periods": [
        {
          "start": 4,
          "end": 4
        }
      ]
    },
    ...
  ]
  ```

  Response codes:

  * __200__ - If OK
  * __400__ - If _"Programme"_ or _"Year"_ is null
  * __500__ - If database encountered an error

### Route: ```/studyplanner/health```

* __GET__
  Example request query:\
  ```<host>/studyplanner/health```

  Response codes:
  * __200__ - If OK
  * __500__ - If connection to databases could not be established

### Route: ```/studyplanner/links```

* __POST__

  Example request body:

  ```json
  {
    "Programme": "D",
    "Year": "H19",
    "StudyPlanName": "My cool plan",
    "MasterCodes": [
      "is",
      "pv",
      ...
    ],
    "SelectedCourses": [
      {
        "course_code": "EDAN75",
        "study_year": 4
      },
      {
        "course_code": "EDAP15",
        "study_year": 5
      },
      ...
    ]
  }
  ```

  Example response body:

  ```json
  {
    "StudyPlanId": "b097d745c1c2579cf70a5f4ebc545a8f"
  }
  ```

  Response codes:
  * __200__ - If Ok
  * __400__ - If any field is null or contains empty array
  * __500__ - If database encountered an error

* __GET__

  __Query params__:
  * __Uniqueblob__ - Unique blob connected to a certain plan

  Example request query:\
  ```<host>/studyplanner/links?UniqueBlob=b097d745c1c2579cf70a5f4ebc545a8f```

  Example response body:

  ```json
  {
    "Programme": "D",
    "Year": "H19",
    "StudyPlanName": "My cool plan",
    "MasterCodes": [
      "is",
      "pv",
      ...
    ],
    "SelectedCourses": [
      {
        "course_code": "EDAN75",
        "study_year": 4
      },
      {
        "course_code": "EDAP15",
        "study_year": 5
      },
      ...
    ]
  }
  ```

  Response codes:
  * __200__ - If OK
  * __400__ - If unique blob does not exist
  * __500__ - If database encountered an error
  
### Route: ```/studyplanner/masters```

* __POST__

  Example request body:

  ```json
  {
    "Programme": "D",
    "Year": "H19",
    "MasterCodes": [
      "pv",
      "se"
    ],
    "SelectedCourses": [
      "EDAP10",
      "EDAF75",
      "EDAN65",
      "EDAN75",
      "EDAN20",
      "EDAN01",
      "EDAP15",
      "EDAP01",
      "EDAF50",
      "ETSN05",
      "EDAP05",
      "EDAG01",
      "EDAN26"
    ]
  }
  ```

  Example response body:

  ```json
  {
    "pv": {
      "G1Credits": 0,
      "G2Credits": 22.5,
      "AdvancedCredits": 75,
      "RequirementsFulfilled": true
    },
    "se": {
      "G1Credits": 0,
      "G2Credits": 15,
      "AdvancedCredits": 15,
      "RequirementsFulfilled": false
    },
    "general": {
      "G1Credits": 0,
      "G2Credits": 22.5,
      "AdvancedCredits": 75,
      "RequirementsFulfilled": true
    }
  }
  ```

  Response codes:
  * __200__ - If OK
  * __400__ - If any field is null or contains an empty array
  * __500__ - If database encountered an error
