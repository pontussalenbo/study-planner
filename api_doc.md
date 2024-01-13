<!--
  ~ Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
  ~
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version. See the included LICENSE file for
  ~ the full text of the GNU General Public License.
-->

<!--
  ~ Copyright Andreas Bartilson & Pontus Salenbo 2023
  ~
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version. See the included LICENSE file for
  ~ the full text of the GNU General Public License.
-->

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
      "masterCode": "bg",
      "masterNameSv": "Bilder och grafik",
      "masterNameEn": "Images and Computer Graphics"
    },
    {
      "masterCode": "dpd",
      "masterNameSv": "Design av processorer och digitala system",
      "masterNameEn": "Design of Processors and Digital Sytems"
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
    "programme": "D",
    "year": "H19",
  }
  ```

  Response body example:

  ```json
  [
    {
      "courseCode": "BMEF10",
      "courseNameSv": "Sensorteknik",
      "courseNameEn": "Transducer Technology",
      "credits": 7.5,
      "level": "G2",
      "periods": [
        {
          "start": 1,
          "end": 1
        }
      ]
    },
    {
      "courseCode": "BMEM05",
      "courseNameSv": "Examensarbete i elektrisk mätteknik",
      "courseNameEn": "Degree Project in Electrical Measurements",
      "credits": 30,
      "level": "A",
      "periods": [
        {
          "start": 0,
          "end": 0
        }
      ]
    },
    ...
  ]
  ```

  Request body example (with master):

  ```json
  {
    "programme": "D",
    "year": "H19",
    "masterCodes":[
      "pv",
      "is"
    ]
  }
  ```

  Response body example:

  ```json
  [
    {
      "courseCode": "EDAF05",
      "courseNameSv": "Algoritmer, datastrukturer och komplexitet",
      "courseNameEn": "Algorithms, Data Structures and Complexity",
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
      "courseCode": "EDAF35",
      "courseNameSv": "Operativsystem",
      "courseNameEn": "Operating Systems",
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
    "programme": "D",
    "year": "H19",
    "studyPlanName": "My cool plan",
    "selectedCourses": [
      {
        "courseCode": "EDAN75",
        "studyYear": 4
      },
      {
        "courseCode": "EDAP15",
        "studyYear": 5
      },
      ...
    ]
  }
  ```

  Response body:

  ```json
  {
    "studyPlanId": "b097d745c1c2579cf70a5f4ebc545a8f",
    "studyPlanReadOnlyId":"315150173ece2a65bc5d717d2e9a69b9"
  }
  ```

  Example request body (updating a study plan):

  ```json
  {
    "studyPlanId": "b097d745c1c2579cf70a5f4ebc545a8f",
    "programme": "D",
    "year": "H19",
    "studyPlanName": "My cool plan - revised",
    "selectedCourses": [
      {
        "courseCode": "EDAN75",
        "studyYear": 4
      },
      {
        "courseCode": "EDAP15",
        "studyYear": 5
      },
      {
        "courseCode": "EDAN26",
        "studyYear": 5
      }
      ...
    ]
  }
  ```

  Response body:

  ```json
  {
    "studyPlanId": "b097d745c1c2579cf70a5f4ebc545a8f",
    "studyPlanReadOnlyId":"315150173ece2a65bc5d717d2e9a69b9"
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
  ```<host>/studyplanner/links?studyPlanId=b097d745c1c2579cf70a5f4ebc545a8f```

  Example response body:

  ```json
  {
    "programme": "D",
    "year": "H19",
    "studyPlanName": "My cool plan - revised",
    "selectedCourses": [
      {
        "courseCode": "EDAN75",
        "studyYear": 4
      },
      {
        "courseCode": "EDAP15",
        "studyYear": 5
      },
      {
        "courseCode": "EDAN26",
        "studyYear": 5
      }
      ...
    ]
  }
  ```

  Response codes:
  * __200__ - If OK
  * __400__ - If study plan id does not exist
  * __500__ - If database encountered an error

### Route: ```/studyplanner/masters```

* __POST__

  Example request body:

  ```json
  {
    "programme": "D",
    "year": "H19",
    "masterCodes": [
      "pv",
      "se"
    ],
    "selectedCourses": [
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
      "g1Credits": 0,
      "g2Credits": 22.5,
      "advancedCredits": 75,
      "requirementsFulfilled": true
    },
    "se": {
      "g1Credits": 0,
      "g2Credits": 15,
      "advancedCredits": 15,
      "requirementsFulfilled": false
    },
    "general": {
      "g1Credits": 0,
      "g2Credits": 22.5,
      "advancedCredits": 75,
      "requirementsFulfilled": true
    }
  }
  ```

  Response codes:
  * __200__ - If OK
  * __400__ - If any field is null or selectedCourses is empty (masterCodes may be omitted)
  * __500__ - If database encountered an error
