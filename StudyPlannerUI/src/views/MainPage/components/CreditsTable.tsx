import Table from 'components/Table/Table';
import { TableCell, TableRow } from 'components/Table/Table.style';
import type { SelectedCourse } from 'interfaces/SelectedCourse';
import { ColoredTableRow } from './style';

type SelectedCourses = Record<number, SelectedCourse[]>;

interface CreditsTableProps {
    courses: SelectedCourses;
}

const MOCK = [
    {
        code: 'mai',
        name: 'maskinintelligens',
        G1: 15,
        G2: 15,
        A: 15
    },
    {
        code: 'pv',
        name: 'programavara',
        G1: 15,
        G2: 15,
        A: 15
    }
];

const THRESHOLD = 60;

function CreditsTable({ courses }: CreditsTableProps): JSX.Element {
    return (
        <Table headers={['Spec', 'G1', 'G2', 'A', 'Total']}>
            {MOCK.map(course => (
                <ColoredTableRow
                    fullfilled={course.G1 + course.G2 + course.A > THRESHOLD}
                    key={course.code}
                >
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.G1}</TableCell>
                    <TableCell>{course.G2}</TableCell>
                    <TableCell>{course.A}</TableCell>
                    <TableCell>{course.G1 + course.G2 + course.A}</TableCell>
                </ColoredTableRow>
            ))}
        </Table>
    );
}

export default CreditsTable;
