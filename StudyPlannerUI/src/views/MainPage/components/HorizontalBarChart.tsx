import { memo } from 'react';
import { Bar } from 'recharts';
import { BarChart } from 'recharts';
import { CartesianGrid } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';

interface ICourseProps {
  courses: CourseData.SelectedCourse[];
}

function HorizontalBarChart({ courses }: ICourseProps): JSX.Element {
  const chartData = courses.map(course => {
    // If there is a selected period, use that, otherwise use the first period (and only one)
    const start = course.selectedPeriod?.Start || course.periods[0].Start;
    const end = (course.selectedPeriod?.End ?? course.periods[0].End) + 1;

    return {
      name: course.course_code,
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
          tickFormatter={(t: unknown) => `lp ${t as string}`}
          type='number'
        />
        <YAxis width={100} type='category' dataKey='name' />
        <Bar barSize={30} dataKey='period' fill='green' />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(HorizontalBarChart);
