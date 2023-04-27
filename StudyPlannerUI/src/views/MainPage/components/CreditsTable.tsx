import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer
} from './Table.style';

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
    name: 'programvara',
    G1: 15,
    G2: 15,
    A: 15
  }
];

function CreditsTable(): JSX.Element {
  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader>Specialization</StyledHeader>
            <StyledHeader>G1</StyledHeader>
            <StyledHeader>G2</StyledHeader>
            <StyledHeader>A</StyledHeader>
            <StyledHeader>Total</StyledHeader>
          </tr>
        </thead>
        <tbody>
          {MOCK.map(course => (
            <tr key={course.code}>
              <StyledCell>{course.name}</StyledCell>
              <StyledCell>{course.G1}</StyledCell>
              <StyledCell>{course.G2}</StyledCell>
              <StyledCell>{course.A}</StyledCell>
              <StyledCell>{course.G1 + course.G2 + course.A}</StyledCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default CreditsTable;
