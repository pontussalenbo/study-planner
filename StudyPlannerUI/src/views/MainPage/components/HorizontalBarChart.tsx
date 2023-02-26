import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'Recharts';
import type { SelectedCourse } from 'interfaces/SelectedCourse';

interface ICourseProps {
    courses: SelectedCourse[];
}

function HorizontalBarChart({ courses }: ICourseProps): JSX.Element {
    return (
        <ResponsiveContainer width='50%' height={300}>
            <BarChart
                layout='vertical'
                width={600}
                height={300}
                data={courses}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid stroke='#ccc' />
                <XAxis
                    domain={[1, 4]}
                    tickCount={5}
                    ticks={[1, 2, 3, 4]}
                    tickFormatter={t => `lp ${t as string}`}
                    label={{
                        value: 'Periods',
                        position: 'insideBottom',
                        offset: 0
                    }}
                    type='number'
                />
                <YAxis
                    label={{
                        value: 'Courses',
                        position: 'insideLeft',
                        offset: 0,
                        angle: -90
                    }}
                    width={100}
                    type='category'
                    dataKey='courseCode'
                />
                <Bar barSize={30} dataKey='periods' fill='green' />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default HorizontalBarChart;

/*
    <LineChart
        layout='vertical'
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
        <XAxis type='number' domain={[0, 'dataMax + 1000']} />
        <YAxis dataKey='name' type='category' />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Line dataKey='pv' stroke='#8884d8' />
        <Line dataKey='uv' stroke='#82ca9d' />
    </LineChart>
    */
