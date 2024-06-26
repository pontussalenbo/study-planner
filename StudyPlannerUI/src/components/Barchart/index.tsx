/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { memo } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tokens } from 'style/tokens';
import { sortCourses } from 'utils/sortCourses';

interface HorizontalBarChartProps {
  year: CourseData.YEAR;
}

function HorizontalBarChart({ year }: HorizontalBarChartProps): JSX.Element {
  const { courses, customCourses } = useStudyplanContext();
  const allCourses = [...courses[year], ...customCourses[year]];

  const chartData = sortCourses(allCourses).map(course => {
    // If there is a selected period, use that, otherwise use the first period (and only one)
    const start = course.period?.start ?? course.periods[0].start;
    const end = (course.period?.end ?? course.periods[0].end) + 1;

    return {
      name: course.courseCode,
      period: [start, end]
    };
  });
  chartData.sort((a, b) => a.period[0] - b.period[0]);

  if (!chartData.length) return <></>;

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        layout='vertical'
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
      >
        <CartesianGrid stroke='#ccc' />
        <XAxis
          domain={[1, 5]}
          tickCount={5}
          ticks={[1, 2, 3, 4]}
          tick={{ fill: 'white' }}
          tickFormatter={(t: unknown) => `lp ${t as string}`}
          type='number'
        />
        <YAxis width={100} tick={{ fill: 'white' }} type='category' dataKey='name' />
        <Bar barSize={30} dataKey='period' fill={Tokens.primary50} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(HorizontalBarChart);
