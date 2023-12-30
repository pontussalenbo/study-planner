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
