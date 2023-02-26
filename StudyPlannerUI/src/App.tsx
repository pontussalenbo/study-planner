import MainPage from 'views/MainPage';

const INIT_STATE = [
    {
        name_en: 'EDAN40',
        periods: [1, 2],
        credits: 7.5,
        cycle: 'A',
        courseCode: 'EDAN40'
    },
    {
        name_en: 'ETSN01',
        periods: [1, 2],
        credits: 7.5,
        cycle: 'A',
        courseCode: 'ETSN01'
    },
    {
        name_en: 'EDAA01',
        periods: [2, 3],
        credits: 7.5,
        cycle: 'G2',
        courseCode: 'EDAA01'
    },
    {
        name_en: 'EDAF50',
        periods: [3, 4],
        credits: 7.5,
        cycle: 'A',
        courseCode: 'EDAF50'
    },
    {
        name_en: 'EITF35',
        periods: [4, 5],
        credits: 7.5,
        cycle: 'G1',
        courseCode: 'EITF35'
    }
];

function App(): JSX.Element {
    return <MainPage />;
}
export default App;
