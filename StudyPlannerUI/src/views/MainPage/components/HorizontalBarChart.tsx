import { memo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';

interface ICourseProps {
  courses: CourseData.SelectedCourse[];
}

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

function HorizontalBarChart({ courses }: ICourseProps): JSX.Element {
  const chartData = courses.map(course => {
    // If there is a selected period, use that, otherwise use the first period (and only one)
    const start = course.selectedPeriod?.start || course.periods[0].start;
    const end = (course.selectedPeriod?.end ?? course.periods[0].end) + 1;

    return {
      name: course.course_code,
      period: [start, end]
    };
  });
  chartData.sort((a, b) => a.period[0] - b.period[0]);

  if (!chartData.length) return <></>;

  return (
    <Wrapper>
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
            tickFormatter={(t: unknown) => `lp ${t as string}`}
            type='number'
          />
          <YAxis width={100} type='category' dataKey='name' />
          <Bar barSize={30} dataKey='period' fill='green' />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default memo(HorizontalBarChart);
