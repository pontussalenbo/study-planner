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

__Get all masters:__

```SQL
SELECT master_code, master_name_{lang}
FROM masters;
```

__Get all masters in a programme:__

```SQL
SELECT master_code
FROM programme_masters
WHERE programme_code = '{code}';
```

__Get all courses in a masters:__

```SQL
SELECT course_code
FROM master_courses
WHERE master_code = '{code}';
```

__Get all courses in a programme:__

```SQL
SELECT course_code
FROM programme_courses
WHERE programme_code = '{code}';
```

__Get credits & level for a course:__

```SQL
SELECT credits, level
FROM courses_info
WHERE course_code = '{code}';
```

__Get study periods for course:__

```SQL
SELECT period_start, period_end
FROM courses_periods
WHERE course_code = '{code}';
```
